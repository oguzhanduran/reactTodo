const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8080;

const todoRoutes = require("./routes/todoRoutes"); // Routes are managed here

app.use(cors());
app.use(express.json());

// Connect the routes
app.use("/api/todos", todoRoutes);

// To run the application
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Presentation Layer: This layer is the gateway between the outside world (e.g., frontend, Postman, mobile application, another API) and the backend.

// Client
//    ↓
// server.js (the server listens)
//    ↓
// routes/todoRoutes.js (the request is routed)
//    ↓
// controllers/todoController.js (forwards to the service)
//    ↓
// services/todoService.js (executes business logic)
//    ↓
// repositories/ (accesses the data source)
