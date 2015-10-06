var _ = require('underscore'),
  Host64 = require('./lib/host64');

function getHosts() {
  var os = require('os');
  var interfaces = os.networkInterfaces();
  var hosts = [];

  function pushHost(a) {
    if (a.family === 'IPv4') {
      if (a.address === '127.0.0.1') return;
      hosts.push(a.address);
    }
  }

  for (var name in interfaces) {
    var addr = interfaces[name];
    addr.forEach(pushHost);
  }

  return hosts;
}

var DEFAULT_OPTS = {
  proxy: 'catx.me/miao/',
  protocol: '',
  port: 80,
  path: '/',
  query: {},
};

function parseProxyUrl(proxy) {
  var m = /((http|https):\/\/)?(.*?)(\/)?$/.exec(proxy);
  return {
    protocol: m[2] || "" ,//=== undefined ? "" : m[2],
    url: m[3]
  };
}

function buildQueryString(q) {
  var pairs = [];
  for (var key in q) {
    pairs.push(key + "=" + escape(q[key]));
  }
  return pairs.length === 0 ? "" : ("?" + pairs.join('&'));
}

function build(opts) {
  opts = _.defaults(opts || {}, DEFAULT_OPTS);
  var proxy = parseProxyUrl(opts.proxy);

  var protocol = proxy.protocol === "" ? "//" : (proxy.protocol + "://");

  var o = opts.protocol !== "" && proxy.protocol !== opts.protocol ? (opts.protocol + "://") : "";
  var h = Host64.encode(getHosts());
  var t = opts.port === 80 ? "" : (":" + opts.port);
  var p = opts.path === '/' ? '' : ("/" + opts.path.replace(/^\//, ""));
  var q = buildQueryString(opts.query);

  return protocol + proxy.url + "/#" + o + h + t + p + q;
}

module.exports = build;
