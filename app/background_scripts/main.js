'use strict';

// by the time this script has finished loading, the document would be loaded, so we can just run our code as normal.

console.log( "DEBUG: hello" );

const JobAppAutofill = ( function () {
	let main_obj = {};

	console.log( "DEBUG: constructor" );
	let blocker = ( function () {
		const ret = {};

		function __intercept_request ( req ) {
			console.log( `Intercepted: ${ req.url }` );
			console.log( req );
			return {};//{ redirectUrl: "" };
		}

		let enableBlocking = () => browser.webRequest.onBeforeRequest.addListener(
			__intercept_request,
			{ urls: [ "<all_urls>" ] },
			[ "blocking", "requestBody" ]
		);

		let disableBlocking = () => browser.webRequest.onBeforeRequest.removeListener( __intercept_request );
		console.log( "DEBUG: crit point" );

// 		Using Object.defineProperty( ret, bla... vs ret.bla =... makes the properties read only and unmutable.
		Object.defineProperty( ret, 'enableBlocking', { value: enableBlocking } );
		Object.defineProperty( ret, 'disableBlocking', { value: disableBlocking } );
		console.log( "DEBUG: end of block" );
		return ret;
	} )();
	console.log( "DEBUG: past blocker" );

	let main = () => {
		console.log( "DEBUG: in main" );
		JobAppAutofill.blocker.enableBlocking();
		console.log( "JobAppAutofill: started on " + window.href );
	};
	console.log( "DEBUG: exiting constructor" );

	Object.defineProperty( main_obj, 'blocker', { value: blocker } );
	Object.defineProperty( main_obj, 'main', { value: main } );

	return main_obj;
} )();

JobAppAutofill.main();
console.log( JobAppAutofill );
