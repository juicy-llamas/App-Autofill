'use strict';
console.log( "DEBUG: starting main" );

/*
 * The main background class for our project. This will start any other bkgd scripts.
 * For now, it selectively blocks requests, and
 */

const JobAppAutofill = ( function () {
	const main_obj = {};

	const blocker = ( function () {
		const ret = {};

// 		blocks the request made, and notifies the tab that had the URL of the infraction.
// 		Since it does URL matching, it does NOT match any given request made by a tab.
		function __intercept_request ( req ) {
			for ( let p = 0; p < main_obj.ports.length; p++ ) {
				const pp = main_obj.ports[ p ];
				const origUrl = req.frameAncestors[ 0 ] && req.frameAncestors[ 0 ].url || req.originUrl;
// 				console.log( `matching ${pp.name} with ${origUrl}` );
				if ( origUrl.includes( pp.name ) ) {
					console.log( "matched a request (" + origUrl +") with " + pp.name );
					if ( pp.__blocking ) {
						pp.postMessage( { msg: "Blocked request ("+req.url+")", req: req } );
						return { cancel: true };
					} else {

					}
				}
			}
			console.log( "did not match request " + req.url );
			console.log( req );
			if ( main_obj.block_all )
				return { cancel: true };
		}

		const enableBlocking = () => browser.webRequest.onBeforeRequest.addListener(
			__intercept_request,
			{ urls: [ "<all_urls>" ] },
			[ "blocking", "requestBody" ]
		);

		const disableBlocking = () =>
			browser.webRequest.onBeforeRequest.removeListener( __intercept_request );

// 		Using Object.defineProperty( ret, bla... vs ret.bla =... makes the properties read only and unmutable.
		Object.defineProperty( ret, 'enableBlocking', { value: enableBlocking } );
		Object.defineProperty( ret, 'disableBlocking', { value: disableBlocking } );
		Object.defineProperty( ret, 'blockAll', { value: false, writeable: true } );
		return ret;
	} )();

	const main = () => {
		browser.runtime.onConnect.addListener( ( port ) => {
			console.log( 'connected to tab: ' + port.name );
			port.__blocking = false;
			main_obj.ports.push( port );
			port.postMessage( { msg: "test-server" } );

			port.onMessage.addListener( ( m ) => {
				console.log( `Tab ${port.name} says ${m.msg}.` );
				if ( m.block ) port.__blocking = m.block;
			} );
		} );
		main_obj.blocker.enableBlocking();
	};

	Object.defineProperty( main_obj, 'blocker', { value: blocker } );
	Object.defineProperty( main_obj, 'main', { value: main } );
	Object.defineProperty( main_obj, 'ports', { value: [] } );

	return main_obj;
} )();

JobAppAutofill.main();
