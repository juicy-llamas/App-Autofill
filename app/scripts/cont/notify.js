'use strict';
console.log( "DEBUG: starting notify on " + window.location.href );

/*
 * The notify script is in charge of
 * 		- passing messages from the bkgd script(s) to the page
 *		- taking user commands from the page (drop down menus) and routing them to the bkgd.
 */

browser.runtime.onMessage.addListener( ( m ) => {
	console.log( "A MESSAGE FROM THE DIVINES:" );
	console.log( m.msg );
	if ( m.req ) console.log( req );
} );
