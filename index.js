module.exports = function delegateProxy (target, origin) {
  return new Proxy(target, {
    get (target, key, receiver) {
      if (key in target) return Reflect.get(target, key, receiver)
      const value = origin[key]
      return 'function' === typeof value ? function method () {
        return value.apply(origin, arguments)
      } : value
    },
    set (target, key, value, receiver) {
      if (key in target) return Reflect.set(target, key, value, receiver)
      origin[key] = value
      return true
    }
  })
}
