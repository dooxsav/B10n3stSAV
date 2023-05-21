const { Role } = require("../models");
const createRole = {
  startApp: async () => {
    await Role.create({ name: "USER" });
  },
};

module.exports = createRole;
