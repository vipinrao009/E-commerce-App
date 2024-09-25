// config.js
const environment = process.env.NODE_ENV;  // Get current environment ('development' or 'production')

export const baseUrl = environment === 'development'
  ? "http://localhost:8080"  // Local development URL
  : "https://e-commerce-app-1-zuls.onrender.com";  // Production URL