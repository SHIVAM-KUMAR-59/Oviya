import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { requestLogger } from './middleware/logger.middleware';
import logger from './config/logger.config';
import env from './config/env.config';
import apiRoutes from './routes/api.route';
import errorHandlerMiddleware from './middleware/error.middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.config';
import './config/redis.config';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api/v1', apiRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandlerMiddleware);

app.listen(env.PORT, () => {
  logger.debug(`Server running on port ${env.PORT}`);
});
