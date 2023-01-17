import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser'
import mongoose from "mongoose";

import userRoutes from './routes/users.routes.js';
import adminRoutes from './routes/admin.routes.js';
import adminProductRoutes from './routes/admin.product.routes.js';
import productRoutes from './routes/product.routes.js';
import swaggerDocs from "./swagger.js";
import config from "./config/config.js";

const app = express();

app.use(bodyParser.json({limit: "100mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "100mb", extended: true}));
app.use(cors({
  origin: "*",
}));

const CONNECTION_URL = config.DATABASE_URL;
const PORT = process.env.PORT || 3001;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }).then(() => app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    swaggerDocs(app, PORT)
  })).catch((error) => console.log(error.message));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/admin", adminProductRoutes);
app.use("/api/v1/user", productRoutes);


