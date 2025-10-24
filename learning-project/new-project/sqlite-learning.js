// sqlite3 is a popular library for interacting with SQLite databases in Node.js.
// Originally, sqlite is a C library that provides a lightweight, disk-based database that doesn't require a separate server process. The sqlite3 npm package is a Node.js wrapper around this C library, allowing developers to use SQLite databases within their JavaScript applications easily.
const sqlite3 = require("sqlite3").verbose(); // Import the sqlite3 library in verbose mode for detailed error messages
const db = new sqlite3.Database("./my-first-db.db"); // Create (or open if it exists) a database file named "my-first-db.db"

// Step 1: Write the SQL command as a string
// Primary Key is added to uniquely identify each record, duplicate entries can exist but will have different IDs
// Autoincrement ensures each new record gets a unique ID automatically
// CREATE TABLE IF NOT EXISTS ensures that the table is only created if it doesn't already exist
const createTableSQL = `
CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    age INTEGER,
    gpa REAL
)`;

// Step 2: Send the command to the database
// db.run is used for executing SQL commands that do not return data (like CREATE, INSERT, UPDATE, DELETE)
// The syntax is db.run(sql, [params], callback) - params is optional(can be omitted) and used for parameterized queries
console.log("Creating table...");
db.run(createTableSQL, function (err) {
  if (err) {
    console.log("❌ Error creating table:", err.message);
  } else {
    console.log("✅ Table 'students' created successfully!");
    console.log("Your database now has a structure to store student data.");
  }
});

// Insert sample data into the students
// This is hardcoded data for demonstration purposes, in real applications, use parameterized queries to prevent SQL injection
// The syntax is INSERT INTO table (columns) VALUES (values)
// INSERT INTO command is used to add new records to the table
const insertDataSQL = `
INSERT INTO students (name, email, age, gpa) 
VALUES ('John Doe', 'john@email.com', 20, 3.5)
`;

db.run(insertDataSQL, function (err) {
  if (err) {
    console.log("❌ Error inserting data:", err.message);
  } else {
    console.log("✅ Sample data inserted into 'students' table!");
  }
});

// Query data from the students table
// db.all is used when you want to retrieve data from the database
// The syntax is db.all(sql, params, callback)
// [] is an array of parameters for the query, it is empty here since there are no parameters(but for example, you could use it for WHERE clauses: [18] for age > ?)
// [] cannot be omitted; if there are no parameters, an empty array must be provided
// rows is an array of all returned records, each row is an object representing a record
db.all("SELECT * FROM students", [], (err, rows) => {
  if (err) {
    console.log("❌ Error retrieving data:", err.message);
  } else {
    console.log("✅ All students:");
    rows.forEach((row) => {
      console.log(` - ${row.name} (${row.age} years old, GPA: ${row.gpa})`);
    });
  }
});
// Query students older than 18, WHERE clause is used to filter results based on conditions
db.all("SELECT * FROM students WHERE age > ?", [18], (err, rows) => {
  if (err) {
    console.log("❌ Error retrieving data:", err.message);
  } else {
    console.log("✅ Students older than 18:");
    rows.forEach((row) => {
      console.log(` - ${row.name} (${row.age} years old, GPA: ${row.gpa})`);
    });
  }
});
// UPDATE data in the students table at an existing record
// The syntax is UPDATE table SET column = value WHERE condition
// If the WHERE clause is omitted, ALL records will be updated!
// we could also use this.changes in the callback to see how many rows were affected
//this.changes is standard sqlite syntax to get the number of rows affected by the last executed statement
db.run(
  "UPDATE students SET gpa = ? WHERE name = ?",
  [3.9, "John Doe"],
  function (err) {
    if (err) {
      console.log("❌ Error updating data:", err.message);
    } else {
      console.log("✅ Student 'John Doe' updated successfully!");
    }
  }
);

// DELETE data from the students table
// The syntax is DELETE FROM table WHERE condition
// If the WHERE clause is omitted, ALL records will be deleted!
// again, we could use this.changes to see how many rows were deleted if any
db.run("DELETE FROM students WHERE name = ?", ["John Doe"], function (err) {
  if (err) {
    console.log("❌ Error deleting data:", err.message);
  } else {
    console.log("✅ Student 'John Doe' deleted successfully!");
  }
});
// Close the database connection when done
db.close((err) => {
  if (err) {
    console.log("❌ Error closing database:", err.message);
  } else {
    console.log("✅ Database closed successfully!");
  }
});

// Note: In a real application, you would typically handle database operations asynchronously and manage connections more robustly.

// To drop the entire table (removing both structure and data), you would use:
/* db.run("DROP TABLE students", function(err) {
  if (err) {
    console.log("❌ Error dropping table:", err.message);
  } else {
    console.log("✅ Table 'students' dropped successfully!");
  }
}); */
