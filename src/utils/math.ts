/**
 * Safe mathematical expression evaluator for Nova WebOS.
 * Evaluates standard arithmetic expressions without `eval` or `Function`,
 * ensuring strict Content Security Policy (CSP) compliance and zero injection risk.
 */

export interface MathResult {
  success: boolean;
  value?: number;
  formatted?: string;
  error?: string;
}

export function evaluateMath(input: string): MathResult {
  if (!input || typeof input !== 'string') {
    return { success: false, error: 'Empty expression' };
  }

  // Normalize symbols
  const normalized = input
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .trim();

  if (!normalized) {
    return { success: false, error: 'Empty expression' };
  }

  // Tokenize safely
  const tokens: string[] = [];
  let i = 0;

  while (i < normalized.length) {
    const char = normalized[i];

    if (/\s/.test(char)) {
      i++;
      continue;
    }

    // Numbers & decimals
    if (/[0-9.]/.test(char)) {
      let numStr = '';
      let decimalCount = 0;

      while (i < normalized.length && /[0-9.]/.test(normalized[i])) {
        if (normalized[i] === '.') {
          decimalCount++;
          if (decimalCount > 1) {
            return { success: false, error: 'Multiple decimals in number' };
          }
        }
        numStr += normalized[i];
        i++;
      }
      tokens.push(numStr);
      continue;
    }

    // Supported Operators & Parentheses
    if ('+-*/%^()'.includes(char)) {
      tokens.push(char);
      i++;
      continue;
    }

    return { success: false, error: `Unrecognized character: '${char}'` };
  }

  if (tokens.length === 0) {
    return { success: false, error: 'No valid tokens found' };
  }

  let index = 0;

  function parseExpression(): number {
    let result = parseTerm();

    while (index < tokens.length && (tokens[index] === '+' || tokens[index] === '-')) {
      const op = tokens[index++];
      const next = parseTerm();
      if (op === '+') result += next;
      else result -= next;
    }

    return result;
  }

  function parseTerm(): number {
    let result = parsePower();

    while (index < tokens.length && (tokens[index] === '*' || tokens[index] === '/' || tokens[index] === '%')) {
      const op = tokens[index++];
      const next = parsePower();

      if (op === '*') {
        result *= next;
      } else if (op === '/') {
        if (next === 0) {
          throw new Error('Division by zero');
        }
        result /= next;
      } else {
        if (next === 0) {
          throw new Error('Modulo by zero');
        }
        result %= next;
      }
    }

    return result;
  }

  function parsePower(): number {
    let result = parseFactor();

    if (index < tokens.length && tokens[index] === '^') {
      index++;
      const next = parsePower();
      result = Math.pow(result, next);
    }

    return result;
  }

  function parseFactor(): number {
    if (index >= tokens.length) {
      throw new Error('Unexpected end of expression');
    }

    // Unary plus or minus
    if (tokens[index] === '+') {
      index++;
      return parseFactor();
    }
    if (tokens[index] === '-') {
      index++;
      return -parseFactor();
    }

    const token = tokens[index++];

    if (token === '(') {
      const result = parseExpression();
      if (index >= tokens.length || tokens[index] !== ')') {
        throw new Error('Missing closing parenthesis');
      }
      index++; // consume ')'
      return result;
    }

    const num = parseFloat(token);
    if (isNaN(num)) {
      throw new Error(`Invalid numeric token: '${token}'`);
    }

    return num;
  }

  try {
    const rawValue = parseExpression();

    if (index < tokens.length) {
      return { success: false, error: `Unexpected token '${tokens[index]}'` };
    }

    if (!isFinite(rawValue)) {
      return { success: false, error: 'Result is undefined or infinite' };
    }

    // Format to 8 decimal places max, stripping unnecessary trailing zeros
    const rounded = Math.round(rawValue * 100000000) / 100000000;
    return {
      success: true,
      value: rounded,
      formatted: String(rounded),
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Calculation error';
    return { success: false, error: message };
  }
}
