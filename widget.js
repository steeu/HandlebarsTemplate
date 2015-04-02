WAF.define('HandlebarsTemplate', ['waf-core/widget'], function(widget) {
	
    var HandlebarsTemplate = widget.create('HandlebarsTemplate', {
        init: function() {
            try {
            	var _this = this;

                // datasource
                _this._datasource = WAF.sources[_this.options.datasource];
                _this._templateDataContent = _this._datasource.getAttributeNames().join(',');

                // load template                
                var templateFileRequest = new XMLHttpRequest();
                templateFileRequest.open('GET', _this.templatePath(), true);
                templateFileRequest.onload = function() {
                    if (templateFileRequest.status >= 200 && templateFileRequest.status < 400) {
                        // get file content
                        _this.templateSource = templateFileRequest.responseText;
                        // call html renderer function
                        _this.renderHTML();
                    } else {
                        throw 'reached target server of template file, but server returned an error'
                    }
                };
                templateFileRequest.onerror = function() {
                    throw 'connection error'
                };
                templateFileRequest.send();

                // add on collection change listener
                _this._datasource.addListener('onCollectionChange', function(event) {
                    _this.makeHandlebarsArray();
                });
            } catch (e) {
            	console.log(e);
            }
        },
        datasource: widget.property({
    		type: 'datasource',
    		bindable: true
    	}),
        templatePath: widget.property({
    		type: 'string',
    		defaultValue: '/path/to/template.html',
    		bindable: false
    	}),
    	makeHandlebarsArray: function(){
    	    var _this = this;
    	    
             // load template data
            _this._datasource.toArray(_this._templateDataContent, {
                onSuccess: function(event){
                    // add content to element                
                    _this.templateData = {
                        entity: event.result
                    };
                    // call html renderer function
                    _this.renderHTML();
                }
            });   	    
    	},
    	renderHTML: function(){
    	    var _this = this,
    	        templateFn;

    	    // render data
    	    if (_this.templateData && _this.templateSource) {
    	        var templateFn = Handlebars.compile(_this.templateSource);

    	        // add html to element
    	        _this.node.innerHTML = templateFn(_this.templateData);
    	        // fire complete event
    	        _this.fire('onContentAdded');
    	    }
    	}
    });

    return HandlebarsTemplate;

});

/* For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3871.html */