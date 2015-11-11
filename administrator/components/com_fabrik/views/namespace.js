/**
 * Admin Namespace
 *
 * @copyright: Copyright (C) 2005-2015, fabrikar.com - All rights reserved.
 * @license:   GNU/GPL http://www.gnu.org/copyleft/gpl.html
 */

(function () {
	if (typeOf(window.FabrikAdmin) === 'object') {
		return;
	}
	FabrikAdmin = {};

	// Various Joomla element plugins used to control JForm elements
	FabrikAdmin.model = {'fields': {'fabriktable': {}, 'element': {}}};

	// Function to apply tips to page, after ajax call has loaded a plugin's form
	FabrikAdmin.reTip = function () {
		jQuery.each($('.hasTip'), function (key, el) {
			var title = el.get('title');
			if (title) {
				var parts = title.split('::', 2);
				el.store('tip:title', parts[0]);
				el.store('tip:text', parts[1]);
			}
		});
		var JTooltips = new Tips($('.hasTip'), { maxTitleChars: 50, fixed: false});

		// Joomla3.2
		if (typeof(jQuery) !== 'undefined') {
			jQuery('.hasTooltip').tooltip({'html': true, 'container': 'body'});
		}
	};

	$(window).trigger('fabrik.admin.namespace');
}());

if (typeof(jQuery) !== 'undefined') {

	// Relay radio button group clicks for content added via ajax calls
	(function ($) {
		$(document).on('click', '.btn-group label:not(.active)', null, function (event) {
			var label = $(this);
			var input = $('#' + label.attr('for'));
			if (!input.prop('checked')) {
				label.closest('.btn-group').find("label").removeClass('active btn-success btn-danger btn-primary');
				if (input.val() === '') {
					label.addClass('active btn-primary');
				} else if (parseInt(input.val(), 10) === 0) {
					label.addClass('active btn-danger');
				} else {
					label.addClass('active btn-success');
				}
				input.prop('checked', true);
			}
		});
	})(jQuery);
}
