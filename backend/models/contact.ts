import { Contact } from "../types/Contact";
import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

// create contact message
export const addContact = (contact: Contact, callback: Function) => {
  const queryString =
    "INSERT INTO contacts (nume, email, telefon, mesaj) VALUES (?, ?, ?, ?)";

  try {
    let sqldeb = db.query(
      queryString,
      [contact.nume, contact.email, contact.telefon, contact.mesaj],
      (err, result) => {
        if (err) {
          callback(err);
        }

        if (<OkPacket>result !== undefined) {
          const insertId = (<OkPacket>result).insertId;
          callback(null, insertId);
        } else {
          callback(null, 0);
        }
      }
    );
    console.log(sqldeb.sql);
  } catch (error) {
    callback(error);
  }
};
