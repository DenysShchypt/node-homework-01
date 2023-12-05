import fs from "fs/promises";
import path from "path";
import detectFileEncoding from "detect-file-encoding-and-language";
import { nanoid } from "nanoid";


const contactsPath = path.join("db/contacts.json");


async function listContacts() {
  const { encoding } = await detectFileEncoding(contactsPath);
  const buffer = await fs.readFile(contactsPath);
  return JSON.parse(buffer)
};

async function getContactById(contactId) {
  const contacts = await listContacts();
  const idContact = await contacts.find(user => user.id === contactId);
  return idContact || null;
};

async function removeContact(contactId) {
  const contacts = await listContacts();
  const edxContact = await contacts.findIndex(user => user.id === contactId);
  if (edxContact === -1) {
    return null
  }
  const [result] = contacts.splice(edxContact, 1)
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result
};

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone
  };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

export { listContacts, getContactById, removeContact, addContact };