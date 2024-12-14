import { auth } from "express-oauth2-jwt-bearer";

const authMiddleware = auth({
  // const jwtCheck = auth({
    audience: 'http://my-booking-api/',
    issuerBaseURL: 'https://dev-iqt65ryq05bu3vl7.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });
  

export default authMiddleware;