// Necessary Imports, DO NOT REMOVE
const { LinkedList } = require("./LinkedList");
const { Student } = require('./Student');
const readline = require('readline');

// Initialize terminal interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Creates the Student Management System as a Linked List
/**
 * studentManagementSystem is the object that the main() function will be modifying
 */
const studentManagementSystem = new LinkedList();

// Display available commands
function main() {
  console.log(`
      Available Commands:
      - add [name] [year] [email] [specialization]: Add a student
      - remove [email]: Remove a student by email
      - display: Show all students
      - find [email]: Find a student by email
      - save [fileName]: Save the current linked list to the specified file
      - load [fileName]: Load a linked list from a file
      - clear: Clear the current linked list
      - q: Quit the terminal
  `);
}

// Command handling logic
async function handleCommand(command) {
  const [operation, ...args] = command.trim().split(' ');

  switch (operation) {
    case 'add':
      /**
       * TODO:
       *  Adds a student to the list
       */
      console.log('Adding student...');
      const [name, year, email, specialization] = args;
      if (!name || !year || !email || !specialization) {
        console.log("Invalid command. Usage: add <name> <year> <email> <specialization>");
        break;
      }
      studentManagementSystem.addStudent(new Student(name, parseInt(year), email, specialization));
      console.log("Student added successfully.");
      break;

    case 'remove':
      /**
       * TODO:
       *  Removes a particular student by email
       */
      console.log('Removing student...');
      const [removeEmail] = args;
      if (!removeEmail) {
        console.log("Invalid command. Usage: remove <email>");
        break;
      }
      studentManagementSystem.removeStudent(removeEmail);
      console.log("Student removed successfully.");
      break;

    case 'display':
      /**
       * TODO:
       *  Displays the students in the Linked List
       */
      console.log('Displaying students...');
      const students = studentManagementSystem.displayStudents();
      console.log(students ? students : "No students in the list.");
      break;

    case 'find':
      /**
       * TODO:
       *  Finds a particular student by email and returns their information
       */
      console.log('Finding student...');
      const [findEmail] = args;
      if (!findEmail) {
        console.log("Invalid command. Usage: find <email>");
        break;
      }
      const student = studentManagementSystem.findStudent(findEmail);
      console.log(student !== -1 ? student.getString() : "Student does not exist.");
      break;

    case 'save':
      /**
       * TODO:
       *  Saves the current LinkedList to a specified JSON file
       */
      console.log('Saving data...');
      const [saveFileName] = args;
      if (!saveFileName) {
        console.log("Invalid command. Usage: save <fileName>");
        break;
      }
      await studentManagementSystem.saveToJson(saveFileName)
        .then(() => console.log("Data saved successfully."))
        .catch(err => console.error("Error saving file:", err));
      break;

    case "load":
      /**
       * TODO:
       *  Loads data from specified JSON file into the current Linked List
       */
      console.log('Loading data...');
      const [loadFileName] = args;
      if (!loadFileName) {
        console.log("Invalid command. Usage: load <fileName>");
        break;
      }
      await studentManagementSystem.loadFromJSON(loadFileName)
        .then(() => console.log("Data loaded successfully."))
        .catch(err => console.error("Error loading file:", err));
      break;

    case 'clear':
      /**
       * TODO:
       *  Clears all data in the Linked List
       */
      console.log('Clearing data...');
      studentManagementSystem.clearStudents();
      console.log("All students removed.");
      break;

    case 'q':
      console.log('Exiting...');
      rl.close();
      break;

    default:
      console.log('Unknown command. Type "help" for a list of commands.');
      break;
  }
}

// Start terminal-based interaction (DO NOT MODIFY)
console.log('Welcome to the Student Management System!');
main();
rl.on('line', async (input) => {
  if (input.trim().toLowerCase() === 'help') {
    main();
  } else {
    await handleCommand(input);
  }
});
rl.on('close', () => {
  console.log('Goodbye!');
});
