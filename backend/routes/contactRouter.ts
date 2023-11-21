import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import { check, validationResult } from "express-validator";
import * as contactModel from "../models/contact";
import { Contact } from "../types/Contact";

const contactRouter = express.Router();
const jsonParser = bodyParser.json();

contactRouter.post(
  "/",
  jsonParser,
  [
    check("nume", "Nume is required").not().isEmpty(),
    check("email", "Please include a valid email")
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: true }),
    check("telefon", "Telefon is required").not().isEmpty(),
    check("mesaj", "Mesaj is required").not().isEmpty(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const newContact: Contact = req.body;
    contactModel.addContact(newContact, (err: Error) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      return res
        .status(200)
        .json({ message: "Mesajul a fost transmis cu succes!" });
    });
  }
);
export { contactRouter };
