import { useFormStatus } from "react-dom";
import Button from "./button";
import { Loader } from "lucide-react";

export default function SubmitButton(props) {
  return (
    <Button
      {...props}
      className={`flex items-center space-x-1 justify-center ${props.className}`}
    >
      {props.disabled ? <Loader className="animate-spin w-4 h-4" /> : undefined}
      <span>{props.children}</span>
    </Button>
  );
}
