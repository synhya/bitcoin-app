import React from "react";
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";

// interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   children?: React.ReactNode;
// }

interface InputProps extends React.ComponentProps<"input"> {
  children?: React.ReactNode;
}

// { children,className,...rest }
function MyGenericInput(props: InputProps) {
  const className = cn("border rounded px-2 py-1", props.className);
  return <input {...props} className={className} />;
}

function MySlightlyModifiedInput(props: InputProps) {
  return <MyGenericInput {...props} className="p-3" />;
}
