// 3576
import { Router } from 'express';
import amazon from './routes/amazon.js';

const apiRouterV1 = Router();

apiRouterV1.use("/amazon", amazon)

apiRouterV1.get('/', (req, res) => {
    res.send('Nodejs /api/v1 backend is running')
})

export default apiRouterV1
