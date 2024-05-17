const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

const { configureDB } = require("./config/mongoose.config");
configureDB();

const { dateRouter } = require("./router/date.router");
app.use("/api/date/", dateRouter);

const { petRouter } = require("./router/pet.router");
app.use("/api/pet/", petRouter);

const { serviceRouter } = require("./router/service.router");
app.use("/api/service/", serviceRouter);

const { dateServiceRouter } = require("./router/dateService.router.js");
app.use("/api/dateService/", dateServiceRouter);

const verifyToken = require("./middlewares/verifyToken"); 
const controllers = require("./controllers");

app.get("/user", verifyToken, controllers.getUserById);
app.post("/register", controllers.register);
app.post("/login", controllers.login);

app.listen(5000, () => {
  console.log("Éxito: Se escucha desde el puerto 5000");
});
