const Benchmark = require('benchmark')
const delegate = require('delegates')
const delegateProxy = require('..')

const obj = {}

const p1 = {}
const d1 = delegateProxy(p1, obj)

const d0 = {}
d0.obj = obj
const d = delegate(d0, 'obj')

for (let i = 0, l = 1000; i < l; i++) {
  obj[`a${i}`] = i
  obj[`b${i}`] = function () {}
  obj[`c${i}`] = i
  d.getter(`a${i}`)
  d.method(`b${i}`)
  d.access(`c${i}`)
}

const suite = new Benchmark.Suite()

suite
  .add('delegates#getter', () => {
    /* eslint no-unused-expressions: 0 */
    d0.a0 === 0 ? 1 : 0
  })
  .add('delegateProxy#getter', () => {
    /* eslint no-unused-expressions: 0 */
    d1.a0 === 0 ? 1 : 0
  })
  .on('cycle', event => {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run()

const suite2 = new Benchmark.Suite()

suite2
  .add('delegates#method', () => {
    d0.b0()
  })
  .add('delegateProxy#method', () => {
    d1.b0()
  })
  .on('cycle', event => {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run()

const suite3 = new Benchmark.Suite()

suite3
  .add('delegates#access', () => {
    d0.c0 = 1
  })
  .add('delegateProxy#access', () => {
    d1.c0 = 1
  })
  .on('cycle', event => {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run()

const suite4 = new Benchmark.Suite()

suite4
  .add('Reflect#get', () => {
    Reflect.get(obj, 'a0')
  })
  .add('obj#key', () => {
    /* eslint dot-notation: 0 */
    obj['a0']
  })
  .add('obj.key', () => {
    obj.a0
  })
  .on('cycle', event => {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run()

const suite5 = new Benchmark.Suite()

suite5
  .add('Reflect#has', () => {
    Reflect.has(d0, 'a0')
  })
  .add('key in d0', () => {
    'a0' in d0
  })
  .on('cycle', event => {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run()

const suite6 = new Benchmark.Suite()

suite6
  .add('Reflect#set', () => {
    Reflect.set(obj, 'a0', 2)
  })
  .add('obj#key=', () => {
    /* eslint dot-notation: 0 */
    obj['a0'] = 2
  })
  .on('cycle', event => {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run()
