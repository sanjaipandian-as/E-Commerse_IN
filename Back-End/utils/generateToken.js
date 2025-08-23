import jwt from "jsonwebtoken";

const generateToken = (id, username, email, role) => {
  return jwt.sign(
    { id, username, email, role }, // <-- Updated payload with all user details
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

export default generateToken;
