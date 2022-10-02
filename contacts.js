const fs = require('fs/promises');
const path = require("path");
const {nanoid} = require('nanoid');

const contactsPath = path.join(__dirname, "./db/contacts.json");

const writeContacts = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function  listContacts() {
    const contacts = await fs.readFile(contactsPath);
    console.log(contacts);
    return JSON.parse(contacts);
  }
  
  async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find( ({id}) => id === contactId);
    console.log(contact);
    return contact || null;
  }
  
  async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id ===contactId );
    if(index === -1) {
      return null;
    }
    const [result] = contacts.splice(index,1)
    console.log(result);
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
    console.log(newContact);
    return newContact;
  }

module.exports ={
  listContacts,
  getContactById,
  removeContact,
  addContact
}
