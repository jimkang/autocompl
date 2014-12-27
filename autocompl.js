var request = require('request');

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
    },
    json: true
  };

  function refineResponseFromSuggest(error, response, body) {
    var suggestions = [];

    if (!error) {
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
