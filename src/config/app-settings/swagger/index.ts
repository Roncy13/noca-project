import swaggerUi  from 'swagger-ui-express';
import swaggerDocument from './swagger';

export default function SwaggerFn(app: any) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}