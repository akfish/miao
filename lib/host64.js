(function(exports) {
  function encodeHosts(hosts) {
    var arr = hosts
      .join('.')
      .split('.')
      .map(function (s) { return parseInt(s); });

    if (typeof Buffer === 'function') {
      var b = new Buffer(arr);
      return b.toString('base64');
    } else {
      var u8 = new Uint8Array(arr);
      return btoa(String.fromCharCode.apply(null, u8));
    }
  }

  function base64ToBuffer(s) {
    return new Uint8Array(atob(s)
      .split("")
      .map(function(c) {
        return c.charCodeAt(0);
      })
    );
  }

  function decodeHosts(s) {
    var b = typeof Buffer === 'function' ? new Buffer(s, 'base64') : base64ToBuffer(s);
    var hosts = [];
    var addr = "";
    for (var i = 0; i < b.length; i++) {
      var n = b[i];//.readUIntLE(i, 1);
      addr += n;
      if (i % 4 == 3) {
        hosts.push(addr);
        addr = "";
      } else {
        addr += '.';
      }
    }
    return hosts;
  }

  exports.encode = encodeHosts;
  exports.decode = decodeHosts;

})(typeof exports === 'undefined' ? (this.Miao = this.Miao || {}) : exports);
