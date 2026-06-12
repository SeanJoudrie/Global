import { ReactNode, CSSProperties, HTMLAttributes } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  /** Any CSS color — defaults to the antique-gold accent. */
  accent?: string;
  tone?: "soft" | "solid" | "outline";
  /** Render the uppercase micro-label style with a leading ◦ marker. */
  eyebrow?: boolean;
  style?: CSSProperties;
}

/**
 * Small label chip — region tags, status pills, and uppercase eyebrows.
 */
export function Badge(props: BadgeProps): JSX.Element;
