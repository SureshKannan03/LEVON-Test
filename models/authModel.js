const bcrypt = require("bcryptjs");

let users = []; // In-memory storage for users
let nextId = 1;

const findUserByEmail = (email) => users.find((user) => user.email === email);

const createUser = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = {
    id: nextId++,
    email: user.email,
    password: hashedPassword,
    role: user.role,
  };
  users.push(newUser);
  return newUser;
};

const findUserById = (id) => users.find((user) => user.id === id);

module.exports = {
  findUserByEmail,
  createUser,
  findUserById,
};
