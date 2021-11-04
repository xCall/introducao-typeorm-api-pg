import { NextFunction, Response, Request } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }
  const [, token] = authToken.split(" ");
  try {
    const { sub } = verify(token, "8e3797e58b1e2b902b4ff84b7a62e227") as IPayload;
    request.user_id = sub;
    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
