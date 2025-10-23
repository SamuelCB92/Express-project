const sqlite3 = require("sqlite3").verbose(); // Import the sqlite3 library in verbose mode for detailed error messages
const db = new sqlite3.Database("./my-first-db.db"); // Create (or open if it exists) a database file named "my-first-db.db"

// Step 1: Write the SQL command as a string
const createTableSQL = `
CREATE TABLE students (
    id INTEGER,
    name TEXT,
    email TEXT,
    age INTEGER,
    gpa REAL
)`;

// Step 2: Send the command to the database
console.log("Creating table...");
db.run(createTableSQL, function (err) {
  if (err) {
    console.log("❌ Error creating table:", err.message);
  } else {
    console.log("✅ Table 'students' created successfully!");
    console.log("Your database now has a structure to store student data.");
  }
});
