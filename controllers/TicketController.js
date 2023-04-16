import TicketModel from "../models/ticket.js";

export const getAll = async (req, res) => {
  try {
    const tickets = await TicketModel.find().populate("user").exec();
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({
      message: "Не удалось получить тикеты",
      error: err.message,
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const ticketId = req.params.id;

    TicketModel.findOne({ _id: ticketId }).then((doc, err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Не удалось получить тикет",
        });
      }
      if (!doc) {
        return res.status(404).json({
          message: "Тикет не найден",
        });
      }
      res.status(200).json(doc);
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить тикеты",
      error: err.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const ticketId = req.params.id;

    TicketModel.findOneAndDelete({ _id: ticketId }).then((doc, err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Не удалось удалить тикет",
        });
      }
      if (!doc) {
        return res.status(404).json({
          message: "Тикет не найден",
        });
      }
      res.json({
        success: true,
        message: "Тикет успешно удален",
      });
    });


  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить тикеты",
      error: err.message,
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new TicketModel({
      title: req.body.title,
      description: req.body.description,
      attachmentUrl: req.body.attachmentUrl,
      user: req.userId,
    });

    const ticket = await doc.save();

    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({
      message: "Не удалось создать тикет",
      error: err.message,
    });
  }
};
