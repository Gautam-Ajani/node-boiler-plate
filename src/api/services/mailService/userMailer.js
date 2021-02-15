const { mailService } = require('./service');
const { frontend, mailConfig } = require('../../../config/vars');

/**
 * Handles mail events triggered by the UserModel
 */

class UserMailer {
  static async handleResetPassword(user) {
    const host = this.getFrontEndURL(user);
    const resetPasswordLink = `${host}/${frontend.resetPassword}?token=${user.changePasswordToken}`;
    const mailOptions = {
      from: `PayBe ${mailConfig.email}`,
      to: user.email,
      subject: 'Reset your password on PAYBE',
      text: `
    Seems like you forgot your password for Pay Be. if this is true, click below to reset your password.

    ${resetPasswordLink}
    
    if you did not forgot your password you can safely ignore this email.
  `,
    };
    await mailService.sendMail(mailOptions);
  }

  static getTokenURL(token) {
    const tokenUrl = `${frontend.frontendHost}/${frontend.resetPassword}?token=${token}`;
    return tokenUrl;
  }

  static getFrontEndURL() {
    return frontend.frontendHost;
  }
}

module.exports = UserMailer;
