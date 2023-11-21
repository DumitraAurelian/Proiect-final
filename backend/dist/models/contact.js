"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addContact = void 0;
const db_1 = require("../db");
// create contact message
const addContact = (contact, callback) => {
    const queryString = "INSERT INTO contacts (nume, email, telefon, mesaj) VALUES (?, ?, ?, ?)";
    try {
        let sqldeb = db_1.db.query(queryString, [contact.nume, contact.email, contact.telefon, contact.mesaj], (err, result) => {
            if (err) {
                callback(err);
            }
            if (result !== undefined) {
                const insertId = result.insertId;
                callback(null, insertId);
            }
            else {
                callback(null, 0);
            }
        });
        console.log(sqldeb.sql);
    }
    catch (error) {
        callback(error);
    }
};
exports.addContact = addContact;
