var test = require('tape');
var autocompl = require('../autocompl');

test('Live Batman test', function testBatmanAnd(t) {
  t.plan(3);

  autocompl(
    {
      partialSearchTerm: 'Batman and'
    },
    function checkResults(error, suggestions) {
      console.log(suggestions);
      t.notOk(error, 'There is no error for this partial search term.');
      t.ok(Array.isArray(suggestions), 'We get an array of suggestions.');
      t.equal(
        suggestions[0], 'batman and robin', 
        'The first suggestion is "batman and robin"'
      );
    }
  );
});

test('Abbreviated param test', function testAbbrev(t) {
  t.plan(3);

  autocompl(
    'Batman and',
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

test('Live no results test', function testBatmanAnd(t) {
  t.plan(3);

  autocompl(
    {
      partialSearchTerm: 'efbhymj'
    },
    function checkResults(error, suggestions) {
      t.notOk(error, 'There is no error for this partial search term.');
      t.ok(Array.isArray(suggestions), 'We get an array.');
      t.equal(suggestions.length, 0, 'There are no suggestions.');
    }
  );
});
