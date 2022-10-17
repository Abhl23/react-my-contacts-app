import { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

import { createContact } from "../api";
import { useContacts } from "../hooks";

function CreateContact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // boolean state to show and hide the create contact form
  const [createMode, setCreateMode] = useState(false);

  // boolean state for disabling the create contact button
  const [creatingContact, setCreatingContact] = useState(false);

  const contacts = useContacts();
  const { addToast } = useToasts();

  // clears the create contact form
  const clearForm = () => {
    setName("");
    setPhone("");
    setEmail("");
  };

  // handles creating a new contact
  const handleCreateContact = async () => {
    setCreatingContact(true);

    // checks if any of the fields are empty
    if (!name || !phone || !email) {
      setCreatingContact(false);

      return addToast("Fields cannot be left empty!", {
        appearance: "error",
      });
    }

    // api call to create a contact
    const response = await createContact({ name, phone, email });

    // adds the new contact to the global state
    contacts.addContactToState(response.data);

    addToast("New Contact Added!", {
      appearance: "success",
    });

    clearForm();
    setCreatingContact(false);
    setCreateMode(false);
  };

  return (
    <div>
      {createMode ? (
        <>
          <div className="row flex-column" style={{ margin: 0 }}>
            <input
              style={styles.inputField}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
            />
            <input
              style={styles.inputField}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Phone"
            />
            <input
              style={styles.inputField}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
            />
            <button
              className="btn btn-primary"
              style={{ width: "25rem", marginTop: 10 }}
              onClick={handleCreateContact}
              disabled={creatingContact}
            >
              {creatingContact ? "Creating Contact..." : "Create Contact"}
            </button>
            {/* hides the create contact form */}
            <button
              className="btn btn-outline-primary"
              style={{ width: "25rem", marginTop: 15 }}
              onClick={() => setCreateMode(false)}
              disabled={creatingContact}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        // displays the create contact form
        <button
          className="btn btn-primary"
          style={{ width: "25rem" }}
          onClick={() => setCreateMode(true)}
        >
          <span style={{ marginRight: "1rem", fontSize: "1.3rem" }}>
            <FontAwesomeIcon icon={faCirclePlus} />
          </span>
          <span style={{fontSize: "1.3rem", fontWeight: "bold"}}>Add Contact</span>
        </button>
      )}
    </div>
  );
}

const styles = {
  inputField: {
    height: "2.5rem",
    margin: "10px 0",
  },
};

export default CreateContact;
