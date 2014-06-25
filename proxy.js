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
var config = require( './config/config' );
var lynx = require( 'lynx' );

var port = process.argv[ 2 ];

var metrics = new lynx( config.statsd_ip, config.statsd_port, {} );

var server = http.createServer( function( request, response ) {
  var parsed_url = url.parse( request.url, false );

  var options = {
    hostname  : parsed_url.hostname,
    port      : parsed_url.port,
    method    : request.method,
    path      : parsed_url.path,
    headers   : request.headers,
    auth      : request.auth
  };
  var start_request_time = process.hrtime();
  
  var proxied_request = http.request( options, function( proxied_res ) {

    response.writeHead( proxied_res.statusCode, proxied_res.headers );
    proxied_res.on( 'end', function() {
      var elapsed = process.hrtime( start_request_time )[1] / 1000000;
      var hostname = options.hostname.replace( /\./g, '_' );
      var pathname = parsed_url.pathname.replace( /\//g, '.' ); 
      var stat =  'http.' + options.method + '.' + hostname + pathname; 
                  
      console.log( stat + elapsed.toFixed( 0 ) );
      response.end();
      metrics.timing( stat, elapsed.toFixed( 0 ) );
    });
    proxied_res.pipe( response );

  });
  proxied_request.end();
});

server.listen( port );

console.log( 'Server listening on port: ' + port.toString() );
