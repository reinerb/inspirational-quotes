import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  icon?: ReactNode;
};

export default function Button({
  title,
  icon,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        "min-w-32 border-2 border-indigo-500 bg-indigo-600 px-4 py-1 transition-colors duration-75 hover:bg-indigo-500 focus:bg-indigo-500 active:bg-indigo-400",
        className,
      )}
      {...props}
    >
      {icon && icon}
      {title}
    </button>
  );
}
