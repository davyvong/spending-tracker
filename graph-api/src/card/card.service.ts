import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WithObjectId } from 'src/common/types/with-object-id.type';
import { getCurrentTimestamp } from 'src/common/utils/date.util';

import { NewCardInput } from './dto/new-card.input';
import { UpdateCardInput } from './dto/update-card.input';
import { CardModel } from './models/card.model';

@Injectable()
export class CardService {
  constructor(@InjectModel('cards') private readonly cardModel) {}

  async create(accountId: string, newCardInput: NewCardInput): Promise<CardModel & WithObjectId> {
    const newCardData: any = {
      accountId,
      createTime: getCurrentTimestamp(),
    };
    newCardData.updateTime = newCardData.createTime;
    return this.cardModel.create({
      ...newCardInput,
      ...newCardData,
    });
  }

  async deleteById(accountId: string, cardId: string): Promise<boolean> {
    try {
      await this.cardModel.findOneAndRemove({ accountId, _id: cardId });
      return true;
    } catch (error) {
      return false;
    }
  }

  async getAll(): Promise<CardModel[]> {
    return this.cardModel.find();
  }

  async getById(accountId: string, cardId: string): Promise<CardModel & WithObjectId> {
    return this.cardModel.findOne({ accountId, _id: cardId });
  }

  async updateById(
    accountId: string,
    cardId: string,
    updateCardInput: UpdateCardInput,
  ): Promise<CardModel & WithObjectId> {
    const updateCardData: any = {
      updateTime: getCurrentTimestamp(),
    };
    await this.cardModel.findOneAndUpdate({ accountId, _id: cardId }, { ...updateCardInput, ...updateCardData });
    return this.getById(accountId, cardId);
  }
}
