# delegate-proxy

Super easy delegating method and accessor, using es6 Proxies with less than 10 lines of code.

## Installation

```
$ npm install delegate-proxy
```

## Examples

```js
const delegateProxy = require('delegate-proxy')

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

d.n       // => 1
d.add(1)
d.n       // => 2

d.sub(2)
d.n       // => 0

d.set(1)
d.n       // 1
```

## Badges

![](https://img.shields.io/badge/license-MIT-blue.svg)
[![Build Status](https://travis-ci.org/fundon/compose-iterator.svg?branch=master)](https://travis-ci.org/fundon/compose-iterator)

---

> [fundon.me](https://fundun.me) &nbsp;&middot;&nbsp;
> GitHub [@fundon](https://github.com/fundon) &nbsp;&middot;&nbsp;
> Twitter [@_fundon](https://twitter.com/_fundon)
