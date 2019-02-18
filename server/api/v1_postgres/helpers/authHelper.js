import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authHelper = {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} hashed password
   */
  hashPassword(password = '') {
    const saltRounds = 8;
    return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds));
  },

  /**
   * comparePassword
   * @param {string} password
   * @param {string} hashPassword
   * @returns {Boolean} True or False
   */
  comparePassword(password = '', hashPassword = '') {
    return bcrypt.compareSync(password, hashPassword);
  },

  /**
   * Gnerate Token
   * @param {string} id
   * @returns {string} token
   */
  generateToken(id, username) {
    const token = jwt.sign({
      userId: id,
      username,
    }, process.env.SECRET_STRING,
    { expiresIn: '7h' });
    return token;
  },
};

export default authHelper;
