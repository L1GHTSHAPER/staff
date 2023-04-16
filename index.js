//import { error } from 'console';
//import { request } from 'http';
import express from "express";

import mongoose from "mongoose";

import { registerValidation } from "./validations.js";
import { loginValidation } from "./validations.js";
import { ticketCreateValidation } from "./validations.js";

import TicketModel from "./models/ticket.js";
import checkAuth from "./utils/checkAuth.js";

import * as UserController from "./controllers/UserController.js";
import * as TicketController from "./controllers/TicketController.js";

mongoose
  .connect(
    "mongodb+srv://admin:2133@cluster0.iu70yja.mongodb.net/workbench?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB error", err));

const app = express();

app.use(express.json());

app.post("/auth/login", loginValidation, UserController.login);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

//app.get("/tickets", checkAuth, TicketController.getAll);
//app.get("/tickets/:id", checkAuth, TicketController.getOne);
app.post("/tickets", checkAuth, ticketCreateValidation, TicketController.create);
//app.delete("/tickets", checkAuth, TicketController.getMe);


//ticket api

app.post("/tickets/create", checkAuth, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const doc = new TicketModel({
      userId: req.user._id,
      username: req.body.username,
      status: req.body.status,
      title: req.body.title,
      description: req.body.description,
      attachment: req.body.attachment,
    });

    const ticket = await doc.save();

    const { _id, ...docData } = ticket._doc;
    res.json({
      _id,
      ...docData,
    });
  } catch (err) {
    res.status(500).json({
      message: "Не удалось создать тикет",
      error: err.message,
    });
  }
});

//app.get("/tickets/all", checkAuth, (req, res) => {});

app.get("/tickets/all", async (req, res) => {
  try {
    const tickets = await ticketModel.find({ userId: req.user._id });
    res.json({
      tickets,
    });
  } catch (err) {
    res.status(500).json({
      message: "Не удалось получить тикеты",
    });
  }
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
