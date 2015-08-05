var loggly = require('loggly');

function logger(tag) {
  return loggly.createClient({
    token: 'process.env.LOGGLY_TOKEN',
    subdomain: 'logandougher',
    tags: ['NodeJS', tag],
    json: true
  });
}

module.exports = logger;
