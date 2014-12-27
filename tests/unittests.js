var test = require('tape');
var conformAsync = require('conform-async');
var autocompl = require('../autocompl');

test('Batman test', function testBatmanAnd(t) {
  t.plan(3);

  var serverResponseJSON = [
    'Batman and',
    [
      'batman and robin'
    ]
  ];

  autocompl(
    {
      partialSearchTerm: 'Batman and',
      request: function mockRequest(opts, done) {
        conformAsync.callBackOnNextTick(done, null, null, serverResponseJSON);
      }
    },
    function checkResults(error, suggestions) {
      t.notOk(error, 'There is no error for this partial search term.');
      t.ok(Array.isArray(suggestions), 'We get an array of suggestions.');
      t.equal(
        suggestions[0], 'batman and robin', 
        'The first suggestion is "batman and robin"'
      );
    }
  );
});

test('Malformed response', function testMalformedResponse(t) {
  t.plan(4);

  var serverResponseJSON = {};

  autocompl(
    {
      partialSearchTerm: 'Batman and',
      request: function mockRequest(opts, done) {
        conformAsync.callBackOnNextTick(done, null, null, serverResponseJSON);
      }
    },
    function checkResults(error, suggestions) {
      t.ok(error);
      t.equal(error.message, 'Did not understand the response from the server.');
      t.ok(Array.isArray(suggestions), 'We get an array of suggestions.');
      t.equal(suggestions.length, 0, 'There are no suggestions.');
    }
  );
});


test('Error from server', function testError(t) {
  t.plan(4);

  var serverResponseJSON = {};
  var serverError = new Error('Internal Server Error');

  autocompl(
    {
      partialSearchTerm: 'Batman and',
      request: function mockRequest(opts, done) {
        conformAsync.callBackOnNextTick(
          done, serverError, null, serverResponseJSON
        );
      }
    },
    function checkResults(error, suggestions) {
      t.ok(error);
      t.equal(error.message, serverError.message);
      t.ok(Array.isArray(suggestions), 'We get an array of suggestions.');
      t.equal(suggestions.length, 0, 'There are no suggestions.');
    }
  );
});

