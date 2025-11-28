const { google } = require("googleapis");
require("dotenv").config();

// ✅ Validate required environment variables
const requiredEnvVars = [
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GOOGLE_REDIRECT_URI",
];

const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  console.error("\n❌ [GOOGLE OAUTH] Missing required environment variables:");
  missingVars.forEach((varName) => {
    console.error(`   - ${varName}`);
  });
  console.error("\n👉 Add these to your .env file:");
  console.error(
    "   GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com"
  );
  console.error("   GOOGLE_CLIENT_SECRET=your-client-secret");
  console.error(
    "   GOOGLE_REDIRECT_URI=http://localhost:5000/api/google/callback\n"
  );

  throw new Error("Missing required Google OAuth environment variables");
}

// ✅ Create OAuth2 client instance
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// ✅ Log successful initialization
console.log("✅ [GOOGLE OAUTH] OAuth2 client initialized");
console.log(
  "📍 [GOOGLE OAUTH] Client ID:",
  process.env.GOOGLE_CLIENT_ID.substring(0, 20) + "..."
);
console.log("📍 [GOOGLE OAUTH] Redirect URI:", process.env.GOOGLE_REDIRECT_URI);

// ✅ Export the configured OAuth2 client
module.exports = {
  oauth2Client,
};
