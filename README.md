# Miao

A most light-weighted LAN HTTP service discovery scheme.

## Motivation

When trying to expose an HTTP service on a host to other devices over LAN,
the developers usually have to ask user to access it via the host's IP address.
That is not very user friendly and sometimes hard to do in some complex LAN setup.

This project provides perhaps the most simple and light-weighted solution for that problem.

* No special client app is required. Just the browser will do.
* The client device will need to be able to connect to a web server (a.k.a the proxy server) that can be accessed via a domain or a static IP address.
* The proxy server only needs to host static page. (GitHub pages would do)

## How does this work

1. All necessary information (i.e. all possible IP addresses of the server) required for resolving the service address will be encoded and attached to the proxy page's URL as its hash.

2. The URL is distributed to other devices (e.g. scanned via QR code)

3. A proxy page runs a script in the client's browser, decodes the hash, tests connection for all possible IPs and redirect to the service that is exposed.

## Installation

```bash
$ npm install miao
```

## Usage

1.Generate service discovery link:

```js
var Miao = require('miao');

var opts = {
  // See below
};
// Get URL
var url = Miao(opts);
```

2.Distribute the generated url to other device (e.g. by scanning a QR code)

3.Put `miao.png` to the web server's root.

## References

### Options

Field | Default | description
----- | ------- | --------------
`proxy` | `catx.me/miao` | Url to the proxy page
`protocol` | `""` | Protocol of exposed HTTP/HTTPs service
`port` | `80` | Port of exposed service
`path` | `/` | Path to be redirected
`query` | `{}` | Queries to be passed to the service

### Hosting your own proxy page

Just clone this project and put to a web server that you see fit.
