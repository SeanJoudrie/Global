import { ReactNode, CSSProperties, ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  /** solid = filled accent · soft = tinted · outline = paper · ghost = text */
  variant?: "solid" | "soft" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  /** Any CSS color — defaults to the antique-gold accent. */
  accent?: string;
  /** Text colour to sit on a solid accent fill. */
  accentInk?: string;
  /** Show the brand's trailing → arrow. */
  trailingArrow?: boolean;
  /** Optional leading icon node (e.g. <LineIcon name="quickplay" />). */
  icon?: ReactNode;
  disabled?: boolean;
  style?: CSSProperties;
}

/**
 * Globalio pill button. Antique-gold by default; pass `accent` to recolour.
 * @startingPoint section="Core" subtitle="Pill buttons in every variant & accent" viewport="700x150"
 */
export function Button(props: ButtonProps): JSX.Element;
