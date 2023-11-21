import React, { useEffect, useState } from "react";
import axios from "axios";
import configData from "../config.json";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { Button, Modal } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import EditUser from "../components/EditUser";

export default function UserList() {
  const [userList, setUserList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [activeUser, setActiveUser] = useState({});
  const [message, setMessage] = useState("");
  const [editUser, setEditUser] = useState(false);

  const token = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    axios
      .get(configData.SERVER_URL, {
        headers: {
          Authorization: `token ${token.accessToken}`,
        },
      })
      .then(({ data }) => {
        setUserList(data["data"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token.accessToken]);

  const handleModalOpen = (type, user) => {
    type === "edit" ? setModalAction("edit") : setModalAction("delete");
    setShowModal(true);
    setActiveUser(user);
  };

  const handleDelete = async ({ id }) => {
    try {
      await axios.delete(`${configData.SERVER_MAIN_URL}users/${id}`, {
        headers: {
          Authorization: `token ${token.accessToken}`,
        },
      });
      setShowModal(false);
      setMessage("Utilizatorul a fost sters!");
      const newUserList = userList.filter((user) => user.id !== id);
      setUserList(newUserList);
    } catch (err) {
      setMessage("Utilizatorul nu a fost sters!");
    }
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      {console.log(typeof userList[0]?.id)}
      {userList.length === 0 ? (
        <h3 className="text-center text-danger my-5">Nu exista utilizatori!</h3>
      ) : (
        <h1 className="text-center my-5 title-heading"> Vezi utilizatori</h1>
      )}

      <Accordion
        defaultActiveKey={userList[0]?.id}
        className="container my-5"
        alwaysOpen
      >
        {userList.map((user, index) => {
          return (
            <Accordion.Item eventKey={user?.id}>
              <Accordion.Header>
                {index + 1}. {user.prenume} {user.nume}
              </Accordion.Header>
              <Accordion.Body>
                <div className="accordion-body">
                  <EditUser
                    user={user}
                    editUser={editUser}
                    setEditUser={setEditUser}
                  />
                  <Button
                    variant="danger"
                    size="lg"
                    className=" btn btn-primary rounded submit p-3 px-5 my-3"
                    block="block"
                    type="button"
                    onClick={() => setEditUser(true)}
                  >
                    <BiEdit color="white" /> Editeaza
                  </Button>
                  <Button
                    variant="danger"
                    size="lg"
                    className=" btn btn-danger rounded submit p-3 px-5 my-3 mx-3"
                    block="block"
                    type="button"
                    onClick={() => handleModalOpen("delete", user)}
                  >
                    <AiOutlineDelete color="white" /> Sterge
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {modalAction === "edit" ? <>Editare</> : <>Stergere</>}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {modalAction === "edit" ? (
              <p>Editare</p>
            ) : (
              <p>
                Sunteti sigur ca doriti sa stergeti utilizatorul cu numele{" "}
                {activeUser.prenume} {activeUser.nume}?
              </p>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Renunta
            </Button>
            <Button variant="primary" onClick={() => handleDelete(activeUser)}>
              Continua
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
