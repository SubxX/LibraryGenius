export const excludePassword = (obj) => {
    if (typeof obj !== 'object') throw new Error('Object expected')
    delete obj['password']
    return obj
}