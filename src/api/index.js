import { API_URLS } from "../utils/constants";

// a general function that makes the api call after receiving the arguments 
const customFetch = async (url, { body, ...customConfig }) => {
  const headers = {
    "content-type": "application/json; charset=UTF-8",
    accept: "application/json",
  };

  const config = {
    ...customConfig,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(url, config);
  const data = await response.json();

  return {
    data,
  };
};

// makes the api call to fetch all the contacts
export const fetchUsers = () => {
  return customFetch(API_URLS.fetchContacts(), {
    method: "GET",
  });
};

// makes an api call to create a new contact
export const createContact = (body) => {
  return customFetch(API_URLS.addContact(), {
    method: "POST",
    body
  });
};

// makes an api call to fetch a single contact
export const fetchUser = (userId) => {
  return customFetch(API_URLS.fetchContact(userId), {
    method: 'GET'
  });
};

// makes an api call to update a contact
export const updateContact = (contact) => {
  return customFetch(API_URLS.editContact(contact.id), {
    method: 'PUT',
    body: contact
  });
};

// makes an api call to delete a contact
export const deleteContact = (userId) => {
  return customFetch(API_URLS.removeContact(userId), {
    method: 'DELETE'
  });
};