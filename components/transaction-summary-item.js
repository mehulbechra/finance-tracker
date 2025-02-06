import { useFormatCurrency } from "@/hooks/use-format-currency";

export default function TransactionSummaryItem({ date, amount }) {
  const formattedCurrency = useFormatCurrency(amount);
  return (
    <div className="flex text-gray-500 dark:text-gray-400 font-semibold">
      <div className="grow">{date}</div>
      <div className="min-w-[70px] text-right">{formattedCurrency}</div>
      <div className="min-w-[100px]"></div>
    </div>
  );
}
