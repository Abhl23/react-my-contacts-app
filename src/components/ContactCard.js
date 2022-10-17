import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faArrowUpRightFromSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

// import { deleteContact } from "../api";
import { useContacts } from "../hooks";
import styles from "../styles/contactcard.module.css";

function ContactCard({ contact }) {
  const contacts = useContacts();

  const { addToast } = useToasts();

  const handleDeleteContact = async () => {
    // handles api call for deleting a contact
    // await deleteContact(contact.id);      api call is extremely slow

    contacts.deleteContactFromState(contact.id);

    addToast("Contact Deleted!", {
      appearance: "success",
    });
  };

  return (
    <div className={styles.contactCard}>
      <FontAwesomeIcon className={styles.userAvatar} icon={faCircleUser} />
      <div className={styles.userInfo}>
        <p>{contact.name}</p>
        <p>{contact.phone}</p>
      </div>
      <div className={styles.contactActions}>
        <Link to={`/contact-info/${contact.id}`} state={{contact}}>     {/* passing the current contact as a prop to ContactInfo page */}
          <FontAwesomeIcon className={styles.viewBtn} icon={faArrowUpRightFromSquare} />
        </Link>
        <FontAwesomeIcon className={styles.deleteBtn} onClick={handleDeleteContact} icon={faTrash} />
      </div>
    </div>
  );
}

export default ContactCard;
