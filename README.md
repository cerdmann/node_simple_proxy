node_simple_proxy
=================

a simple proxy for http

Install
-------
        git clone https://github.com/cerdmann/node_simple_proxy.git
        cd node_simple_proxy
        npm install

        Modify config/config.js with ip and port of statsd server

Usage
-----
        node proxy.js {port to listen on}
        
        Hook up a browser to use proxy port used when starting proxy.js
        
        Browse a site
        
        View stats in graphite
