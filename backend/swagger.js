import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API for your project',
    },
    servers: [
      {
        url: 'https://aksc-ministry.onrender.com/api',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to your API docs
};

const swaggerDocs = (app) => {
  const swaggerSpec = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default swaggerDocs;
