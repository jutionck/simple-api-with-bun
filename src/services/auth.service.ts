import jwt from "jsonwebtoken";

export const signUserToken = (data: { id: number; email: string }) => {
  const token = jwt.sign(
    {
      id: data.id,
      email: data.email,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRES as string }
  );

  return token;
};

export const verifyToken = (token: string) => {
  let payload: any;
  jwt.verify(token, process.env.JWT_SECRET as string, (error, decoded) => {
    if (error) {
      throw new Error("Ivalid token")
    }
    payload = decoded;
  });

  return payload;
}