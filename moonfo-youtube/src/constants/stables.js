const isProduction = process.env.NODE_ENV === "production";

// Set your base API URL based on the environment
const API_BASE_URL = isProduction
  ? "" // ✅ Replace with your deployed backend URL
  : process.env.REACT_APP_API_BASE_URL;

// Uploads folder URL
const UPLOAD_FOLDER_BASE_URL = `${API_BASE_URL}/uploads/`;

// Exported constants
const stables = { API_BASE_URL, UPLOAD_FOLDER_BASE_URL };

export default stables;
