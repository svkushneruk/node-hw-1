const fs = require('fs/promises');
const path = require("path");
const {nanoid} = require('nanoid');

const contactsPath = path.join(__dirname, "./db/contacts.json");

const writeContacts = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function  listContacts() {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  }
  
  async function getContactById(contactId) {
    const contacts = await listContacts();
    const getContactId = String(contactId);
    const contact = contacts.find( ({id}) => id === getContactId);
    return contact || null;
  }
  
  async function removeContact(contactId) {
    const contacts = await listContacts();
    const getContactId = String(contactId);
    const index = contacts.findIndex(contact => contact.id ===getContactId );
    if(index === -1) {
      return null;
    }
    const [result] = contacts.splice(index,1);
    await writeContacts(contacts);
    return result;
  }
  
  async function addContact(name, email, phone) {
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone
    }
    const contacts = await listContacts();
    contacts.push(newContact);
    await writeContacts(contacts);
    return newContact;
  }

module.exports ={
  listContacts,
  getContactById,
  removeContact,
  addContact
}
