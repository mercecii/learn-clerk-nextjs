const NODE_ENV = process.env.NODE_ENV;
const NEXT_PRIVATE_ORIGIN = process.env.__NEXT_PRIVATE_ORIGIN;
const env = process.env;
export const getBaseUrlServerSide = () => {
  console.log("process.env = ", env);
  if (NODE_ENV === "development") {
    return NEXT_PRIVATE_ORIGIN;
  } else if (NODE_ENV === "production") {
    return `https://dev.mindcliq.com`;
  }
  // if (window.location.hostname === "dev.mindcliq.com") {
  //   return `https://dev.mindcliq.com`;
  // }
};
