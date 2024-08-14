const db = require('../config/connection');
const Artwork = require('../models/Artwork'); // Import Artwork model
const cleanDB = require('./cleanDB'); // Import cleanDB utility
const artworkData = require('./artwork.json'); // Import artwork data from JSON file

db.once('open', async () => {
  await cleanDB('Artwork', 'artworks'); // Clear the artworks collection

  await Artwork.insertMany(artworkData); // Insert the seed data

  console.log('Artworks seeded!');
  process.exit(0); // Exit the process after seeding
});
