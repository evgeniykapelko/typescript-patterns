

function toString<K>(param: K): string | undefined {
    if (Array.isArray(param)) {
        return param.toString();
    }

    switch (typeof param) {
        case 'string':
            return param;
        case 'number':
        case 'symbol':
        case 'bigint':
        case 'boolean':
        case 'function':
            return [param].toString();
        case 'object':
            return JSON.stringify(param);
        case 'number':
        default:
            return undefined;
    }
}

console.log(toString<object>({}));
console.log(toString<string>('test'));
console.log(toString<boolean>(true));