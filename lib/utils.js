export const groupAndSumTransactionsByDate = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    const date = transaction.created_at.split("T")[0];
    if (!acc[date]) {
      acc[date] = { transactions: [], amount: 0 };
    }
    acc[date].transactions.push(transaction);
    const amount =
      transaction.type === "Expense" ? -transaction.amount : transaction.amount;
    acc[date].amount += amount;
    return acc;
  }, {});
};
