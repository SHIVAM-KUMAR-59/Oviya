import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API',
      version: '1.0.0',
      description: 'API documentation for startup backend',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    servers: [
      {
        url: 'http://localhost:8000/api/v1',
      },
    ],
  },
  apis: ['./routes/*.ts', './dto/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
