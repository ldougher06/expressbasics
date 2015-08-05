var loggly = require('loggly');

function logger(tag) {
  return loggly.createClient({
    token: 'ca767f7a-57d3-4596-bf1d-3bbb92e4645c',
    subdomain: 'g8167010',
    tags: ['NodeJS', tag],
    json: true
  });
}

module.exports = logger;
