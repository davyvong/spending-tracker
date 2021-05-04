import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import bcrypt from 'bcrypt';
import { getCurrentTimestamp } from 'src/common/utils/date.util';

import { NewAccountInput } from './dto/new-account.input';
import { UpdateAccountInput } from './dto/update-account.input';
import { AccountModel } from './models/account.model';

@Injectable()
export class AccountService {
  constructor(@InjectModel('accounts') private readonly accountModel) {}

  async changePassword(account: AccountModel, currentPassword: string, nextPassword: string): Promise<boolean> {
    if (await this.verifyPassword(currentPassword, account.passwordHash)) {
      const passwordHash = await this.generatePasswordHash(nextPassword);
      const updatedOn = getCurrentTimestamp();
      const result = await this.accountModel.findByIdAndUpdate(account.id, { passwordHash, updatedOn });
      return Boolean(result);
    }
    throw new UnauthorizedException();
  }

  async create(newAccountInput: NewAccountInput): Promise<AccountModel> {
    const passwordHash = await this.generatePasswordHash(newAccountInput.plainPassword);
    const createTime = getCurrentTimestamp();
    return this.accountModel.create({ ...newAccountInput, createTime, passwordHash, updateTime: createTime });
  }

  async getByEmail(email: string): Promise<AccountModel> {
    return this.accountModel.findOne({ email: email.toLowerCase() });
  }

  async getById(id: string): Promise<AccountModel> {
    return this.accountModel.findById(id);
  }

  async generatePasswordHash(plainPassword: string): Promise<string> {
    return new Promise((resolve, reject): void => {
      bcrypt.hash(plainPassword, 10, (error: Error, hash: string): void => {
        if (error) {
          reject(error);
        } else {
          resolve(hash);
        }
      });
    });
  }

  async updateAccount(account: AccountModel, updateAccountInput: UpdateAccountInput): Promise<AccountModel> {
    const { plainPassword, ...updateInput } = updateAccountInput;
    if (this.verifyPassword(plainPassword, account.passwordHash)) {
      const updatedOn = getCurrentTimestamp();
      return this.accountModel.findByIdAndUpdate(account.id, { ...updateInput, updatedOn });
    }
    throw new UnauthorizedException();
  }

  async verifyPassword(plainPassword: string, passwordHash: string): Promise<boolean> {
    return new Promise((resolve, reject): void => {
      bcrypt.compare(plainPassword, passwordHash, (error: Error, result: boolean): void => {
        if (error) {
          reject(new UnauthorizedException());
        } else {
          resolve(result);
        }
      });
    });
  }
}
