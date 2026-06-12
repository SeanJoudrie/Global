import { ReactNode, CSSProperties } from "react";

export interface StatPillProps {
  icon?: ReactNode;
  value: ReactNode;
  label: string;
  accent?: string;
  /** Larger value type for hero metrics. */
  big?: boolean;
  style?: CSSProperties;
}

/**
 * One metric: big tabular value + uppercase micro label + accent spine.
 */
export function StatPill(props: StatPillProps): JSX.Element;
