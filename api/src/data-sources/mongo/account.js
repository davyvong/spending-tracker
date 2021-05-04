import { MongoDataSource } from 'apollo-datasource-mongodb';
import bcrypt from 'bcrypt';
import { Unauthorized } from 'http-errors';

export default class AccountDataSource extends MongoDataSource {
  createPassword(plainPassword) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(plainPassword, 10, (error, hash) => {
        if (error) {
          reject(error);
        } else {
          resolve(hash);
        }
      });
    });
  }

  verifyPassword(plainPassword, passwordHash) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainPassword, passwordHash, (error, result) => {
        if (error) {
          reject(new Unauthorized());
        } else {
          resolve(result);
        }
      });
    });
  }
}
