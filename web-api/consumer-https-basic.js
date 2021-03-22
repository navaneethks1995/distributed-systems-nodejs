#!/usr/bin/env node

const server = require('fastify')();
const fetch = require('node-fetch');
const https = require('https');
const path = require('path');
const fs = require('fs');
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3000;
const TARGET = process.env.TARGET || 'localhost:4000';

const options = {
    agent: new https.Agent({
        ca: fs.readFileSync(path.join(__dirname,'..','shared','tls','ca-certificate.cert')),
        rejectUnauthorized: false, // Set to false to ignore the authenticity of the CA that signed the certificate
    })
};

server.get('/', async ()=> {
    const req = await fetch(`https://${TARGET}/recipes/42`,options);
    const producer_data = await req.json();

    return {
        consumer_pid: process.pid,
        producer_data
    };
});

server.listen(PORT, HOST, ()=>{
    console.log(`Consumer running at http://${HOST}:${PORT}`);
})