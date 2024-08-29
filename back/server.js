import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/router.js";
import helmet from "helmet";

dotenv.config();

const app = express();

const mongUrl = process.env.DB_URL;

const corsOptions = {
  origin: process.env.APP_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};

mongoose
  .connect(mongUrl)
  .then(() => {
    console.log("Connexion à la base de donnée réussie");
  })
  .catch((err) => {
    console.log("Connexion à la base de donnée échoué" + err);
    process.exit();
  });

app.use(express.json());

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "img-src": ["'self'", "data:", "blob:"],
        "default-src": ["'self'"],
        "script-src": ["'self'", "'unsafe-inline'"],
      },
    },
    crossOriginResourcePolicy: { policy: "same-site" },
    referrerPolicy: { policy: "no-referrer" },
  })
);

app.use(cors(corsOptions.origin));

app.use(router);
app.use("/uploads", express.static("uploads"));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Une erreur est survenue");
});

app.listen(process.env.API_PORT, () => {
  console.log("server up");
});
