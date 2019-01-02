import db, { userModel } from '../../../db/v1/db';

const userDB = db.users;

class Users {
  /* createUser
    * create new user, add to db, return new user/exception
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

  /* getUsers
    * get all users, return all users/emptyArray
  */

  static getUsers() {
    return userDB;
  }

  /* getUser
    * find a user, return found user/undefined
  */

  static getUser(idString) {
    const id = parseInt(idString, 10);
    const user = userDB.find(obj => obj.id === id);
    return user;
  }

  /* updateUser
    * find a user, update user, return updated user/undefined/exception
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

  /* deleteUser
    * find a user, delete user, return found user/undefined
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
