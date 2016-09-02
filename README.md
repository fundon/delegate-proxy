# delegate-proxy

Super easy delegating method and accessor, using es6 Proxies with less than 15 lines of code.

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

bar       // { n: 1, end: [Function: end] }
foo       // { set: [Function: set], sub: [Function: sub] }
d         // {}

d.n       // => 1
d.add(1)
d.n       // => 2

d.sub(2)
d.n       // => 0

d.set(1)
d.n       // 1

d.n = 233
d.n       // 233
```

## Badges

![](https://img.shields.io/badge/license-MIT-blue.svg)
[![Build Status](https://travis-ci.org/fundon/delegate-proxy.svg?branch=master)](https://travis-ci.org/fundon/delegate-proxy)
[![codecov](https://codecov.io/gh/fundon/delegate-proxy/branch/master/graph/badge.svg)](https://codecov.io/gh/fundon/delegate-proxy)

---

> [fundon.me](https://fundon.me) &nbsp;&middot;&nbsp;
> GitHub [@fundon](https://github.com/fundon) &nbsp;&middot;&nbsp;
> Twitter [@_fundon](https://twitter.com/_fundon)
