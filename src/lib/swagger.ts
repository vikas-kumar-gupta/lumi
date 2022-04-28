import { CONFIG } from '../constants'
import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerFunc = () => {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Lumi Date',
        version: '1.0.0',
        description: 'Lumi, a dating application where one can find our matching and date him/her'
      },
      servers: [
        {
          url: `http://${CONFIG.HOST}:${CONFIG.PORT}`
        }
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "apiKey",
            name: "authorization",
            scheme: "bearer",
            in: "header",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ['./src/app.ts', './src/routes/v1/*.ts', './src/routes/v1/*/*.ts']
  }

  const swaggerSpecs = swaggerJSDoc(options)

  return swaggerSpecs
}