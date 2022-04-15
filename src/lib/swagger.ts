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
            // basePath: '/v1',
            servers: [
                {
                    url: `http://localhost:${CONFIG.PORT}`
                }
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: "http",
                        name: "x-auth-token",
                        scheme: "bearer",
                        in: "header",
                    },
                },
            },
        },
        apis: ['./src/app.ts', './src/routes/v1/*.ts', './src/routes/v1/*/*.ts']
    }

    const swaggerSpecs = swaggerJSDoc(options)

    return swaggerSpecs
}