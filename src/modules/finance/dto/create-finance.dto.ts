export class CreateFinanceDto {
  amount: number;
  type: "income" | "expense";
  description: string;
}
