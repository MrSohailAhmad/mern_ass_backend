import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Appointment Management API",
      version: "1.0.0",
      description: "API documentation for Appointment Management System",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
    tags: [
      {
        name: "Doctors",
        description: "Doctor management endpoints",
      },
    ],
  },
  apis: ["src/routes/*.ts"], // ✅ this is correct if run from project root
};

export const swaggerSpec = swaggerJsdoc(options);
