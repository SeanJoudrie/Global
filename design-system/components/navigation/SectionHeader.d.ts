import { ReactNode, CSSProperties } from "react";

export interface SectionHeaderProps {
  title: string;
  /** Tick + label colour. */
  accent?: string;
  /** Right-aligned action (e.g. a "see all →" link). */
  action?: ReactNode;
  style?: CSSProperties;
}

/**
 * Tracked uppercase section label with a leading accent tick.
 */
export function SectionHeader(props: SectionHeaderProps): JSX.Element;
