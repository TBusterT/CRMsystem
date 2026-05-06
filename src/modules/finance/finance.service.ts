import { Injectable } from '@nestjs/common';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';

type Finance = {
  id: number;
  amount: number;
  type: 'income' | 'expense';
  description: string;
  createdAt: Date;
};

@Injectable()
export class FinanceService {
  private finances: Finance[] = [];

  create(createFinanceDto: CreateFinanceDto) {
    const newItem: Finance = {
      id: Date.now(),
      ...createFinanceDto,
      createdAt: new Date(),
    };

    this.finances.push(newItem);
    return newItem;
  }

  findAll() {
    return this.finances;
  }

  findOne(id: number) {
    return this.finances.find(item => item.id === id);
  }

  update(id: number, updateFinanceDto: UpdateFinanceDto) {
    const index = this.finances.findIndex(item => item.id === id);

    if (index === -1) {
      return null;
    }

    this.finances[index] = {
      ...this.finances[index],
      ...updateFinanceDto,
    };

    return this.finances[index];
  }

  remove(id: number) {
    const index = this.finances.findIndex(item => item.id === id);

    if (index === -1) {
      return null;
    }

    const removed = this.finances.splice(index, 1);
    return removed[0];
  }
}
