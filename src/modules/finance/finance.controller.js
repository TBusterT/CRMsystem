@Controller('finance')
export class FinanceController {
  constructor(private financeService: FinanceService) {}

  @Post()
  create(dto: CreateFinanceDto) {
    return this.financeService.create(dto);
  }

  @Get()
  findAll() {
    return this.financeService.findAll();
  }

  @Get(':id')
  findOne(id: string) {
    return this.financeService.findOne(+id);
  }

  @Patch(':id')
  update(id: string, dto: UpdateFinanceDto) {
    return this.financeService.update(+id, dto);
  }

  @Delete(':id')
  remove(id: string) {
    return this.financeService.remove(+id);
  }
}
