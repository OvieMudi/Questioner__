import db, { userModel } from '../../../db/v1/db';

const userDB = db.users;

class Users {
  /**
   * Create user in database using unique
   * Assign a unique id to user
   * @param {Object} data - http request body
   * @returns {Object} - User object if success
   * @throws {Error} - Error object if fail
   */
  static createUser(data) {
    const user = { id: parseInt(Math.random() * 1000000, 10) };
    const propNames = Object.keys(userModel);
    propNames.forEach((propName) => {
      if (propName === 'id' || propName === 'registered' || propName === 'isAdmin') return;
      if (!data[propName] || data[propName] < 2) {
        throw new Error(`${propName} is empty/invalid`);
      }
      user[propName] = data[propName];
    });
    user.registered = new Date();
    user.isAdmin = false;
    userDB.push(user);
    // RETURN NEW USER OBJECT
    return Users.getUser(user.id);
  }

  /**
   * Get all users in database
   * @returns {Array} - array of user objects
   */
  static getUsers() {
    return userDB;
  }

  /**
   * Get a User in database using a unique id
   * Assign a unique id to user
   * @param {String} idString - http request.params.id
   * @returns {Object} - if User is found
   * @returns {undefined} - if User is not found
   */
  static getUser(idString) {
    const id = parseInt(idString, 10);
    const user = userDB.find(obj => obj.id === id);
    return user;
  }

  /**
   * Update an existing user in database using a unique id
   * @param {String} idString - http request.params.id
   * @param {String} data - http request.body
   * @returns {Object} - on success
   * @throws {Error} - on failure
   */
  static updateUser(idString, data) {
    const id = parseInt(idString, 10);
    const user = userDB.find(obj => obj.id === id);
    const propNames = Object.keys(data);
    propNames.forEach((propName) => {
      if (!data[propName] || data[propName].length < 2) {
        // THROW EXCEPTION
        throw new Error(`${propName} is empty/invalid`);
      }
      if (propName !== 'id' || propName !== 'createdOn') user[propName] = data[propName];
    });
    return Users.getUser(id);
  }

  /**
   * Delete an existing user in database using a unique id
   * @param {String} idString - http request.params.id
   * @returns {Object} - on success
   * @returns {undefined} - on failure
   */
  static deleteUser(idString) {
    const id = parseInt(idString, 10);
    const deleted = userDB.find((user, index) => {
      if (user.id === id) userDB.splice(index, 1);
      return user.id === id;
    });
    return deleted;
  }
}

export default Users;
