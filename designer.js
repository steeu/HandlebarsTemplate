(function(HandlebarsTemplate) {

    /* Default width and height of your widget */
    HandlebarsTemplate.setWidth('400');
    HandlebarsTemplate.setHeight('400');

    /* Define custom event for your widget */
	HandlebarsTemplate.addEvent({
		'name':'click',
		'description':'Click',
		'category': 'Custom Events'
	});	
	HandlebarsTemplate.addEvent({
		'name':'render',
		'description':'Render',
		'category': 'Custom Events'
	});
//    /* Customize existing properties */
//    HandlebarsTemplate.customizeProperty('test', {
//        sourceTitle: 'Test Source',
//        title: 'Test Static Value',
//        description: 'Add a datasource to this property.'
//    });

//    /* Add a Label property */
//    HandlebarsTemplate.addLabel({
//        'defaultValue': '',
//        'position': 'top'
//    });

//    /* Set the Design and Styles panels */
//    HandlebarsTemplate.setPanelStyle({
//        'fClass': true,
//        'text': true,
//        'background': true,
//        'border': true,
//        'sizePosition': true,
//        'label': true,
//        'disabled': ['border-radius']
//    });

//    /* Override widget's initialization */
//    HandlebarsTemplate.prototype.init = function() {
//        this.node.innerHTML = "Widget Text"; /* Include text inside the widget */
//    }

});

// For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3870.html