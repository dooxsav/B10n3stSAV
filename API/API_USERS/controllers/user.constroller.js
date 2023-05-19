const { User, Role } = require("../models");
const bcrypt = require("bcrypt");
const mailService = require("../services/email.service");
const MathService = require("../services/math.service");
const saltRound = 10;
const JWTService = require('../services/JWT.service')

/** Définition de la méthode UserController */
const UserController = {
  Test: async (req, res, next) => {
    res.status(200).json({ message: "UserController Work" });
  },
  createUser_part1: async (req, res, next) => {
    /** Cryptage du password */
    hashedPassword = bcrypt.hashSync(req.body.password, saltRound);
    req.body.password = hashedPassword;

    /**  */
    const { userName, lastName, firstName, email, phoneNumber, password } =
      req.body;

    const data = {
      userName,
      lastName,
      firstName,
      email,
      phoneNumber,
      password,
      verificationCode: MathService.generateVerificationCode(),
      token: token
    };

    /** Creation du JWT */
    const token = JWTService.generateToken(data)

    try {
      mailService.sendEmail(
        "CreateUser_part1.mail",
        data,
        email,
        `[BIONEST FRANCE] - Bonjour ${data.firstName}, Créons votre espace personnel`,
        (success) => {
          if (success) {
            console.log("E-mail sent successfully");
            res.status(200).json({ result: success });
          } else {
            console.log("Failed to send e-mail");
            res.status(500).json({ result: error });
          }
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de l'envoi du courrier électronique",
      });
    }
  },
  createUser_part2: async (req, res, next) => {
    /** Récupération du token */
    const token = req.params.token;

    const { userName, lastName, firstName, email, phoneNumber, password } = JWTService.verifyToken(req.params.token)

    console.log(userName)
    // INJECTER le RoleIdS
    // INJECTION EN DB
    /*
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
      */

  },
  getAllUser: async (req, res, next) => {},
  getUserbyPK: async (req, res, next) => {},
  updateUser: async (req, res, next) => {},
  deleteUser: async (req, res, next) => {},
};

module.exports = UserController;
