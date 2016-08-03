import test from 'ava'
import delegateProxy from '..'

test(t => {
  const bar = {
    n: 1,

    add (i) {
      this.n += i
    }
  }

  const foo = {

    set (n) {
      this.n = n | 0
    },

    sub (i) {
      this.n -= i
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
})
