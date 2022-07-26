const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./index.js"];

swaggerAutogen(outputFile, endpointsFiles);

// const swaggerJsdoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");

// const options = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: "E-Commerce-API",
//             description: "Example of CRUD API ",
//             version: "1.0.0",
//         },
//         // servers: [
//         //     url: "http://localhost:3000"
//         // ]
//     },
//     apis: ["./routes/admin/userRouter.js"],
// };

// const swaggerSpec = swaggerJsdoc(options);

// function swaggerDocs(app, port) {
//     // Swagger Page
//     app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//     // Docs in JSON format
//     // app.get("/docs.json", (req, res) => {
//     //     res.setHeader("Content-Type", "application/json");
//     //     res.send(swaggerSpec);
//     // });
//     console.info(`Docs available at http://localhost:${port}/docs`);
// }

// module.exports = swaggerDocs;