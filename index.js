module.exports = function delegateProxy (target, origin) {
  return new Proxy(target, {
    get (target, key) {
      if (Reflect.has(target, key)) return target[key]
      const value = origin[key]
      return 'function' === typeof value ? function method () {
        return value.apply(origin, arguments)
      } : value
    },
    set (target, key, value) {
      (Reflect.has(target, key) ? target : origin)[key] = value
      return true
    }
  })
}
