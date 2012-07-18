/*!
 * Copyright (c) 2012 Dave Fennell (http://www.microtux.co.uk)
 * Dual licensed under the MIT (MIT_LICENSE.txt)
 * and GPL Version 2 (GPL_LICENSE.txt) licenses.
 *
 * Version: 1.0.0
 * Requires jQuery 1.7+
 */
$.extend($.fn, {
	triggerDelegates: function(event){
		var delegate = $(this);
		var listeners = delegate.data("events")[event];

		if (listeners != null)
		{
			$(listeners).each(function(){
				if (this.selector != null)
				{
					delegate.find(this.selector).trigger(event);
				}
			});
		}
	}
});
