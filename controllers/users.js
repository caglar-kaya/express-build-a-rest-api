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
  res.status(200);
  res.send(`User with the name ${user.firstName} added to the database!`);
};

export const getUsers = (req, res) => {
  res.status(200);
  res.send(users);
};

export const getUser = (req, res) => {
  const { id } = req.params;
  const foundUser = users.find((user) => user.id === id);
  if (foundUser) {
    res.status(200);
    res.send(foundUser);
  } else {
    res.status(404);
    res.send(`The user with id ${id} not found in the database.`);
  }
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  const userExist = users.some((user) => user.id === id);
  if (userExist) {
    users = users.filter((user) => user.id !== id);
    res.status(200);
    res.send(`User with the id ${id} deleted from the database.`);
  } else {
    res.status(404);
    res.send(`The user with id ${id} not found in the database.`);
  }
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;

  const user = users.find((user) => user.id === id);

  if (user) {
    if (firstName) {
      user.firstName = firstName;
    } else {
      res.status(400);
      res.send(`The user needs a firstName property set.`);
      return;
    }
    if (lastName) {
      user.lastName = lastName;
    } else {
      res.status(400);
      res.send(`The user needs a lastName property set.`);
      return;
    }
    if (age) {
      user.age = age;
    } else {
      res.status(400);
      res.send(`The user needs an age property set.`);
      return;
    }
    res.status(200);
    res.send(`The user with id ${id} has been updated.`);
  } else {
    res.status(404);
    res.send(`The user with id ${id} not found in the database.`);
  }
};
