import jwt from "jsonwebtoken";
import config from "../config/auth.json" assert { type: "json" };

const middleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).send({
      success: false,
      message: "Token inválido",
    });

  const parts = authHeader.split(" ");

  if (!parts.length === 2)
    return res.status(401).send({
      success: false,
      message: "Token inválido",
    });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({
      success: false,
      message: "Token inválido",
    });

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err)
      return res.status(401).send({
        success: false,
        message: "Sua sessão expirou. Faça o Login novamente.",
      });

    req.userId = decoded.id;

    return next();
  });
};

export { middleware };
