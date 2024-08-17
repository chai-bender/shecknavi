const db = require('../config/connection');
const Artwork = require('../models/Artwork'); // Import Artwork model
const cleanDB = require('./cleanDB'); // Import cleanDB utility
const artworkData = require('./artwork.json'); // Import artwork data from JSON file
const dayjs = require('dayjs'); // Import dayjs for handling dates


db.once('open', async () => {
  await cleanDB('Artwork', 'artworks'); // Clear the artworks collection

  const updatedArtworkData = artworkData.map((artwork) => {
    return {
      ...artwork,
      endTime: dayjs().add(1, 'hour').toISOString() // Set endTime to current date and time plus one hour
    };
  });

  await Artwork.insertMany(updatedArtworkData); // Insert the seed data

  console.log('Artworks seeded!');
  process.exit(0); // Exit the process after seeding
});
