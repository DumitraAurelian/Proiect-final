import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button } from "react-bootstrap";
import axios from "axios";
import configData from "../config.json";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const POSITION = {
  center: {
    lat: 44.439663,
    lng: 26.096306,
  },
  zoom: 11,
};

const Contact = () => {
  const [formData, setFormData] = useState({
    nume: "",
    email: "",
    telefon: "",
    mesaj: "",
  });
  const [submitMessage, setSubmitMessage] = useState("");
  const [err, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      await axios.post(configData.SERVER_MAIN_URL + "contact", formData);
    } catch (err) {
      setError("Mesajul tau NU a fost trimis!");
    }
    setSubmitMessage("Mesajul tau a fost trimis!");
    setFormData({
      nume: "",
      email: "",
      telefon: "",
      mesaj: "",
    });
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object().shape({
    nume: Yup.string().required("Camp obligatoriu!"),
    email: Yup.string().max(40).min(1).required("Camp obligatoriu!"),
    telefon: Yup.string()
      .required("Camp obligatoriu!")
      .matches(phoneRegExp, "Numarul de telefon nu este valid!"),
    mesaj: Yup.string().required("Camp obligatoriu!"),
  });
  return (
    <div className="container p-5">
      <h1 className="text-center my-5 title-heading">Contact</h1>

      <div className="d-flex justify-content-between">
        <div className="d-flex flex-column justify-content-around border shadow-lg rounded p-3">
          <h5>
            <span className="fw-bold">Adresa:</span> Strada Stelian Mihale, nr 15, sector 3, Bucuresti
          </h5>
          <h5>
            <span className="fw-bold">Numar de telefon:</span> 0762262773
          </h5>
          <h5>
            <span className="fw-bold">
              Contact general:{" "}
            </span>{" "}
            contact@jurnalpersonal.ro
          </h5>
          <h5>
            <span className="fw-bold">
              Probleme tehnice:
            </span>{" "}
            admin@jurnalpersonal.ro
          </h5>
          <h5>
            <span className="fw-bold">
              Protecția datelor cu caracter personal:
            </span>{" "}
            privacy@jurnalpersonal.ro
          </h5>
        </div>
        <div style={{ height: "60vh", width: "50%" }}>
          
        </div>
      </div>
      <div className="d-flex flex-column justify-content-around border shadow-lg rounded p-3 mt-5">
        <h4 className="text-center my-5">Formular de contact</h4>
        <Formik
          initialValues={formData}
          onSubmit={handleSubmit}
          enableReinitialize
          validationSchema={validationSchema}
        >
          <Form>
            <FormGroup className="mt-3">
              <label htmlFor="nume" className="mb-2">
                Nume
              </label>
              <Field
                name="nume"
                type="text"
                className="form-control rounded-left"
                onChange={handleInputChange}
              />

              <ErrorMessage
                name="nume"
                className="d-block invalid-feedback"
                component="span"
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="email" className="mb-2">
                Email
              </label>
              <Field
                name="email"
                type="email"
                className="form-control rounded-left"
                onChange={handleInputChange}
              />
              <ErrorMessage
                name="email"
                className="d-block invalid-feedback"
                component="span"
              />
            </FormGroup>

            <FormGroup className="mt-3">
              <label htmlFor="telefon" className="mb-2">
                Telefon
              </label>
              <Field
                name="telefon"
                type="text"
                autoComplete="off"
                className="form-control rounded-left"
                onChange={handleInputChange}
              />

              <ErrorMessage
                name="telefon"
                className="d-block invalid-feedback"
                component="span"
              />
            </FormGroup>
            <FormGroup className="mt-3">
              <label htmlFor="mesaj" className="mb-2">
                Mesaj
              </label>
              <Field
                component="textarea"
                name="mesaj"
                className="form-control rounded-left h-100"
                autoComplete="off"
                onChange={handleInputChange}
              />

              <ErrorMessage
                name="mesaj"
                className="d-block invalid-feedback"
                component="span"
              />
            </FormGroup>

            <FormGroup>
              <Button
                variant="primary"
                size="md"
                className="btn btn-primary rounded submit px-3 mt-3 shadow-lg border-0"
                block="block"
                type="submit"
              >
                Trimite mesaj
              </Button>
            </FormGroup>
            {err ? (
              <h5 className="text-center text-danger">{err}</h5>
            ) : (
              <h5 className="text-center text-info">{submitMessage}</h5>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Contact;
