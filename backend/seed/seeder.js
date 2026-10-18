const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "../.env") });

const User = require("../models/User");
const Listing = require("../models/Listing");
const Review = require("../models/Review");
const sampleListings = require("./seedData");

const seedDB = async () => {
  try {
    const connUri = process.env.MONGO_URI || process.env.LOCAL_MONGO_URI || "mongodb://127.0.0.1:27017/unistay";
    await mongoose.connect(connUri);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing data
    await Review.deleteMany({});
    await Listing.deleteMany({});
    await User.deleteMany({});
    console.log("Cleared existing collections.");

    // Create landlord/owner user
    const ownerUser = await User.create({
      name: "Ramesh Sharma (PG Owner)",
      email: "owner@unistay.com",
      password: "password123",
      role: "owner",
      phone: "+91 98112 34567",
      college: "Faridabad Accommodation Association",
    });

    // Create student user
    const studentUser = await User.create({
      name: "Dev Gupta (YMCA Student)",
      email: "student@unistay.com",
      password: "password123",
      role: "student",
      phone: "+91 98765 43210",
      college: "J.C. Bose UST, YMCA (CSE 3rd Year)",
    });

    console.log("Created seed users: owner@unistay.com and student@unistay.com (Password: password123)");

    // Add owner reference to each listing and insert
    const listingsWithOwners = sampleListings.map((listing) => ({
      ...listing,
      owner: ownerUser._id,
    }));

    const insertedListings = await Listing.insertMany(listingsWithOwners);
    console.log(`Inserted ${insertedListings.length} listings near YMCA Faridabad.`);

    // Add a sample review to the first listing
    const review = await Review.create({
      user: studentUser._id,
      listing: insertedListings[0]._id,
      rating: 5,
      comment:
        "Been living here for 2 semesters. YMCA Gate 2 is literally a 3-minute walk. Food is genuinely good and warm, and the Wi-Fi is reliable even during exams!",
      cleanliness: 5,
      foodQuality: 5,
      wifiSpeed: 5,
    });

    insertedListings[0].reviews.push(review._id);
    await insertedListings[0].save();
    console.log("Attached sample student review.");

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedDB();
