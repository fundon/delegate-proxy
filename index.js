module.exports = function delegateProxy (target, origin) {
  return new Proxy(target, {
    get (target, key, receiver) {
      if (Reflect.has(target, key)) return Reflect.get(target, key, receiver)
      const value = Reflect.get(origin, key)
      // Must bound origin
      if ('function' === typeof value) return value.bind(origin)
      return value
    },
    set (target, key, value, receiver) {
      return Reflect.has(target, key) ? Reflect.set(target, key, value, receiver) : Reflect.set(origin, key, value)
    }
  })
}
