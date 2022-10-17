import { useContext, useEffect, useState } from "react";

import { ContactsContext } from "../providers/ContactsProvider";
import { fetchUsers } from "../api";

// returns the current context value
export const useContacts = () => {
  return useContext(ContactsContext);
};

// fetches and return the context value
export const useProvideContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetches all the contacts from the api
    const getContacts = async () => {
      const response = await fetchUsers();

      setContacts(response.data);
      setLoading(false);
    };

    getContacts();
  }, []);

  // add new contacts to the global state
  const addContactToState = (contact) => {
    setContacts([contact, ...contacts]);
  };

  // updates contacts in the global state
  const updateContactInState = ({...contact}) => {
    const newContacts = contacts.map((user) => {
      if (contact.id === user.id) return contact;

      return user;
    });

    setContacts(newContacts);
  };

  // delete contacts from the global state
  const deleteContactFromState = (contactId) => {
    const newContacts = contacts.filter((contact) => contact.id !== contactId);

    setContacts(newContacts);
  };

  return {
    data: contacts,
    loading,
    addContactToState,      // functions to change the
    updateContactInState,   //  contacts state
    deleteContactFromState  //  in the global context value
  };
};

// custom hook created for taking and handling form inputs
export const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  return {
    value,
    onChange: handleChange,
  };
};
