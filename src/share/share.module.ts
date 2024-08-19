import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Share } from '../models/share.model';
import { ShareService } from './share.service';
import { ShareController } from './share.controller';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [SequelizeModule.forFeature([Share]), ScheduleModule.forRoot(),],
    providers:[ShareService],
    controllers:[ShareController]
})
export class ShareModule {}
