import React, { useState, useContext } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button } from "react-bootstrap";
import axios from "axios";
import { BsPerson } from "react-icons/bs";
import { AuthContext } from "../../context/authContext";
import configData from "../../config.json";
import "./register.css";

export default function Register() {
  let navigate = useNavigate();
  const { authenticated } = useContext(AuthContext);
  const validationSchema = Yup.object().shape({
    nume: Yup.string().required("Camp obligatoriu!"),
    prenume: Yup.string().required("Camp obligatoriu!"),
    email: Yup.string()
      .email("Adresa de email invalida!")
      .required("Camp obligatoriu!"),
    parola: Yup.string()
      .required("Camp obligatoriu!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        " Parola trebuie sa contina minim 8 caractere din care 1 cu majuscule, 1 cu litera mica, 1 numar si un caracter special"
      ),
    confirm_password: Yup.string()
      .label("Confirma parola")
      .required("Camp obligatoriu!")
      .oneOf([Yup.ref("parola"), null], "Passwords must match"),
  });
  const [formData, setFormData] = useState({
    nume: "",
    prenume: "",
    email: "",
    parola: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    delete formData.confirm_password;
    axios
      .post(configData.SERVER_URL, formData)
      .then((res) => {
        if (res.status === 200) {
          alert("User successfully created");

          navigate("/mylogin");
        } else Promise.reject();
      })
      .catch((err) => {
        alert("Something went wrong");
      });
  };
  if (authenticated) {
    // Redirect
    alert(1234);
    return <Navigate replace to="/posts" />;
  } else {
    return (
      <section className="ftco-section register">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5">
              <h2 className="heading-section">Inregistrare</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="login-wrap p-3 bg-login">
                <div className="icon d-flex align-items-center justify-content-center mt-2">
                  <BsPerson color="white" />
                </div>
                <Formik
                  initialValues={formData}
                  onSubmit={handleSubmit}
                  enableReinitialize
                  validationSchema={validationSchema}
                >
                  <Form className="registerForm">
                    <FormGroup>
                      <label htmlFor="nume" className="mb-2 ">
                        Nume
                      </label>
                      <Field
                        name="nume"
                        type="text"
                        className="form-control registerInput"
                        placeholder="Nume"
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
                        className="form-control registerInput"
                        placeholder="Prenume"
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
                        className="form-control registerInput rounded-left"
                        placeholder="Adauga o adresa de email valida"
                        onChange={handleInputChange}
                      />
                      <ErrorMessage
                        name="email"
                        className="d-block invalid-feedback"
                        component="span"
                      />
                    </FormGroup>

                    <FormGroup className="mt-3">
                      <label htmlFor="parola" className="mb-2">
                        Parola
                      </label>
                      <Field
                        name="parola"
                        type="password"
                        autoComplete="off"
                        className="form-control registerInput rounded-left"
                        placeholder="Creaza o parola"
                        onChange={handleInputChange}
                      />

                      <ErrorMessage
                        name="parola"
                        className="d-block invalid-feedback"
                        component="span"
                      />
                    </FormGroup>
                    <FormGroup className="mt-3">
                      <label htmlFor="confirm_password" className="mb-2">
                        Confirma Parola
                      </label>
                      <Field
                        name="confirm_password"
                        type="password"
                        autoComplete="off"
                        className="form-control registerInput rounded-left"
                        placeholder="Confirma parola"
                        onChange={handleInputChange}
                      />

                      <ErrorMessage
                        name="confirm_password"
                        className="d-block invalid-feedback"
                        component="span"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Button
                        variant="primary"
                        size="md"
                        className="registerButton btn btn-primary rounded submit px-3 mt-3 shadow-lg border-0"
                        block="block"
                        type="submit"
                      >
                        Inregistrare
                      </Button>
                    </FormGroup>
                    <FormGroup>
                      <div className="w-50 text-md-left py-3">
                        <Link to="/mylogin" className="nav-link login">
                          Aveti deja cont? Login
                        </Link>
                      </div>
                    </FormGroup>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
