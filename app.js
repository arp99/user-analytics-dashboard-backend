const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { normalizePort } = require("./helpers");
const { isAuthenticated } = require("./middlewares/authentication");
const errorHandler = require("./middlewares/errorHandler");
const routeNotFoundHandler = require("./middlewares/routeNotFoundHandler");
const authRoute = require("./routes/auth.router");
const analyticsRoute = require("./routes/analytics.router");
const config = require("./config")
const connectToDatabase = require("./db/db.connect")

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send();
});

app.use("/v1/auth", authRoute);
app.use("/v1/analytics", analyticsRoute);

app.use(routeNotFoundHandler);
app.use(errorHandler);

const PORT = normalizePort(config.PORT || "3001");

app.listen(PORT, async () => {
    console.log(`Server connected to port: ${PORT}`)

    await connectToDatabase()
})

