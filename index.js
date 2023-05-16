import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import cors from 'cors';

import {
  registerValidation,
  loginValidation,
  ticketCreateValidation,
} from "./validations.js";

import { UserController, TicketController } from "./controllers/index.js";

import { handleValidationErrors, checkAuth } from "./utils/index.js";

mongoose
  .connect(
    "mongodb+srv://admin:2133@cluster0.iu70yja.mongodb.net/workbench?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB error", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

//user api
app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/upload", checkAuth, upload.single("attachment"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.filename}`,
  });
});

//ticket api
app.get("/tickets", checkAuth, TicketController.getAll);
app.get("/tickets/:id", checkAuth, TicketController.getOne);
app.post(
  "/tickets",
  checkAuth,
  ticketCreateValidation,
  handleValidationErrors,
  TicketController.create
);
app.delete("/tickets/:id", checkAuth, TicketController.remove);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
