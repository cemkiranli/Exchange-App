import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Share } from '../models/share.model';
import { CreateShareDto, UpdateShareDto } from './dto/share.dto';

@Injectable()
export class ShareService {
  constructor(
    @InjectModel(Share) private readonly shareModel: typeof Share,
  ) {}

  async createShare(createShareDto: CreateShareDto): Promise<Share> {
    const existingShare = await this.shareModel.findOne({
      where: { symbol: createShareDto.symbol },
    });

    if (existingShare) {
      throw new BadRequestException('Share with this symbol already exists.');
    }

    return this.shareModel.create(createShareDto);
  }

  async getAllShares(): Promise<Share[]> {
    return this.shareModel.findAll();
  }

  async getShareById(id: number): Promise<Share> {
    const share = await this.shareModel.findByPk(id);
    if (!share) {
      throw new NotFoundException('Share not found.');
    }
    return share;
  }

  async updateShare(id: number, updateShareDto: UpdateShareDto): Promise<Share> {
    const [numberOfAffectedRows, [updatedShare]] = await this.shareModel.update(updateShareDto, {
      where: { id },
      returning: true,
    });

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException('Share not found.');
    }

    return updatedShare;
  }

  async deleteShare(id: number): Promise<void> {
    const deletedCount = await this.shareModel.destroy({ where: { id } });
    if (deletedCount === 0) {
      throw new NotFoundException('Share not found.');
    }
  }
}
