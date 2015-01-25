var request = require('request');
var iconv = require('iconv-lite');

function autocompl(opts, done) {
  var req = request;

  // Handle abbreviated form which passes just a string instead of opts.
  if (typeof opts === 'string') {
    opts = {
      partialSearchTerm: opts
    };
  }

  if (opts.request) {
    req = opts.request;
  }

  var requestOpts = {
    url: 'http://suggestqueries.google.com/complete/search',
    qs: {
      q: opts.partialSearchTerm,
      client: 'firefox'
      ds:'yt' // this makes the search from youtube search line  
    },
    // Get body back as a buffer, so that it can be properly decoded since the 
    // response is not going to be any of the native JavaScript encodings.
    encoding: null
  };

  function refineResponseFromSuggest(error, response, buffer) {
    var suggestions = [];

    if (!error) {
      var bodyString = iconv.decode(buffer, 'iso-8859-1');
      try {
        body = JSON.parse(bodyString);
      }
      catch (parseError) {
        done(parseError);
        return;
      }

      if (body && Array.isArray(body) && body.length > 1) {
        suggestions = body[1];
      }
      else {
        error = new Error('Did not understand the response from the server.');
      }
    }

    done(error, suggestions);
  }

  req(requestOpts, refineResponseFromSuggest);
}

module.exports = autocompl;
