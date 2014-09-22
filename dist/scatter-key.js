define(['snap', 'config', 'color-utils'],
function(Snap,   Config,   Color) {
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
	var Key = function(paper, x, y, width, columns, columnWidth, centerItems, values, maxValues, maxValueLength) {
		this._paper = paper;
		this.node = paper.g();
		this.x = x;
		this.y = y;
		this.width = width;
		this.columns = columns;
		this.columnWidth = columnWidth;
		this.centerItems = centerItems;
		this.values = values;
		this.maxValues = maxValues;
		this.maxValueLength = maxValueLength;
	}

	Key.prototype = {
		"constructor": Key,
		"hide": function() {},
		"remove": function() {
			this.node.parent.remove(this.node);
			this.node = null;
		},
		"render": function() {
			var numberOfValues = this.values.length;

			if (typeof this.maxEntries === 'undefined' ||
				this.maxEntries > numberOfValues) {
				this.maxEntries = numberOfValues;
			}
			
			if (typeof this.maxValueLength === 'undefined') {
				this.maxValueLength = Config.KEY_MAX_TEXT_LENGTH;
			}
			
			var colorClasses = Color.harmonious(numberOfValues)
			
			this.container = this.node.rect(this.x, this.y, this.width, 10)
				.addClass('fm-key-container')
				.attr({
					fill: Config.KEY_NEUTRAL_FILL,
					stroke: Config.KEY_NEUTRAL_STROKE
				});

			var items = this.node.g().addClass('fm-key-items');

			var columnOffset = 0;
			var rowOffset = 0;

			var title;
			this.values.forEach(function(value, valueIndex) {
				var keyColor = colorClasses[valueIndex];

				if (valueIndex !== 0 && valueIndex % this.columns === 0) {
					columnOffset = 0;
					rowOffset += title.getBBox().height + Config.KEY_ROWSPACING;
				}

				var truncated = false;
				if (value.length > this.maxValueLength) {
					var labelText = value.substring(0, this.maxValueLength - 3) + '...';
					truncated = true;
				} else {
					var labelText = value;
				}

				var colorRect = this.node.rect(this.x + columnOffset, this.y + Config.KEY_PADDING + rowOffset, 13, 13)
					.addClass(keyColor);
				title = this.node.text(
					this.x + Config.KEY_TEXT_SPACING + colorRect.getBBox().width + columnOffset,
					this.y + Config.KEY_PADDING + rowOffset + parseInt(colorRect.attr('height'), 10) - 1,
					labelText
				)
					.attr({
						'font-family': Config.FONT_FAMILY,
						'font-size': Config.TEXT_SIZE_SMALL
					});

				var itemGroup = this.node.g(colorRect, title)
					.data('fullText', value[valueIndex])
				
				items.append(itemGroup);
				columnOffset += this.columnWidth;

			}.bind(this));

			var itemsBBox = items.getBBox();
			var containerBBox = this.container.getBBox();

			this.container.attr({
				height: itemsBBox.height + Config.KEY_PADDING * 2
			});

			if (this.centerItems === true) {
				items.transform('t' + (containerBBox.width / 2 - itemsBBox.width / 2) + ' 0');
			}

			return this.node.g(this.container, items)
				.addClass('fm-key')
				.attr({
					strokeDasharray: this.width + ',' + containerBBox.height + ',0,' + this.width + ',0'
				});
		},
		"show": function() {},
		"setHeight": function(newHeight) {
			var container = this.node.select('.fm-key-container');

			container.attr({
				height: newHeight + 'px'
			});
		}
	};

	return Key;
});