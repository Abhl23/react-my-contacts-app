import { createContext } from "react";

import { useProvideContacts } from "../hooks";

// default value of the global context state
const initialState = {
  data: [],
  loading: true,
  addContactToState: () => {},
  updateContactInState: () => {},
  deleteContactFromState: () => {},
};

export const ContactsContext = createContext(initialState);

const ContactsProvider = ({ children }) => {
  const contacts = useProvideContacts();

  return (
    <ContactsContext.Provider value={contacts}>
      {children}
    </ContactsContext.Provider>
  );
};

export default ContactsProvider;
