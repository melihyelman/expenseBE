const express = require('express');
const fileUpload = require('express-fileupload');
const helmet = require('helmet');
const config = require("./config");
const loaders = require("./loaders");
const events = require("./scripts/events");
const path = require('path');
const cors = require('cors');
const { UserRoutes, ExpenseRoutes } = require("./routes");

config();
loaders();
events();

const app = express();
app.use("/uploads", express.static(path.join(__dirname, './uploads')));
app.use(express.json());
app.use(helmet());
app.use(cors())
app.use(fileUpload());


app.listen(process.env.PORT, () => {
    console.log("Sunucu ayağa kalktı...");
    app.use("/users", UserRoutes);
    app.use("/expenses", ExpenseRoutes);
    app.use("*", (req, res) => res.status(404).send({ message: "Not Found" }));
})
