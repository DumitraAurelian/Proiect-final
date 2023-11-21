import React, { useState, useContext } from "react";
import { BsPerson } from "react-icons/bs";
import "./login.css";

import { useNavigate, Link } from "react-router-dom";

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button } from "react-bootstrap";
import { AuthContext } from "../../context/authContext";

export default function Login() {
  let navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Adresa de email nu exista!")
      .required("Camp obligatoriu!"),
    parola: Yup.string()
      .required("Camp obligatoriu!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        " Parola trebuie sa contina minim 8 caractere din care 1 cu majuscule, 1 cu litera mica, 1 numar si un caracter special"
      ),
  });

  const [formData, setFormData] = useState({
    email: "",
    parola: "",
  });
  const [err, setError] = useState(null);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    try {
      await login(formData); // await axios.post("/users/login", inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <section className="ftco-section login">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-5">
            <h2 className="heading-section loginTitle">Login</h2>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="login-wrap p-3 bg-login">
              <div className="icon d-flex align-items-center justify-content-center mt-2">
                <BsPerson color="white" />
              </div>
              {err && <p>{err}</p>}
              <Formik
                initialValues={formData}
                onSubmit={handleSubmit}
                enableReinitialize
                validationSchema={validationSchema}
              >
                <Form className="loginForm">
                  <FormGroup>
                    <label htmlFor="email" className="mb-2 ">
                      Adresa de email
                    </label>
                    <Field
                      name="email"
                      type="text"
                      className="form-control rounded-left loginInput"
                      onChange={handleInputChange}
                      placeholder="Introdu adresa de email"

                    />
                    <ErrorMessage
                      name="email"
                      className="d-block invalid-feedback"
                      component="span"
                    />
                  </FormGroup>

                  <FormGroup className="mt-3">
                    <label htmlFor="parola" className="mb-2 ">
                      Parola
                    </label>
                    <Field
                      name="parola"
                      type="password"
                      autoComplete="off"
                      className="form-control rounded-left loginInput"
                      onChange={handleInputChange}
                      placeholder="Introdu parola"

                    />

                    <ErrorMessage
                      name="parola"
                      className="d-block invalid-feedback"
                      component="span"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Button
                      variant="primary"
                      size="md"
                      className=" loginButton btn btn-primary rounded submit px-3 mt-3 shadow-lg border-0"
                      block="block"
                      type="submit"
                    >
                      Login
                    </Button>
                  </FormGroup>
                  <FormGroup>
                    <div className="w-100 text-md-left py-3">
                      <Link to="/myregister" className="nav-link login">
                        Daca nu ai cont: Register
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
