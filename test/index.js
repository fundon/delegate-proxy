import test from 'ava'
import delegateProxy from '..'

test(t => {
  const bar = {
    n: 1,

    add (i) {
      this.n += i
    },

    returnThis () {
      return this
    }

  }

  const foo = {

    set (n) {
      this.n = n | 0
    },

    sub (i) {
      this.n -= i
    },

    multiply (i = 1, j = 2) {
      this.n *= i * j
    }

  }

  const d = delegateProxy(foo, bar)

  t.is(d.n, 1)

  d.add(1)
  t.is(d.n, 2)

  d.sub(2)
  t.is(d.n, 0)

  d.set(1)
  t.is(d.n, 1)

  d.n = 233
  t.is(d.n, 233)

  d.n = -1
  d.multiply(1, 2)
  t.is(d.n, -2)

  t.is(bar, d.returnThis())
  t.not(foo, d.returnThis())
  t.not(d, d.returnThis())
})
