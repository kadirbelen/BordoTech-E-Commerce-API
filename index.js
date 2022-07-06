const express = require("express");
const app = express();
const productRouter = require("./routes/productRouter");
const categoryRouter = require("./routes/categoryRouter");
const bodyParser = require("body-parser");

const connection = require("./database/dbConnection");

const port = 3000;
const hostname = "127.0.0.1";

app.use(bodyParser.json());
app.use("/categories", categoryRouter); //middleware
app.use("/products", productRouter);

app.listen(port, function() {
    console.log(`Server running at http://${hostname}:${port}/`);
});