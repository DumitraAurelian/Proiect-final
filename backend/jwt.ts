import jwt, { sign, SignOptions } from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

/**
 * generates JWT used for local testing
 */
export function generateToken() {
  // information to be encoded in the JWT
  const payload = {
    name: "ReactBlog",
    accessTypes: ["getPosts", "addPost", "updatePost", "deletePost"],
  };

  const signInOptions: SignOptions = {
    algorithm: "HS256",
    expiresIn: "1h",
  };

  // generate JWT
  const key: any = process.env.SECRET_KEY;
  return sign(payload, key, signInOptions);
}

export function verifyToken(req: any, res: any) {
  let token = req.headers.authorization;
  if (!token) {
    return false;
  }
  let key: any = process.env.SECRET_KEY;
  jwt.verify(token, key, (err: any, decoded: any) => {
    if (err) {
      return false;
    }
  });
  return true;
}
