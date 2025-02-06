import { deleteTransaction } from "@/lib/actions";
import Button from "./button";
import { Loader, X } from "lucide-react";
import { useState } from "react";

export default function TransactionItemRemoveButton({ id, onDelete }) {
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleClick = async () => {
    if (!confirmed) {
      setConfirmed(true);
      return;
    }
    try {
      setLoading(true);
      await deleteTransaction(id);
      onDelete();
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      size="xs"
      variant={confirmed ? "danger" : "ghost"}
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? (
        <Loader className="animate-spin w-4 h-4" />
      ) : (
        <X className="w-4 h-4" />
      )}
    </Button>
  );
}
