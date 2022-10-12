'use strict';
console.log( "DEBUG: starting main" );

/*
 * The main background class for our project. This will start any other bkgd scripts.
 * For now, it selectively blocks requests, and
 */

const JobAppAutofill = ( function () {
	const main_obj = {};

// 	sends a msg to a tab, if tab doesn't exist it returns -1, 0 is success, and -2 is another error (send error?).
	function __send_msg_tab ( tabid, msg ) {
		let ret = 0;
		browser.tabs.sendMessage( tabid, msg ).catch( ( r ) => {
			if ( false/*error is tab not found*/ ) {
				ret = -1;
			} else {
				console.error( `Failed to send message to ${tabid}:` );
				console.error( r );
				ret = -2;
			}
		} );
		return ret;
	};

	const blocker = ( function () {
		const ret = {};

		const

// 		blocks the request made, and notifies the tab that had the URL of the infraction.
// 		it checks if there is an entry in blocking for the tab id.
		function __intercept_request ( req ) {
			console.log( `DEBUG: request: ${req.url}, ${req.tabId}. blockAll: ${ret.blockAll}` );
			if ( req.tabId === -1 && ret.blockAll ) {
				console.log( `Blocked misc request: ${req.url}` );
				return { cancel: true };
			} else if ( ret.blockAll || ret.blocking[ req.tabId ] !== undefined ) {
// 				if the tab doesn't exist for some reason, no use keeping the entry.
				console.log( "DEBUG: request that came from tab was blocked" );
				if ( __send_msg_tab( req.tabId, { msg: `Blocked request: ${req.url}`, req: req } ) === -1 ) {
					delete ret.blocking[ req.tabId ];
					console.error( "Error: nonexistent tab somehow made a request! Deleted the entry for the tab." );
// 				otherwise cancel the req (msg is sent)
				}
				console.log( "we got here" );
				return { cancel: true };
			} else
				console.log( `DEBUG: not blocked--block val for tab is ${ret.blocking[ req.tabId ]}` );
		}

		const enableBlocking = () => browser.webRequest.onBeforeRequest.addListener(
			__intercept_request,
			{ urls: [ "<all_urls>" ] },
			[ "blocking", "requestBody" ]
		);

		const disableBlocking = () =>
			browser.webRequest.onBeforeRequest.removeListener( __intercept_request );

		const unload = () => {

			disableBlocking();
		};

		const main = () => {
// 			menu item to block for cur tab
			browser.contextMenus.create( {
				id: "b-tab",
				type: "normal",
				title: "DEBUG: Block/intercept requests for this tab",
				contexts: [ "all" ],
				checked: false
			}, () => { const err = browser.runtime.lastError; if ( err ) { console.error( "Error encountered creating menu" ); console.error( err ); } } );
//			menu item to whitelist tab
			browser.contextMenus.create( {
				id: "b-stp",
				type: "normal",
				title: "DEBUG: STOP blocking requests for this tab",
				contexts: [ "all" ],
				checked: false
			}, () => { const err = browser.runtime.lastError; if ( err ) { console.error( "Error encountered creating menu" ); console.error( err ); } } );
//			menu item to whitelist tab
			browser.contextMenus.create( {
				id: "b-clr",
				type: "normal",
				title: "DEBUG: Clear tab block list",
				contexts: [ "all" ],
				checked: false
			}, () => { const err = browser.runtime.lastError; if ( err ) { console.error( "Error encountered creating menu" ); console.error( err ); } } );
// 			menu item to block for all tabs
			browser.contextMenus.create( {
				id: "b-all",
				type: "checkbox",
				title: "DEBUG: Block everything",
				contexts: [ "all" ],
				checked: false
			}, () => { const err = browser.runtime.lastError; if ( err ) { console.error( "Error encountered creating menu" ); console.error( err ); } } );
// 			clicking on the menu items.
			browser.contextMenus.onClicked.addListener( ( info, tab ) => {
				console.warn( `block checkbox marked. Url: ${tab.url}` );
				if ( tab.id === browser.tabs.TAB_ID_NONE )
					return;

				switch ( info.menuItemId ) {
					case "b-tab":
						if ( info.checked )
							ret.blocking[ tab.id ] = true;
						else
							delete ret.blocking[ tab.id ];
						console.log( ret.blocking );
						break;
					case "b-all":
						ret.blockAll = info.checked;
						console.log( ret.blockAll );
						break;
					default:
						console.error( "A menu item was clicked other than specified ones!" );
						break;
				}
			} );

// 			turn on blocking by default
			enableBlocking();
		};

// 		Using Object.defineProperty( ret, bla... vs ret.bla =... makes the properties read only and unmutable.
		Object.defineProperty( ret, 'main', { value: main } );
		Object.defineProperty( ret, 'enableBlocking', { value: enableBlocking } );
		Object.defineProperty( ret, 'disableBlocking', { value: disableBlocking } );
		Object.defineProperty( ret, 'blockAll', { value: false, writable: true } );
		Object.defineProperty( ret, 'blocking', { value: {}, writable: true } );
		return ret;
	} )();

	const main = () => {
		main_obj.blocker.main();
	};

	Object.defineProperty( main_obj, 'blocker', { value: blocker } );
	Object.defineProperty( main_obj, 'main', { value: main } );
	return main_obj;
} )();

JobAppAutofill.main();
