export const getBaseUrl = () => {
  if (window.location.hostname === "localhost") {
    return `http://localhost:${window.location.port}`;
  }
  if (window.location.hostname === "dev.mindcliq.com") {
    return `https://dev.mindcliq.com`;
  }
};
