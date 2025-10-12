const express = require("express"); // express is a node.js framwork for building web applications and APIs
const app = express();
const port = 3000;

//terminar documentação do express, integrar sqlite, ?criar rotas para CRUD?

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

app.listen(port, () => {
  console.log(`"Server está rodando na porta " ${port}`);
});
