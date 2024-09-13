import jwt from "jsonwebtoken";

const verifyCookie = async (req, res, next) => {
  try {
    const cookies = req.cookies;

    if (!cookies || !cookies.auth_token) {
      return res.status(400).json({ message: "Invalid Cookie" });
    }

    const token = cookies.auth_token.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(400).json({ message: "Invalid Token" });
      }

      req["userId"] = decoded.userId;

      next();
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default verifyCookie;
