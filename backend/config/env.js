const dotenv = require('dotenv');

// Load environment variables from the .env file into `process.env`
dotenv.config();

// Validate environment variables
if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is required in the .env file');
  process.exit(1); // Exit with failure code if MongoDB URI is missing
}

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is required in the .env file');
  process.exit(1); // Exit with failure code if JWT_SECRET is missing
}

module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};
