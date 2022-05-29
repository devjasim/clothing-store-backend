import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const adminAuth = async(req, res, next) => {
  try {
    if(req.headers?.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const isCustomAuth = token.length < 500;
      
      let decodedData;

      if(token && isCustomAuth) {
        decodedData = jwt.verify(token, config.JWT_SECRET);
        req.userId = decodedData?.id;
      } else {
        decodedData = jwt.decode(token);
        req.userId = decodedData?.sub;
      }

      next();
    } else {
      res.status(400).json({message: "JWT Token not found or invalid"})
    }
  } catch (error) {
    console.log("Auth Middleware", error)
  }
}

export default adminAuth;