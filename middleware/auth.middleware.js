import jwt from 'jsonwebtoken';

const userAuth = async(req, res, next) => {
  try {
    if(req.headers.authorization) {
      const token = req.headers.authorization?.split(" ")[1];
      const isCustomAuth = token.length < 500;

      let decodedData;

      if(token && isCustomAuth) {
        decodedData = jwt.verify(token, "test");

        req.userId = decodedData?.id;
      } else {
        decodedData = json.decode(token);

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

export default userAuth;