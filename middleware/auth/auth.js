import jwt from 'jsonwebtoken';

const auth = async(req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
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

  } catch (error) {
    console.log("Auth Middleware", error)
  }
}

export default auth;