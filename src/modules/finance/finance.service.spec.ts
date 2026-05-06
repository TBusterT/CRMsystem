import { Test, TestingModule } from '@nestjs/testing';
import { FinanceService } from './finance.service';

describe('FinanceService', () => {
  let service: FinanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinanceService],
    }).compile();

    service = module.get<FinanceService>(FinanceService);
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create finance record', () => {
    const dto = {
      amount: 100,
      type: 'income' as const,
      description: 'test income',
    };

    const result = service.create(dto);

    expect(result).toEqual(
      expect.objectContaining({
        amount: 100,
        type: 'income',
        description: 'test income',
      }),
    );
  });

  it('should return all records', () => {
    service.create({
      amount: 100,
      type: 'income',
      description: 'a',
    });

    const all = service.findAll();

    expect(all.length).toBeGreaterThan(0);
  });

  it('should return one record by id', () => {
    const created = service.create({
      amount: 200,
      type: 'expense',
      description: 'b',
    });

    const found = service.findOne(created.id);

    expect(found).toBeDefined();
    expect(found.id).toBe(created.id);
  });

  it('should update record', () => {
    const created = service.create({
      amount: 300,
      type: 'income',
      description: 'c',
    });

    const updated = service.update(created.id, {
      amount: 999,
      type: 'expense',
      description: 'updated',
    });

    expect(updated.amount).toBe(999);
    expect(updated.type).toBe('expense');
  });

  it('should remove record', () => {
    const created = service.create({
      amount: 400,
      type: 'income',
      description: 'd',
    });

    const removed = service.remove(created.id);

    expect(removed).toBeDefined();
  });
});
