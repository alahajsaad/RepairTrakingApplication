const isLocal = window.location.hostname === 'localhost';

export const BASE_URL = isLocal 
  ? `http://localhost:8080/api` 
  : `http://${window.location.hostname}:8080/api`;
