const express = require("express");
const app = express();
const queryProductRouter = require("./routes/product/queryProductRouter");
const commandProductRouter = require("./routes/product/commandProductRouter");
const queryCategoryRouter = require("./routes/category/queryCategoryRouter");
const commandCategoryRouter = require("./routes/category/commandCategoryRouter");
const authRouter = require("./routes/authRouter");
const bodyParser = require("body-parser");
const verifyToken = require("./middleware/verifyToken");

const connection = require("./database/dbConnection");

const port = 3000;
const hostname = "127.0.0.1";

app.use(bodyParser.json());
app.use("/auth", authRouter);
app.use("/categories", queryCategoryRouter);
app.use("/categories", verifyToken, commandCategoryRouter);
app.use("/products", queryProductRouter);
app.use("/products", verifyToken, commandProductRouter);

app.listen(port, function() {
    console.log(`Server running at http://${hostname}:${port}/`);
});