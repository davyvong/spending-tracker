import { MongoDataSource } from 'apollo-datasource-mongodb';
import bcrypt from 'bcrypt';
import { Unauthorized } from 'http-errors';

export default class AccountDataSource extends MongoDataSource {
  async createPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (error, hash) => {
        if (error) {
          reject(error);
        } else {
          resolve(hash);
        }
      });
    });
  }

  async verifyPassword(password, passwordHash) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, passwordHash, (error, result) => {
        if (error) {
          reject(new Unauthorized());
        } else {
          resolve(result);
        }
      });
    });
  }
}
