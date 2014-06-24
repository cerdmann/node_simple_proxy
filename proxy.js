/*
 * A simple attempt at a proxy 
 */

/*jshint           bitwise  : true,  camelcase : false,
 curly    : true,  eqeqeq   : true,  freeze    : true,
 immed    : true,  indent   : 2,     noarg     : true,
 nonbsp   : true,  nonew    : true,  quotmark  : single,
 undef    : true,  unused   : true,  strict    : true,
 trailing : true,  maxdepth : 2,     maxlen    : 78,
 jquery   : true,  plusplus : true,  node      : true
 */
'use strict';

var http = require( 'http' );
var url = require( 'url' );
//var map = require( 'through2-map' );

var destination_base = process.argv[ 2 ];
var destination_port = process.argv[ 3 ];

var server = http.createServer( function( request, response ) {
  var parsed_url = url.parse( request.url, true );
  
  var options = {
    hostname  : destination_base,
    port      : destination_port,
    method    : request.method,
    path      : parsed_url.path,
    headers   : request.headers
  };

  var follow_on_request = http.request( options, function( proxied_res ) {
    console.log( 'STATUS: ' + proxied_res.statusCode );
    proxied_res.pipe( response );
  });
  follow_on_request.end();
});

server.listen( 8000 );

console.log( 'Server listening on port: 8000 ' );
