import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

export enum ButtonVariant {
  Dark = "dark",
  Outline = "outline",
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

type Props = ButtonProps & {
  variant: ButtonVariant;
};

const VARIANTS = {
  [ButtonVariant.Dark]: "bg-black text-white border-2 border-transparent",
  [ButtonVariant.Outline]:
    "border-2 border-black hover:bg-black hover:text-white",
};

export function Button(props: Props) {
  const { variant = ButtonVariant.Dark, ...restProps } = props;
  const variantClass = VARIANTS[variant];

  return (
    <button
      className={classNames(
        "rounded-full px-[14px] py-[2px] font-bold transition-colors",
        variantClass,
      )}
      {...restProps}
    />
  );
}
