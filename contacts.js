const fs = require('fs')
const path = require('path')

const contactsPath = path.join(__dirname, 'db', 'contacts.json')

function listContacts() {
    try {
        const contactsData = fs.readFileSync(contactsPath, 'utf-8')
        const contacts = JSON.parse(contactsData)
        return contacts
    } catch (error) {
        console.error('Error reading contacts:', error)
        return []
    }
}

function getContactById(contactId) {
    try {
        const contactsData = fs.readFileSync(contactsPath, 'utf-8')
        const contacts = JSON.parse(contactsData)
        const contact = contacts.find((c) => c.id === contactId)
        return contact || null
    } catch (error) {
        console.error('Error reading contacts:', error)
        return null
    }
}

function removeContact(contactId) {
    try {
        const contactsData = fs.readFileSync(contactsPath, 'utf-8')
        const contacts = JSON.parse(contactsData)
        const updatedContacts = contacts.filter((c) => c.id !== contactId)
        fs.writeFileSync(contactsPath, JSON.stringify(updatedContacts, null, 2))
        return true
    } catch (error) {
        console.error('Error removing contact:', error)
        return false
    }
}

function addContact(name, email, phone) {
    try {
        const contactsData = fs.readFileSync(contactsPath, 'utf-8')
        const contacts = JSON.parse(contactsData)

        const newContact = { id: Date.now().toString(), name, email, phone }
        contacts.push(newContact)
        fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2))

        return newContact
    } catch (error) {
        console.error('Error adding contact:', error)
        return null
    }
}

module.exports = { listContacts, getContactById, removeContact, addContact }
