// const sessionIdToUserMap = new Map();
import jwt from "jsonwebtoken";
const secret = "lkfjslkaj4$#%@!fjk-??@#2324";

function setUser(user) {
  // sessionIdToUserMap.set(id, user);
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secret,
  );
}

function getUser(token) {
  // return sessionIdToUserMap.get(id);
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

export { setUser, getUser };
