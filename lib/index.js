
/**
 * Expose `Fault`.
 */

module.exports = Fault;

/**
 * Fault.
 *
 * @param {Object} description
 */

function Fault(description) {
  if (!description) {
    throw new Error('You must supply a fault description');
  }

  if (typeof description !== 'string') {
    throw new Error('The fault description must be a string');
  }

  if (!(this instanceof Fault)) {
    return new Fault(description);
  }

  this.tree = { root: { value: description, children: [] } };
}

/**
 * Cause.
 *
 * @param {String} description
 * @param {String} causes
 */

Fault.prototype.cause = function(description, causes) {
  var result = { value: description, children: [] };

  if (!causes) {
    this.tree.root.children.push(result);
    return this;
  }

  var gates = ['OR', 'AND', 'XOR'];
  for (var i = 0; i < gates.length; i++) {
    var connection = gates[i];
    if (causes.indexOf(connection) > -1) {
      causes = causes.split(connection);
      for (var j = 0; j < causes.length; j++) {
        result.children.push({ value: causes[j], children: [] });
        if (j !== causes.length - 1) {
          result.children.push({ connection: connection });
        }
      }
    }
  }

  this.tree.root.children.push(result);

  return this;
};
