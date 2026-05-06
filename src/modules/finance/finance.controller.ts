import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';

import { FinanceService } from './finance.service';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';

@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Post()
  create(@Body() createFinanceDto: CreateFinanceDto) {
    return this.financeService.create(createFinanceDto);
  }

  @Get()
  findAll() {
    return this.financeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const item = this.financeService.findOne(+id);

    if (!item) {
      throw new NotFoundException(`Finance with id ${id} not found`);
    }

    return item;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFinanceDto: UpdateFinanceDto,
  ) {
    const updated = this.financeService.update(+id, updateFinanceDto);

    if (!updated) {
      throw new NotFoundException(`Finance with id ${id} not found`);
    }

    return updated;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const removed = this.financeService.remove(+id);

    if (!removed) {
      throw new NotFoundException(`Finance with id ${id} not found`);
    }

    return removed;
  }
}
