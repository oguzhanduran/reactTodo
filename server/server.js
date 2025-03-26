const express = require('express');
const app = express();
const cors = require("cors")
const PORT = 8080;

app.use(cors());


// creating api route
app.get("/api/todos", (req, res) => {
  res.json({ message: "Hello World!", people: ["oguzhan", "hasan", "kaan"] });
});

// To run application
app.listen(PORT, () => {
console.log(`Server started on port ${PORT}`)
})