import yargs from "yargs";
import { listContacts, getContactById, removeContact, addContact } from "./contacts.js";
import { Command } from "commander";

const program = new Command();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            const allContacts = await listContacts();
            console.table(allContacts);
            break;

        case 'get':
            const findContact = await getContactById(id);
            console.log(findContact);
            break;

        case 'add':
            const newContact = await addContact(name, email, phone);
            console.log(newContact);
            break;

        case 'remove':
            const deleteContact = await removeContact(id);
            console.log(deleteContact);
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
};

// Варіант Yargs
const{argv}=yargs(process.argv.splice(2));
invokeAction(argv);

// Варіант Command
// program
//     .option('-a, --action <type>', 'choose action')
//     .option('-i, --id <type>', 'user id')
//     .option('-n, --name <type>', 'user name')
//     .option('-e, --email <type>', 'user email')
//     .option('-p, --phone <type>', 'user phone');

// program.parse();

// const argv = program.opts();
// invokeAction(argv);


