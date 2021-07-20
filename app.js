// Require node packages
const express = require("express");
const handlebars = require("express-handlebars");

// Set up express app and environment
const app = express();
require("dotenv").config();
const config = require("./config.json")[process.env.NODE_ENV || "development"];
app.listen(config.port, () => {
  console.log(`Application listening to port ${config.port}...`);
});

// Set up postgres database connection using knex
const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);

// Serve public folder and set up middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set up handlebars
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Set up basic auth
const basicAuth = require("express-basic-auth");
const authChallenger = require("./userAuth/authChallenger");
app.use(
  basicAuth({
    authorizer: authChallenger,
    authorizeAsync: true,
    challenge: true,
    realm: "Simple Note Taking App",
  })
);

// Set up note service and router
const NoteService = require("./server/noteService");
const noteService = new NoteService(knex);
const NoteRouter = require("./server/noteRouter");
const noteRouter = new NoteRouter(noteService).router();

// Index page
app.get("/", async (req, res) => {
  res.render("index");
});

// Note routes
app.use("/api/notes/", noteRouter);
