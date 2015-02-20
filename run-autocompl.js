var autocompl = require('./autocompl');

if (process.argv.length < 3) {
  console.log('Usage: node run-autocompl.js <term to autocomplete>');
  process.exit();
}

autocompl(
  {
    partialSearchTerm: process.argv[2]
  },
  function logResults(error, suggestions) {
    if (error) {
      console.log(error);
    }
    else {
      console.log(suggestions);
    }
  }
);
