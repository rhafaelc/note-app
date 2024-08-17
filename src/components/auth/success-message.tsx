import { Check } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

export function SuccessMessage(props: { message: string }) {
  return (
    <Alert>
      <Check className="h-4 w-4" />
      <AlertDescription>{props.message}</AlertDescription>
    </Alert>
  );
}
