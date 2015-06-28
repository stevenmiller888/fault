
# fault
[![NPM version][npm-image]][npm-url]
[![build status][circle-image]][circle-url]
[![license][license-image]][license-url]

>  A tool for generating fault-tree analyses

## Installation

```bash
$ npm install fault
```

## Usage

```js
var Fault = require('fault-tree');

var fault = Fault('server failure')
  .cause('security compromised')
  .cause('resource exhaustion', 'out of disk space OR out of memory')
  .cause('hardware failure', 'power failure OR cooling failure OR CPU failure');

console.log(fault.tree); // generated fault tree
```

## Understand

![](https://cldup.com/aFuH-Zzcl0.png)

Fault tree analysis (FTA) is a methodology for identifying failures in a system using top-down reasoning. The idea is to start at a root description of the problem, and then break that problem down such that the next problem layer down fully describes the problem layer above it.

## License

[MIT](https://tldrlegal.com/license/mit-license)

[npm-image]: https://img.shields.io/npm/v/fault.svg?style=flat-square
[npm-url]: https://npmjs.org/package/fault
[circle-image]: https://img.shields.io/circleci/project/stevenmiller888/fault.svg
[circle-url]: https://circleci.com/gh/stevenmiller888/fault
[license-image]: https://img.shields.io/npm/l/express.svg
[license-url]: https://tldrlegal.com/license/mit-license