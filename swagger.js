import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import config from './config/config.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Stables Pay APIs',
      description: 'Stable backend Rest APIs',
      version: '1.0.0',
    },
    servers: [
      {
        url: `${config.REMOTE_CLIENT_APP}/api/v1/`
      }
    ]
  },
  // looks for configuration in specified directories
  apis: ['./routes/*.js', './routes/auth/*.js'],
}

const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app, port) {
  // Swagger Page
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  // Documentation in JSON format
  app.get('/api/v1/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}

export default swaggerDocs