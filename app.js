const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const ejsMate = require("ejs-mate");

const MONGO_URL = "mongodb://127.0.0.1:27017/EY";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  console.log("ayy a user is here");
  res.redirect("/home");
});

//home route
app.get("/home", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/home-fallback.ejs", { allListings });
});

//Scheme list route
app.get("/home/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/scheme-list.ejs", { allListings });
});

// Scheme details route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  const allListings = await Listing.find({});
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
