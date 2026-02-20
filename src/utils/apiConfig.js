const hostname = window.location.hostname;

// Adjust port to 3001 for json-server (or 8080 if using Spring Boot later)
const PORT = 3001; 

export const API_BASE_URL = `http://${hostname}:${PORT}`;