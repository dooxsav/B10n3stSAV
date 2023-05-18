const { User, Role } = require("../models");
const bcrypt = require("bcrypt");

/** Définition de la méthode UserController */
const UserController = {
  Test: async (req, res, next) => {
    res.status(200).json({ message: "UserController Work" });
  },
  createUser_part1: async (req, res, next) => {
    //! MODIFIER le PASSWORD

    const { userName, lastName, firstName, email, phoneNumber, password } =
      req.body;
    const saltRound = 10;
    hashedPassword = bcrypt.hashSync(password, saltRound);
    req.body.password = hashedPassword;
    res.status(200).send(password);
  },
  createUser_part2: async (res, req, next) => {
    // INJECTER le RoleIdS
    // INJECTION EN DB
    User.create({
      userName,
      lastName,
      firstName,
      email,
      phoneNumber,
      password,
      roleIds,
    })
      .then((NewUser) => {
        if (roleIds && roleIds.length) {
          return Role.findAll({ where: { id: rolesIds } }).then((roles) =>
            NewUser.setRoles(roles)
          );
        }
      })
      .then(() => {
        res.status(201).json(NewUser);
      })
      .catch((error) => next(error));
  },
  getAllUser: async (req, res, next) => {},
  getUserbyPK: async (req, res, next) => {},
  updateUser: async (req, res, next) => {},
  deleteUser: async (req, res, next) => {},
};

module.exports = UserController;
