import { OpenApiGeneratorV3, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

export const registry = new OpenAPIRegistry();

registry.registerComponent('securitySchemes', 'bearerAuth', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
});

export function generateOpenApiDocumentation() {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  const productionUrl = process.env.RENDER_EXTERNAL_URL || '';

  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      title: 'SEN371 E-Commerce API',
      version: '1.0.0',
      description: 'Automated API documentation powered by Zod schemas and OpenAPI',
    },
    servers: [
      {
        url: productionUrl,
        description: 'Production Server (Render)',
      },
      {
        url: 'http://localhost:5001',
        description: 'Local Development Server',
      },
    ],
  });
}