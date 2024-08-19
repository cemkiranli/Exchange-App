import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Share } from '../models/share.model';

@Injectable()
export class ShareSeeder {
  constructor(@InjectModel(Share) private readonly shareModel: typeof Share) {}

  async seed() {
    const shares = [
      { symbol: 'APL', price: 12 },
      { symbol: 'GOL', price: 13 },
      { symbol: 'AMZ', price: 15 },
      { symbol: 'MSF', price: 20 },
    ];

    for (const share of shares) {
      await this.shareModel.create(share);
    }
  }
}
