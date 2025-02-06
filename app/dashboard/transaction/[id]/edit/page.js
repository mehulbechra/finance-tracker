import TransactionForm from "@/app/dashboard/components/transaction-form";
import { getTransaction } from "@/lib/actions";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Transaction",
};

export default async function Page({ params }) {
  const id = (await params).id;
  const { data, error } = await getTransaction(id);
  if (error) {
    notFound();
  }

  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Edit Transaction</h1>
      <TransactionForm initialTransaction={data} />
    </>
  );
}
