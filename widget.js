WAF.define('HandlebarsTemplate', ['waf-core/widget'], function(widget) {
	
    var HandlebarsTemplate = widget.create('HandlebarsTemplate', {
        init: function() {
            try {
            	var _this = this;

            	// create editor with CKEditor plugin
            	_this.template = '<div class="entry"><h1>Test</h1>{{#each entity}}<div class="body">{{name}}</div>{{/each}}</div>';
            	_this.templateFn = Handlebars.compile(_this.template);
                
                // datasource
                var templateData = WAF.sources[this.options.datasource];
                var arrayContent = templateData.getAttributeNames().join(',');
                
                // get array
                templateData.toArray('name', {
                    onSuccess: function(event){
                        // add content to element                
                        _this.node.innerHTML = _this.templateFn({entity: event.result});
                    }
                });

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
    	})
    });

//    /* Map the custom event above to the DOM click event */
//    HandlebarsTemplate.mapDomEvents({
//        'click': 'action'
//    });

    return HandlebarsTemplate;

});

/* For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3871.html */