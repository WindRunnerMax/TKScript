const opt = Object.prototype.toString;

export const isEmptyValue = (value: unknown): value is undefined | null => {
    return value === null || value === void 0;
};

export function isObject(value: unknown): value is Record<string, unknown> {
    return opt.call(value) === "[object Object]";
}

export function isArray(value: unknown): value is unknown[] {
    return opt.call(value) === "[object Array]";
}

export function isNumber(value: unknown): value is number {
    return opt.call(value) === "[object Number]";
}

export function isPlainNumber(value: unknown): value is number {
    return /^(-|\+)?\d+(\.\d+)?$/.test(String(value));
}

export function isString(value: unknown): value is string {
    return opt.call(value) === "[object String]";
}
