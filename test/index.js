
/**
 * Dependencies.
 */

var Fault = require('..');
var assert = require('assert');

/**
 * Tests.
 */

describe('Fault(description)', function() {
  it('should be a function', function() {
    assert.equal(typeof Fault, 'function');
  });

  it('should be a constructor', function() {
    var fault = new Fault('server failure');
    assert(fault instanceof Fault);
  });

  it('should not require the new keyword', function() {
    var fault = Fault('server failure');
    assert(fault instanceof Fault);
  });

  it('should require a fault description', function() {
    assert.throws(Fault, /You must supply a fault description/);
  });

  it('should require fault description to be a string', function() {
    assert.throws(function() { Fault(1) }, /The fault description must be a string/);
  });

  it('should create a tree with a root node', function() {
    var description = 'server failure';
    var fault = Fault(description);

    assert(fault.tree);
    assert.deepEqual(fault.tree, { root: { value: description, children: [] } });
  });
});

describe('Fault#cause(description)', function() {
  it('should add a cause to the tree', function() {
    var description = 'server failure';
    var cause = 'security compromised';

    var fault = Fault(description).cause(cause);

    assert(fault.tree);
    assert.deepEqual(fault.tree, { root: { value: description, children: [{ value: cause, children: [] }] } });
  });

  it('should add a cause with sub-causes to the tree', function() {
    var fault = Fault('server failure')
      .cause('security compromised')
      .cause('resource exhaustion', 'out of disk space OR out of memory')
      .cause('hardware failure', 'power failure OR cooling failure OR CPU failure');

    assert(fault.tree);
    assert.deepEqual(fault.tree, {
      root: {
        value: "server failure",
        children: [
          { value: "security compromised", children: [] },
          { value: "resource exhaustion", children: [
              { value: "out of disk space ", children: [] },
              { connection: "OR" },
              { value: " out of memory", children: [] }
            ]
          },
          { value: "hardware failure", children: [
              { value: "power failure ", children: [] },
              { connection: "OR" },
              { value: " cooling failure ", children: [] },
              { connection: "OR" },
              { value: " CPU failure", children: [] }
            ]
        }]
      }
    });
  });
});
