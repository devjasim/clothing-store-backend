import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser'
import mongoose from "mongoose";

import userRoutes from './routes/auth/users.js';
import swaggerDocs from "./swagger.js";
import router from "./routes/index.js";

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

const CONNECTION_URL = "mongodb+srv://Timon0305:stablespay@stablespay.prrea.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const PORT = process.env.PORT || 3001;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }).then(() => app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    swaggerDocs(app, PORT)
  })).catch((error) => console.log(error.message));

app.use("/user", userRoutes);

app.get("/users", (req, res) => {
  res.send("Register")
})

