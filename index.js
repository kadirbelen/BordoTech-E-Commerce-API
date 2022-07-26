const express = require("express");
const app = express();
const queryProductRouter = require("./routes/product/queryProductRouter");
const commandProductRouter = require("./routes/product/commandProductRouter");
const queryCategoryRouter = require("./routes/category/queryCategoryRouter");
const commandCategoryRouter = require("./routes/category/commandCategoryRouter");
const authRouter = require("./routes/user/authRouter");
const cardRouter = require("./routes/card/cardRouter");
const queryOrderRouter = require("./routes/order/queryOrderRouter");
const commandOrderRouter = require("./routes/order/commandOrderRouter");
const adminDashboardRouter = require("./routes/admin/userRouter");
const bodyParser = require("body-parser");
const authToken = require("./middleware/authToken");
const connection = require("./database/dbConnection");
const router = require("./routes/user/authRouter");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
var cors = require("cors");

const port = 3000;
const hostname = "127.0.0.1";

app.use(cors());

app.use(bodyParser.json());
app.use("/auth", authRouter);
app.use("/categories", queryCategoryRouter);
app.use(
    "/categories",
    authToken.verifyAndAuthorizationToken(["admin"]),
    commandCategoryRouter
);
app.use("/products", queryProductRouter);
app.use(
    "/products",
    authToken.verifyAndAuthorizationToken(["admin"]),
    commandProductRouter
);

app.use(
    "/admin/users",
    authToken.verifyAndAuthorizationToken(["admin"]),
    adminDashboardRouter
);

app.use("/card", authToken.verifyToken, cardRouter);
app.use("/orders", authToken.verifyToken, queryOrderRouter);
app.use("/orders", authToken.verifyToken, commandOrderRouter);

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, function() {
    console.log(`Server running at http://${hostname}:${port}/`);
    console.log(`Server running at http://${hostname}:${port}/doc`);
});