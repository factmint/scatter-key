define(['snap', 'config', 'color-utils'],
function(Snap,   Config,   Color) {
	return Snap.plugin(function(Snap, Element, Paper) {
		/**
		 * Plugin to draw a key for a scatter graph, including the ability
		 * to display lines of best fit.
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Number} width
		 * @param {Array} data
		 * @param {Number} maxEntries
		 */
		Paper.prototype.scatterKey = function(x, y, width, data, maxEntries) {

			if (typeof maxEntries === 'undefined' ||
				maxEntries > data.length) {
				maxEntries = data.length;
			}

			var colorClasses = Color.harmonious(data.length);

			var container = this.rect(x, y, width, 0)
				.addClass('fm-key-container')
				.attr({
					fill: Config.KEY_NEUTRAL_FILL,
					stroke: Config.KEY_NEUTRAL_STROKE
				});

			var items = this.g();

			var columnOffset = 0;
			var rowOffset = 0;

			function showFullText() {

			}

			function hideFullText() {

			}

			for (var i = 0; i < maxEntries; i++) {
				var keyColor;
				
				if(i !== 0 && i % Config.KEY_COLUMNS === 0) {
					columnOffset = 0;
					rowOffset += title.getBBox().height + Config.KEY_ROWSPACING;
				}

				if (data[i].hasOwnProperty('overflow')) {
					keyColor = Color.overflowClass;
				} else {
					keyColor = colorClasses[i];
				}

				var truncated = false;
				if (data[i].length > Config.KEY_MAX_TEXT_LENGTH) {
					var labelText = data[i].substring(0, Config.KEY_MAX_TEXT_LENGTH) + '...';
					truncated = true;
				} else {
					var labelText = data[i];
				}

				var colorRect = this.rect(x + Config.KEY_PADDING * width + columnOffset, y + Config.KEY_PADDING * width + rowOffset, 13, 13)
					.addClass(keyColor);
				var title = this.text(
					x + Config.KEY_PADDING * width * Config.KEY_TEXT_SPACING + colorRect.getBBox().width + columnOffset,
					y + Config.KEY_PADDING * width + rowOffset + parseInt(colorRect.attr('height'), 10) - 1,
					labelText
				)
					.attr({
						'font-family': Config.FONT_FAMILY,
						'font-size': Config.TEXT_SIZE_SMALL
					});

				var itemGroup = this.g(colorRect, title)
					.data('fullText', data[i])
				
				//truncated && itemGroup.hover(showFullText, hideFullText, itemGroup);

				items.append(itemGroup);
				columnOffset += parseInt(container.attr('width'), 10) / Config.KEY_COLUMNS;
			}

			container.attr({
				height: items.getBBox().height + Config.KEY_PADDING * (width * 1.5)
			});

			items.addClass('fm-key-items');

			var key = this.g(container, items)
				.addClass('fm-key')
				.attr({
					strokeDasharray: width + ',' + container.attr('height') + ',0,' + width + ',0'
				});

			return key;
		};
	});
});