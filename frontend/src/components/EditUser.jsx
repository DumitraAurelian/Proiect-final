import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, FormGroup } from "react-bootstrap";
import * as Yup from "yup";
import axios from "axios";
import configData from "../config.json";

export default function EditUser({ user, editUser, setEditUser }) {
  const [formData, setFormData] = useState({
    nume: user.nume,
    prenume: user.prenume,
    email: user.email,
    id: user.id,
  });
  const [message, setMessage] = useState("");

  const token = JSON.parse(localStorage.getItem("user"));

  const validationSchema = Yup.object().shape({
    nume: Yup.string().required("Camp obligatoriu!"),
    prenume: Yup.string().required("Camp obligatoriu!"),
    email: Yup.string()
      .email("Adresa de email invalida!")
      .required("Camp obligatoriu!"),
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    console.log(`${configData.SERVER_MAIN_URL}users/${formData.id}`, "lala");
    try {
      await axios.put(
        `${configData.SERVER_MAIN_URL}users/${formData.id}`,
        formData,
        {
          headers: {
            Authorization: `token ${token.accessToken}`,
          },
        }
      );
      setMessage("Utilizatorul a fost editat!");
      setEditUser(false);
    } catch (err) {
      setMessage("Ceva nu a mers bine!");
    }
  };

  return (
    <div>
      <Formik
        initialValues={formData}
        onSubmit={handleSubmit}
        enableReinitialize
        validationSchema={validationSchema}
      >
        <Form>
          <FormGroup>
            <label htmlFor="nume" className="mb-2">
              Nume
            </label>
            {console.log(formData.nume, "nume")}
            <Field
              name="nume"
              type="text"
              className="form-control"
              placeholder="Nume"
              disabled={!editUser}
              value={formData.nume}
              onChange={handleInputChange}
            />
            <ErrorMessage
              name="nume"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup className="mt-3">
            <label htmlFor="prenume" className="mb-2">
              Prenume
            </label>
            <Field
              name="prenume"
              type="text"
              className="form-control"
              value={formData.prenume}
              disabled={!editUser}
              onChange={handleInputChange}
            />
            <ErrorMessage
              name="prenume"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>

          <FormGroup className="mt-3">
            <label htmlFor="email" className="mb-2">
              Adresa de email
            </label>
            <Field
              name="email"
              type="text"
              value={formData.email}
              disabled={!editUser}
              className="form-control rounded-left"
              onChange={handleInputChange}
            />
            <ErrorMessage
              name="email"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          {!editUser && <div className="text-primary">{message}</div>}

          {editUser && (
            <FormGroup>
              <Button
                variant="primary"
                size="md"
                className="btn btn-primary rounded submit px-3 mt-3 shadow-lg border-0"
                block="block"
                type="submit"
              >
                Salveaza
              </Button>

              <Button
                variant="secondary"
                size="md"
                className="btn btn-secondary rounded submit px-3 mt-3 mx-3 shadow-lg border-0"
                block="block"
                type="button"
                onClick={() => setEditUser(false)}
              >
                Renunta
              </Button>
            </FormGroup>
          )}
        </Form>
      </Formik>
    </div>
  );
}
