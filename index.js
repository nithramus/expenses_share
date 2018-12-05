const app = require('./expenses_share');
const cluster = require('cluster');
const http = require('http');
const os = require('os');

if (process.env.STATUS == 'dev') {
  app.listen(process.env.PORT || 3001);
}

else if (cluster.isMaster) {

  // Keep track of http requests
  let numReqs = 0;
//   setInterval(() => {
//     console.log(`numReqs = ${numReqs}`);
//   }, 1000);

  // Count requests
  function messageHandler(msg) {
    if (msg.cmd && msg.cmd === 'notifyRequest') {
      numReqs += 1;
    }
  }

  // Start workers and listen for messages containing notifyRequest
  const numCPUs = os.cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  for (const id in cluster.workers) {
    cluster.workers[id].on('message', messageHandler);
  }

} else {

  // Worker processes have a http server.
//   http.Server((req, res) => {
//     res.writeHead(200);
//     res.end('hello world\n');

//     // notify master about the request
//     process.send({ cmd: 'notifyRequest' });
//   }).listen(8000);
  app.listen(process.env.PORT || 3001);
    // process.send({ cmd: 'notifyRequest' });

}
