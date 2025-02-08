import Alert from "./alert";
import { Check } from "lucide-react";

export default function AlertSuccess({ message }) {
  return (
    <Alert
      icon={<Check className="w-6 h-6 text-green-700 dark:text-green-300" />}
      title={
        <span className="text-green-700 dark:text-green-300">Success</span>
      }
    >
      <span className="text-green-700 dark:text-green-300">{message}</span>
    </Alert>
  );
}
