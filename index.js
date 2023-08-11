const { Command } = require('commander')
const program = new Command()
const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
} = require('./contacts')
program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone')

program.parse(process.argv)

const argv = program.opts()

function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            const contacts = listContacts()
            console.table(contacts)
            break

        case 'get':
            const contact = getContactById(id)
            console.log(contact)
            break

        case 'add':
            const addedContact = addContact(name, email, phone)
            console.log('Contact added:', addedContact)
            break

        case 'remove':
            const removedContact = removeContact(id)
            console.log('Contact removed:', removedContact)
            break

        default:
            console.warn('\x1B[31m Unknown action type!')
    }
}

invokeAction(argv)
