import Alert from "./alert";
import { Ban } from "lucide-react";

export default function AlertError({ message }) {
  return (
    <Alert
      icon={<Ban className="w-6 h-6 text-red-700 dark:text-red-300" />}
      title={<span className="text-red-700 dark:text-red-300">Error</span>}
    >
      <span className="text-red-700 dark:text-red-300">{message}</span>
    </Alert>
  );
}
