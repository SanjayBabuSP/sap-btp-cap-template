sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"company/sample/sampleui/test/integration/pages/BooksMain"
], function (JourneyRunner, BooksMain) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('company/sample/sampleui') + '/test/flp.html#app-preview',
        pages: {
			onTheBooksMain: BooksMain
        },
        async: true
    });

    return runner;
});

