import { useContext, useEffect, useState } from "react";

import { ContactsContext } from "../providers/ContactsProvider";
import { fetchUsers } from "../api";

export const useContacts = () => {
  return useContext(ContactsContext);
};

export const useProvideContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getContacts = async () => {
      const response = await fetchUsers();

      setContacts(response.data);
      setLoading(false);
    };

    getContacts();
  }, []);

  const addContactToState = (contact) => {
    setContacts([contact, ...contacts]);
  };

  const updateContactInState = ({...contact}) => {
    const newContacts = contacts.map((user) => {
      if (contact.id === user.id) return contact;

      return user;
    });

    setContacts(newContacts);
  };

  const deleteContactFromState = (contactId) => {
    const newContacts = contacts.filter((contact) => contact.id !== contactId);

    setContacts(newContacts);
  };

  return {
    data: contacts,
    loading,
    addContactToState,
    updateContactInState,
    deleteContactFromState
  };
};

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
