const { Role } = require("../models");
const createRole = {
  startApp: async () => {
    console.log("coucou");
    await Role.create({ name: "USER" });
  },
};

module.exports = createRole;
