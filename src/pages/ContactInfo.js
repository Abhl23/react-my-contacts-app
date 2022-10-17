import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

import { useContacts } from "../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ContactInfo() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // boolean state to show or hide the update contact form
  const [editMode, setEditMode] = useState(false);

  // boolean state for disabling the update contact button
  const [updatingContact, setUpdatingContact] = useState(false);

  const contacts = useContacts();

  const navigate = useNavigate();

  const { addToast } = useToasts();

  // to acquire the contact from the state prop of Link component
  const location = useLocation();
  const { contact } = location.state;

  useEffect(() => {
    setName(contact.name);
    setPhone(contact.phone);
    setEmail(contact.email);
  }, [contact]);

  const handleUpdateContact = async () => {
    setUpdatingContact(true);

    // checks if any of the fields are empty
    if (!name || !phone || !email) {
      setUpdatingContact(false);

      return addToast("Fields cannot be left empty!", {
        appearance: "error",
      });
    }

    // api call is extremely slow
    // const response = await updateContact({ name, phone, email, id: contactId });

    // updates the contact in global state
    contacts.updateContactInState({ name, phone, email, id: contact.id });

    setUpdatingContact(false);
    setEditMode(false);

    addToast("Contact Updated Successfully!", {
      appearance: "success",
    });

    navigate("/");
  };

  return (
    <div
      className="margin-auto col-auto bg-white border rounded shadow"
      style={{ width: "20rem", padding: "2rem 1rem" }}
    >
      <div className="d-flex justify-content-center mb-5">
        <FontAwesomeIcon
          className="text-primary"
          style={{ fontSize: "5rem" }}
          icon={faCircleUser}
        />
      </div>
      <div className="text-secondary fs-5">Name</div>
      {editMode ? (
        <input
          className="col-12 mt-2 p-1"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      ) : (
        <div style={{ fontSize: "1.1rem" }}>{name}</div>
      )}

      <div className="text-secondary fs-5 mt-2">Phone</div>
      {editMode ? (
        <input
          className="col-12 mt-2 p-1"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      ) : (
        <div style={{ fontSize: "1.1rem" }}>{phone}</div>
      )}

      <div className="text-secondary fs-5 mt-2">Email</div>
      {editMode ? (
        <input
          className="col-12 mt-2 p-1"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      ) : (
        <div style={{ fontSize: "1.1rem" }}>{email}</div>
      )}

      {editMode ? (
        <div className="mt-4 d-flex flex-column">
          <button
            className="btn btn-primary mb-2"
            onClick={handleUpdateContact}
            disabled={updatingContact}
          >
            {updatingContact ? "Updating Contact..." : "Update Contact"}
          </button>
        </div>
      ) : (
        <div className="mt-4 d-flex flex-column">
          {/* toggles the editMode */}
          <button
            className="btn btn-primary mb-2"
            onClick={() => setEditMode(true)}
          >
            Edit Contact
          </button>
          {/* takes back to Home page */}
          <Link to="/">
            <button className="btn btn-outline-primary">Go Back</button>
          </Link>
        </div>
      )}
    </div>
  );
}


export default ContactInfo;
