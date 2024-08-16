import { Controller, Post, Get, Param, Body, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ShareService } from './share.service';
import { CreateShareDto, UpdateShareDto } from './dto/share.dto';

@Controller('shares')
export class ShareController {
  constructor(private readonly shareService: ShareService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createShare(@Body() createShareDto: CreateShareDto) {
    return this.shareService.createShare(createShareDto);
  }

  @Get()
  async getAllShares() {
    return this.shareService.getAllShares();
  }

  @Get(':id')
  async getShareById(@Param('id') id: number) {
    return this.shareService.getShareById(id);
  }

  @Put(':id')
  async updateShare(@Param('id') id: number, @Body() updateShareDto: UpdateShareDto) {
    return this.shareService.updateShare(id, updateShareDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteShare(@Param('id') id: number) {
    return this.shareService.deleteShare(id);
  }
}
