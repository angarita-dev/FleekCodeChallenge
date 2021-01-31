const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require('passport');
var cors = require('cors');

// Requiring routes
const userRoutes = require("./routes/api/users");
const keyRoutes = require("./routes/api/keys");

//
// Setting up DB
// DB Config
const db = require("../config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

//
// Setting up server
const app = express();

// Allowing cors
app.use(cors());

// user bodyParser as middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// Passport middleware
require("../config/passport")(passport);
app.use(passport.initialize());

//
// Routes
app.use("/api/users", userRoutes);
app.use("/api/keys", keyRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
