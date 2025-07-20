import swaggerUi from "swagger-ui-express";
import SwaggerParser from "@apidevtools/swagger-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Loads and bundles the Swagger/OpenAPI document from YAML file.
 * Uses SwaggerParser.bundle to resolve all references and dependencies.
 *
 * @async
 * @function loadSwaggerDocument
 * @returns {Promise<Object>} The parsed and bundled Swagger document object.
 * @throws Throws an error if loading or parsing fails.
 */
async function loadSwaggerDocument() {
  try {
    const filePath = path.join(__dirname, "../docs/swagger.yaml");
    return await SwaggerParser.bundle(filePath, {
      resolve: {
        // Custom resolve options can be added here if needed
      },
    });
  } catch (error) {
    console.error("Failed to load Swagger document:", error);
    throw new Error("API documentation loading failed");
  }
}

/**
 * Swagger UI configuration options.
 */
const swaggerOptions = {
  explorer: true, // Enables the search bar
  customSiteTitle: "API Documentation", // Sets the browser tab title
  customCss: ".swagger-ui .topbar { display: none }", // Hides the top bar for cleaner UI
  swaggerOptions: {
    docExpansion: "none", // Collapse the endpoints by default
    filter: true, // Enables filtering endpoints
    persistAuthorization: true, // Keeps auth token between page reloads
  },
};

/**
 * Sets up the Swagger API documentation route in the Express app.
 * Loads the Swagger document and mounts the Swagger UI at `/api-docs`.
 * Handles errors by returning a 500 error page if docs cannot be loaded.
 *
 * @async
 * @function swaggerDocs
 * @param {import('express').Express} app - The Express application instance.
 */
async function swaggerDocs(app) {
  try {
    const swaggerDocument = await loadSwaggerDocument();
    app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument, swaggerOptions)
    );
    console.log("Swagger docs available at /api-docs");
  } catch (error) {
    console.error("Failed to setup Swagger:", error);
    app.use("/api-docs", (req, res) => {
      res.status(500).send("API documentation unavailable");
    });
  }
}

export default swaggerDocs;
