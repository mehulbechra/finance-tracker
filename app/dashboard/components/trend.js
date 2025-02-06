import BaseTrend from "@/components/trend";
import { fetchTrend } from "@/lib/actions";

export default async function Trend({ type, range }) {
  const { data, error } = await fetchTrend(type, range);

  if (error) throw new Error("Could not fetch trend data");

  const amounts = data[0];
  return (
    <BaseTrend
      type={type}
      amount={amounts.current_amount}
      prevAmount={amounts.previous_amount}
    />
  );
}
