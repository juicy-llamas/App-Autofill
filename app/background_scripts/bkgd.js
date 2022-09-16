'use strict';

// by the time this script has finished loading, the document would be loaded, so we can just run our code as normal.

console.log( "DEBUG: hello" );

const JobAppAutofill = ( function () {
	console.log( "DEBUG: in constructor" );

	this.blocker = ( function () {
		const ret = {};
		console.log( "DEBUG: in constructor2" );

		function __intercept_request ( req ) {
			console.log( `Intercepted: ${ req.url }` );
			console.log( req );
			return { redirectUrl: "" };
		}
		console.log( "DEBUG: in constructor2 2" );

		console.log( browser );
		console.log( browser.webRequest );
		console.log( browser.webRequest.onBeforeRequest );
		console.log( browser.webRequest.onBeforeRequest.addListener );

		this.enableBlocking = () => browser.webRequest.onBeforeRequest.addListener(
			__intercept_request,
			{ urls: [ "<all_urls>" ] },
			[ "blocking", "requestBody" ]
		);
		console.log( "DEBUG: in constructor2 3" );

		this.disableBlocking = () => browser.webRequest.onBeforeRequest.removeListener( __intercept_request );
		console.log( "DEBUG: in constructor2 4" );
	} )();
	console.log( "DEBUG: past blocker" );

	this.main = () => {
		console.log( "DEBUG: in main" );
		this.blocker.enableBlocking();
		console.log( "JobAppAutofill: started on " + window.href );
	};
	console.log( "DEBUG: exiting constructor" );

// 	main_obj.defineProperty( main_obj, 'blocker', { value: blocker } );
// 	main_obj.defineProperty( main_obj, 'main', { value: main } );
} )();

JobAppAutofill.main();
console.log( JobAppAutofill );
