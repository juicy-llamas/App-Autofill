'use strict';
console.log( "DEBUG: starting notify on " + window.location.href );

let bport = browser.runtime.connect( { "name": window.location.href } );
bport.onMessage.addListener( ( m ) => {
	console.log( "A MESSAGE FROM THE DIVINES:" );
	console.log( m.msg );
	if ( m.req ) console.log( req );
} );
