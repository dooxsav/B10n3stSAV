const { User, Role } = require("../models");

/** Définition de la méthode UserController */
const UserController = {
  Test: async (req, res, next) => {
    res.status(200).json({ message: "UserController Work" });
  },
  createUser_part1: async (req, res, next) => {
    const { userName, lastName, firstName, email, phoneNumber, password } =
      req.Body;
    //! MODIFIER le PASSWORD & injecter le RoleId(s)

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
  createUser_part2: async (res, req, next) => {},
  getAllUser: async (req, res, next) => {},
  getUserbyPK: async (req, res, next) => {},
};

module.exports = UserController;
