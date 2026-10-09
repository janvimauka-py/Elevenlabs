const serverless = require('serverless-http');
const app = require('../../server/index');

const handler = serverless(app, {
  binary: ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/*']
});

module.exports.handler = async (event, context) => {
  // Normalize path so Express /api routes match reliably
  if (event.path && !event.path.startsWith('/api') && !event.path.startsWith('/.netlify')) {
    event.path = '/api' + event.path;
  }
  return await handler(event, context);
};
