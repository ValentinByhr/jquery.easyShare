(function ($) {
    var pluginName = 'easyShare',
        defaults = {
            url: '',
            title: '',
            text: '',
            imageUrl: '',
            popupWidth: 600,
            popupHeight: 350,
            popupParameters: 'location=no, status=no, scrollbars=no, toolbar=no, menubar=no'
        };
 
    function EasyShare(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }
 
    EasyShare.prototype.init = function () {
        var options = this.options,
            shareWindow = {},
            element = this.element,
            popupParameters = options.popupParameters + ', width=' + options.popupWidth + ', height=' + options.popupHeight;
            
            $(element).click(function () {

		// Add more sharing options here
	    	if ($(element).hasClass('facebook')) {
                    shareWindow = window.open('http://facebook.com/share.php?s=100&p[title]=' + encodeURI(options.title)
                                                + '&p[summary]=' + encodeURI(options.text)
                                                + '&p[url]=' + encodeURI(options.url)
                                                + '&&p[images][0]=' + encodeURI(options.imageUrl)
                                                , 'sharer', popupParameters);
                shareWindow.focus();
        	} else if ($(element).hasClass('twitter')) {
	            shareWindow = window.open('https://twitter.com/share?text=' + encodeURI(options.title)
	                                        + '&url=' + encodeURI(options.url)
	                                        , 'sharer', popupParameters);
	            shareWindow.focus();
		} else if ($(element).hasClass('vkontakte')) {
		    shareWindow = window.open('http://vkontakte.ru/share.php?title=' + encodeURI(options.title)
		                                + '&description=' + encodeURI(options.text)
		                                + '&url=' + encodeURI(options.url)
		                                , 'sharer', popupParameters);
		    shareWindow.focus();
		}
            });
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {  
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new EasyShare(this, options));
            }
        });
    }
})(jQuery);
