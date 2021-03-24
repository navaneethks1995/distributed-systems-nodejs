#!/usr/bin/env node

const zlib = require('zlib');
const http = require('http');
const path = require('path');
const fs = require('fs');

http.createServer((req,res) => {
    const raw = fs.createReadStream(path.join(__dirname,'index.html'));
    const acceptEncoding = req.headers['accept-encoding'] || '';
    res.setHeader('Content-Type', 'text/plain');
    // console.log(acceptEncoding);

    if(acceptEncoding.includes('gzip')) {
        // console.log('encoding with gzip');
        res.setHeader('Content-Encoding','gzip');
        raw.pipe(zlib.createGzip()).pipe(res);
    }
    else {
        // console.log('no encoding');
        raw.pipe(res);
    }
}).listen(process.env.PORT || 1337);