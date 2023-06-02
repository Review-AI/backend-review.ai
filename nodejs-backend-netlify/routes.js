// 3576
import { Router } from 'express';
import amazon from './routes/amazon.js';

const apiRouterV1 = Router();

apiRouterV1.use("/amazon", amazon)

export default apiRouterV1
