import TicketModel from "../models/ticket.js";

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
        message: 'Не удалось создать тикет',
        error: err.message,
    });
  }
};
