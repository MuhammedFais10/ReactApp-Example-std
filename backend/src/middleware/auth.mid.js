import pkg from "jsonwebtoken";
const { verify } = pkg;

export default (req, res, next) => {
  const token = req.headers.access_token;
  if (!token) return res.status(400).send();

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    res.status(400).send();
  }

  return next();
};
