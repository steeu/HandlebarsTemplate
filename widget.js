WAF.define('HandlebarsTemplate', ['waf-core/widget'], function(widget) {
	
    var HandlebarsTemplate = widget.create('HandlebarsTemplate', {
        init: function() {
            try {
            	var _this = this;

                // datasource
                var dataSource = WAF.sources[_this.options.datasource],
                    templateDataContent = dataSource.getAttributeNames().join(',');
                
                // load template data
                dataSource.toArray(templateDataContent, {
                    onSuccess: function(event){
                        // add content to element                
                        _this.templateData = {
                            entity: event.result
                        };
                        // call html renderer function
                        _this.renderHTML();
                    }
                });

                // load template                
                var templateFileRequest = new XMLHttpRequest();
                templateFileRequest.open('GET', '/templates/template.html', true);
                templateFileRequest.onload = function() {
                    if (templateFileRequest.status >= 200 && templateFileRequest.status < 400) {
                        // get file content
                        _this.templateSource = templateFileRequest.responseText;
                        // call html renderer function
                        _this.renderHTML();
                    } else {
                        throw 'reached target server of template file, but it returned an error'
                    }
                };
                templateFileRequest.onerror = function() {
                    throw 'connection error'
                };

                templateFileRequest.send();
            } catch (e) {
                console.log(e.message);
            }
        },
        datasource: widget.property({
    		type: 'datasource',
    		bindable: true
    	}),
        templateFolder: widget.property({
    		type: 'string',
    		defaultValue: '/templates/',
    		bindable: false
    	}),
        templateFile: widget.property({
    		type: 'string',
    		defaultValue: 'template.html',
    		bindable: false
    	}),
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