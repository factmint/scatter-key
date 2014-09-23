define(['snap', 'config', 'key', 'color-utils'],
function(Snap,   Config,   Key,   Color) {
	/**
	 * Represents a key
	 * @constructor
	 * @param {Snap} paper
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} width
	 * @param {Number} columns
	 * @param {Number} columnWidth
	 * @param {String} alignment
	 * @param {Array.<string>} values
	 * @param {Number} maxValues
	 */
	function ScatterKey(paper, x, y, width, columns, columnWidth, centerItems, values, maxValues, maxValueLength) {
		
		Key.call(this, paper, x, y, width, columns, columnWidth, centerItems, values, maxValues, maxValueLength);

	}

	ScatterKey.prototype = Object.create(Key.prototype);

	return ScatterKey;
});