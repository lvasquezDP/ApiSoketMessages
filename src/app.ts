import { createServer } from 'http';
import { envs } from './config/envs';
import { MongoDatabase } from './data';
import { AppRoutes } from './server/routes';
import { Server } from './server/server';
import { WssService } from './server/services/wss.service';

(async()=> {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    dbName:envs.MONGO_DB_NAME, 
    mongoUrl:envs.MONGO_URL,
  });
  const server = new Server({
    port: envs.PORT,
    // routes: AppRoutes.routes,
  });
  const httpServer=createServer(server.app);

  WssService.initWss({server:httpServer});

  server.setRoutes(AppRoutes.routes);

  httpServer.listen(envs.PORT,'0.0.0.0',()=>{
    console.log(`Server running on port ${ envs.PORT }`);
  })

  WssService.instance.start();
  // server.start();
}