import { Test, TestingModule } from '@nestjs/testing';
import { FinanceController } from './finance.controller';
import { FinanceService } from './finance.service';

describe('FinanceController', () => {
  let controller: FinanceController;
  let service: FinanceService;

  const mockFinanceService = {
    create: jest.fn((dto) => ({ id: 1, ...dto })),
    findAll: jest.fn(() => []),
    findOne: jest.fn((id) => ({ id, amount: 100 })),
    update: jest.fn((id, dto) => ({ id, ...dto })),
    remove: jest.fn((id) => ({ deleted: true, id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinanceController],
      providers: [
        {
          provide: FinanceService,
          useValue: mockFinanceService,
        },
      ],
    }).compile();

    controller = module.get<FinanceController>(FinanceController);
    service = module.get<FinanceService>(FinanceService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create finance record', () => {
    expect(
      controller.create({
        amount: 100,
        type: 'income',
        description: 'test',
      }),
    ).toEqual({
      id: 1,
      amount: 100,
      type: 'income',
      description: 'test',
    });
  });

  it('should return all finances', () => {
    expect(controller.findAll()).toEqual([]);
  });

  it('should return one finance', () => {
    expect(controller.findOne('1')).toEqual({ id: '1', amount: 100 });
  });

  it('should update finance', () => {
    expect(
      controller.update('1', {
        amount: 200,
        type: 'expense',
        description: 'updated',
      }),
    ).toEqual({
      id: '1',
      amount: 200,
      type: 'expense',
      description: 'updated',
    });
  });

  it('should remove finance', () => {
    expect(controller.remove('1')).toEqual({
      deleted: true,
      id: '1',
    });
  });
});
