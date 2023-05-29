const { User, Role } = require("../models");
const bcrypt = require("bcrypt");
const mailService = require("../services/email.service");
const MathService = require("../services/math.service");
const saltRound = 10;
const JWTService = require("../services/JWT.service");
// const SMSService = require('../services/SMS.service');
const TWILIOService = require("../services/twilio.service");

/** Définition de la méthode UserController */
const UserController = {
  Test: async (req, res, next) => {
    res.status(200).json({ message: "Bonjour Florence !" });
  },
  createUser_part1: async (req, res, next) => {
    /** Cryptage du password */
    hashedPassword = bcrypt.hashSync(req.body.password, saltRound);
    req.body.password = hashedPassword;

    /**  */
    const { userName, lastName, firstName, email, phoneNumber, password } =
      req.body;

    const Userdata = {
      userName,
      lastName,
      firstName,
      email,
      phoneNumber,
      password,
      verificationCode: MathService.generateVerificationCode(),
    };

    /** Creation du JWT */
    const token = JWTService.generateToken(Userdata);

    const data = { ...Userdata, token: token };

    try {
      mailService.sendEmail(
        "CreateUser_part1.mail",
        data,
        email,
        `[BIONEST FRANCE] - Bonjour ${data.firstName}, Créons votre espace personnel`,
        async (success) => {
          if (success) {
            console.log("E-mail sent successfully");
            // await TWILIOService.sendSMS(phoneNumber, "Bienvenue chez BIONEST");
            res
              .status(200)
              .json({
                result: success,
                token: token,
                verificationCode: Userdata.verificationCode,
              });
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
    const { verifyCode, token } = req.query;
    const decodedToken = JWTService.verifyToken(token);

    if (!decodedToken) {
      return res.status(500).send(decodedToken);
    }

    const {
      userName,
      lastName,
      firstName,
      email,
      phoneNumber,
      password,
      verificationCode,
    } = decodedToken;

    if (verifyCode !== verificationCode) {
      return res.status(403).json("Access forbidden");
    }

    try {
      const newUser = await User.create({
        userName,
        lastName,
        firstName,
        email,
        phoneNumber,
        password,
      });

      const roleIds = [1]; // [1] est la valeur USER (par défaut)

      if (roleIds && roleIds.length) {
        const roles = await Role.findAll({ where: { id: roleIds } });
        await newUser.setRoles(roles);
      }
      mailService.sendEmail(
        "CreateUser_part2.mail",
        decodedToken,
        email,
        "Bienvenue sur Bionest !",
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
      return res.status(201).json(newUser);
    } catch (error) {
      console.log(error.message);
      return next(error);
    }
  },
  getAllUser: async (req, res, next) => {
    try {
      const allusers = await User.findAll({ include: Role });
      if (allusers.length === 0) {
        res.status(200).json({ message: "No user has been found" });
      } else {
        res.status(200).json({ allusers });
      }
    } catch (error) {
      console.log("ERREUR lors de la requête : " + error.message);
      res.status(500).send(error);
    }
  },
  getUserbyPK: async (req, res, next) => {
    const id = req.query.id;
    await User.findByPk(id, { include: Role })
      .then((user) => {
        res.status(200).json({ user });
      })
      .catch((error) => {
        res.status(500).json(error.message);
      });
  },
  updateUser: async (req, res, next) => {
    /** Cryptage du password */
    if (req.body.password) {
      hashedPassword = bcrypt.hashSync(req.body.password, saltRound);
      req.body.password = hashedPassword;
    }
    console.log(req.body);

    const id = req.body.id;
    const dataupdated = req.body;

    await User.update({ ...dataupdated }, { where: { ...id } })
      .then((udpateduser) => {
        res.status(200).json({ udpateduser });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  },
  addRoleUser: async (req, res, next) => {
    const { roleId, userId } = req.body;
    try {
      const role = await Role.findByPk(roleId);
      const user = await User.findByPk(userId);
      await user.addRole(role);
      res.status(200).json({ message: "Role added successfully" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  },
  removeRoleUser: async (req, res, next) => {
    const { roleId, userId } = req.body;
    try {
      const role = await Role.findByPk(roleId);
      const user = await User.findByPk(userId);
      await user.removeRole(role);
      res.status(200).json({ message: "Role removed successfully" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  },
  deleteUser: async (req, res, next) => {
    const { userId } = req.body;
    try {
      const datauser = await User.findByPk(userId);
      await User.destroy({
        where: {
          id: userId,
        },
      });
      mailService.sendEmail(
        "DestroyUser.mail",
        datauser,
        datauser.email,
        "Confirmation de la suppression de votre compte",
        (success) => {
          console.log(success);
        }
      );
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.log("erreur: " + error.message);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = UserController;
