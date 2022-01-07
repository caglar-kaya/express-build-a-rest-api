import { v4 as uuidv4 } from 'uuid';

let users = [
  {
    firstName: 'John',
    lastName: 'Doe',
    age: 25,
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    age: 24,
  },
  {
    id: '8af0b940-8e27-4dd5-a901-4479005d601c',
    firstName: 'Johnny',
    lastName: 'Doe',
    age: 10,
  },
];

export const createUser = (req, res) => {
  const user = req.body;
  const userWithId = { id: uuidv4(), ...user };
  users.push(userWithId);
  res.send(`User with the name ${user.firstName} added to the database!`);
};

export const getUsers = (req, res) => {
  res.send(users);
};

export const getUser = (req, res) => {
  const { id } = req.params;
  const foundUser = users.find((user) => user.id === id);
  res.send(foundUser);
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  users = users.filter((user) => user.id !== id);
  res.send(`User with the id ${id} deleted from the database.`);
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;

  const user = users.find((user) => user.id === id);

  if (firstName) user.firstName = firstName;

  if (lastName) user.lastName = lastName;

  if (age) user.age = age;

  res.send(`User with the id ${id} has been updated.`);
};
