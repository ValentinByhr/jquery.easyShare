(function ($) {
    var pluginName = 'easyShare',
        shareServices = {
            facebook: {
                baseUrl: 'http://facebook.com/share.php?s=100',
                url: '&p[url]',
                title: 'p[title]',
                text: '&p[summary]',
                imageUrl: '&p[images][0]'
            },
            twitter: {
                baseUrl: 'https://twitter.com/share?',
                url: '&url',
                text: 'text'
            },
            vkontakte: {
                baseUrl: 'https://vkontakte.ru/share.php?',
                url: '&url',
                title: 'title',
                text: '&description'
            }
        },
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
            
        for (serviceName in shareServices) {
            var service = shareServices[serviceName];
            if ($(element).hasClass(serviceName)) {
                $(element).click({service: service}, function (e) {
                    var popupUrl = '',
                        service = e.data.service;

                    popupUrl = service.baseUrl + service.title + '=' + encodeURI(options.title) + service.url + '=' + encodeURI(options.url);

                    if (service.text) {
                        popupUrl += service.text + '=' + encodeURI(options.text);
                    }

                    if (service.imageUrl) {
                        popupUrl += service.imageUrl + '=' + encodeURI(options.imageUrl);
                    }

                    shareWindow = window.open(popupUrl, 'sharer', popupParameters);
                    shareWindow.focus();
                });
            }
        }            
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
