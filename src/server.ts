
import express from 'express';
import cors from 'cors';
import { connect } from "./database/database";
import 'dotenv/config'
import {routes} from './routes/routesOrder';

  const app = express();
  const PORT = process.env.PORT_LOCAL_HOST;
  app.use(express.json());
  connect();
  
  app.use(cors())
  app.use(routes);
  
  app.listen(PORT, () => {
    console.log(` Server is running at port: ${PORT}`);
  });
