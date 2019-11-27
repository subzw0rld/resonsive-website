export const random = base => {
    if (Array.isArray(base)) return Math.random() * (base[1] - base[0]) + base[0];
    return Math.random() * base;
};

export const pickRandom = arr => {
    if (Array.isArray(arr)) return arr[Math.floor(Math.random() * arr.length)];
    return arr;
};