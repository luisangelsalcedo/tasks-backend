import jwt from "jsonwebtoken";

export const validateToken = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!!auth) {
    const token = auth.split("Bearer ").join("");

    // verificar token
    jwt.verify(token, process.env.SECRET_KEY, (err, dataAuth) => {
      if (!!err) return res.status(403).json({ message: "Invalid token" });
      req.auth = dataAuth;
      next();
    });
    //
  } else res.status(403).json({ message: "Token required" });
};
