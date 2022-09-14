import { API_URLS } from "../utils/constants";

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

export const fetchUsers = () => {
  return customFetch(API_URLS.fetchContacts(), {
    method: "GET",
  });
};

export const createContact = (body) => {
  return customFetch(API_URLS.addContact(), {
    method: "POST",
    body
  });
};

export const fetchUser = (userId) => {
  return customFetch(API_URLS.fetchContact(userId), {
    method: 'GET'
  });
};

export const updateContact = (contact) => {
  return customFetch(API_URLS.editContact(contact.id), {
    method: 'PUT',
    body: contact
  });
};

export const deleteContact = (userId) => {
  return customFetch(API_URLS.removeContact(userId), {
    method: 'DELETE'
  });
};