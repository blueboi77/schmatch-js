const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
    console.log("ayy a user is here");
    res.redirect("/home");
});

// home route
app.get("/home", (req, res) => {
  const allListings = []; // placeholder, originally from DB
  res.render("listings/home-fallback.ejs", { allListings });
});

// Scheme list route
app.get("/home/listings", (req, res) => {
  const allListings = []; // placeholder
  res.render("listings/scheme-list.ejs", { allListings });
});

// Scheme details route
app.get("/listings/:id", (req, res) => {
  const listing = null; // no real data
  const allListings = []; // still pass this if your ejs needs it
  res.render("listings/scheme.ejs", { listing, allListings });
});

app.get("/home/eligibility", (req, res) => {
  res.render("listings/animation.ejs");
});

app.get("/home/login", (req, res) => {
  res.render("listings/login.ejs");
});

app.get("/home/registration", (req, res) => {
  res.render("listings/registration.ejs");
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
