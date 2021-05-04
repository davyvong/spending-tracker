import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WithObjectId } from 'src/common/types/with-object-id.type';
import { getCurrentTimestamp } from 'src/common/utils/date.util';

import { NewTransactionInput } from './dto/new-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { TransactionModel } from './models/transaction.model';

@Injectable()
export class TransactionService {
  constructor(@InjectModel('transactions') private readonly transactionModel) {}

  async create(accountId: string, newTransactionInput: NewTransactionInput): Promise<TransactionModel & WithObjectId> {
    const newTransactionData: any = {
      accountId,
      createTime: getCurrentTimestamp(),
    };
    newTransactionData.updateTime = newTransactionData.createTime;
    return this.transactionModel.create({
      ...newTransactionInput,
      ...newTransactionData,
    });
  }

  async deleteById(accountId: string, transactionsId: string): Promise<boolean> {
    try {
      await this.transactionModel.findOneAndRemove({ accountId, _id: transactionsId });
      return true;
    } catch (error) {
      return false;
    }
  }

  async getByCard(accountId: string, cardId: string, skip: number): Promise<TransactionModel[]> {
    return this.transactionModel.find({ accountId, cardId }, null, {
      limit: 20,
      skip,
      sort: '-postTime',
    });
  }

  async getByCategory(accountId: string, categoryId: string, skip: number): Promise<TransactionModel[]> {
    return this.transactionModel.find({ accountId, categoryId }, null, {
      limit: 20,
      skip,
      sort: '-postTime',
    });
  }

  async getByDateRange(
    accountId: string,
    startDate: string,
    endDate: string,
    filters: any = {},
  ): Promise<TransactionModel[]> {
    return this.transactionModel.find({
      ...filters,
      accountId,
      postTime: {
        $lte: endDate,
        $gte: startDate,
      },
    });
  }

  async getById(accountId: string, transactionId: string): Promise<TransactionModel & WithObjectId> {
    return this.transactionModel.findOne({ accountId, _id: transactionId });
  }

  async getByPage(accountId: string, skip: number): Promise<TransactionModel[]> {
    return this.transactionModel.find({ accountId }, null, { limit: 20, skip, sort: '-postTime' });
  }

  async updateById(
    accountId: string,
    transactionId: string,
    updateTransactionInput: UpdateTransactionInput,
  ): Promise<TransactionModel & WithObjectId> {
    const updateTransactionData: any = {
      updateTime: getCurrentTimestamp(),
    };
    await this.transactionModel.findOneAndUpdate(
      { accountId, _id: transactionId },
      { ...updateTransactionInput, ...updateTransactionData },
    );
    return this.getById(accountId, transactionId);
  }
}
