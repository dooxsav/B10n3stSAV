const MathService = {
  generateVerificationCode: () => {
    const codeLength = 5;
    let verificationCode = "";

    for (let i = 0; i < codeLength; i++) {
      verificationCode += Math.floor(Math.random() * 10);
    }

    return verificationCode;
  },
};

module.exports = MathService;
