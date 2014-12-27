autocompl
==================

This module gets you Google Search autocomplete suggestions for given strings. It's a wrapper around calls to [suggestqueries.google.com](http://suggestqueries.google.com/complete/search?q=google%20autocomplete&client=toolbar) as documented in [Sheryas Chand's blog post](http://shreyaschand.com/blog/2013/01/03/google-autocomplete-api/).

(The joke in the module name is derived from [incompl's username](http://incompl.com/).)

Installation
------------

    npm install autocompl

Usage
-----

    var autocompl = require('../autocompl');
    autocompl('Batman and', function done(error, suggestions) {
      console.log(suggestions);
    });

Output:

    [ 
      'batman and robin',
      'batman and robin costumes',
      'batman and catwoman',
      'batman and superman',
      'batman and wonder woman',
      'batman and robin quotes',
      'batman and son',
      'batman and robin 35',
      'batman and robin poison ivy',
      'batman and superman team up'
    ]

It will also take a opts object as the first paramter that lets you specify:

- `partialSearchTerm`: The search string you want autocompleted.
- `request`: A function that has the same signature as [request](https://github.com/request/request), in case you want to have another module handle http.

Tests
-----

Run tests with `make test`.

License
-------

MIT.
