const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  details: String,
  benefits: String,
  eligibility: String,
  process: String,
  documents: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
