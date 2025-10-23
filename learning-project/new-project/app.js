const express = require("express"); // express is a node.js framework for building web applications and APIs
const app = express(); // create an instance of express at the app variable(which is a convention)
const port = 3000; // port number where the server will listen for requests. "port" is a convention, but you can name it anything
const path = require("path");

//terminar documentação do express, integrar sqlite, ?criar rotas para CRUD?

//.static middleware is used to serve static files such as images, CSS files, and JavaScript files from a directory
app.use(express.static(path.join(__dirname, "images"))); // serve static files from the "images" directory, to access them via http://localhost:3000/filename.ext
// we dont have to specify the /images route, express does it automatically when we use express.static(for that folder only)
//app.use("/images", express.static("images")); // this would require specifying /images in the URL to access the files

// the following methods have the same structure: app.METHOD(PATH, HANDLER)
// METHOD is an HTTP request method, in lowercase (get, post, put, delete, etc.)
// PATH is a path on the server
// HANDLER is a function that is executed when the route is matched. It takes two arguments: req (the request object) and res (the response object)
const requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

/* app.use('/user/:id', (req, res, next) => {
  console.log('Request Type:', req.method)
  next()
}) */ // this would log (at terminal) the request method for any request to /user/:id (where :id is a parameter)

app.get("/", (req, res, next) => {
  let responseText = "Hello World!<br>";
  responseText += `<small>Requested at: ${req.requestTime}</small>`;
  res.send(responseText);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello Bunda");
});

app.post("/post", (req, res) => {
  res.send("Post request here");
});

app.put("/put", (req, res) => {
  res.send("Put request here");
});

app.delete("/delete", (req, res) => {
  res.send("Delete request here");
});

// start the server and listen on the specified port for incoming requests
// if we named "port" something else, we would have to change it here too
app.listen(port, () => {
  console.log(`"Server está rodando na porta " ${port}`);
});

//alternatively, we could do app.listen(3000) and skip the port variable(this would also log no message on startup)
//but using a variable is a good practice, as it makes it easier to change the port number later if needed
