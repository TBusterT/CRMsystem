import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './inventory.entity';

@Injectable()
export class InventoryService {
  constructor(
      @InjectRepository(Product)
      private readonly inventoryRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.inventoryRepository.find({ order: { createdAt: 'DESC' } });
  }

  async getStats() {
    const products = await this.inventoryRepository.find();

    let totalItems = 0;
    let totalValue = 0;
    const categoriesSet = new Set<string>();

    products.forEach(p => {
      totalItems += p.stock;
      totalValue += Number(p.price) * p.stock; 
      categoriesSet.add(p.category);
    });

    return {
      totalItems,
      totalValue,
      totalCategories: categoriesSet.size
    };
  }
}