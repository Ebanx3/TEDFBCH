import { ConnectToDDBB } from './services/ddbb';
import server from './services/server';
import os from 'os';
import cluster from 'cluster';

const numCPUs = os.cpus().length;

const init = (port) => {
  try {
    server.listen(port, () => {});
    ConnectToDDBB();
    console.log('Connected to database and server Up, listening at port ',port ,process.pid);
  }
  catch (err) {
    // console.log(err)
  }
}

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    // console.log('numero de CPUs :', numCPUs);
    cluster.fork();
  }
  cluster.on('exit', (worker, code) => {
    // console.log(`Worker died: ${worker.process.pid} ... with code ${code} at ${Date()}`);
    cluster.fork();
  })
}

else {
  init(process.env.PORT || 8080);
};