import { ReactNode, CSSProperties } from "react";

export interface ModuleProgress {
  done: number;
  total: number;
}

export interface ModuleCardProps {
  icon?: ReactNode;
  title: string;
  subtitle: string;
  accent?: string;
  /** Show a progress ring instead of the trailing arrow; foils when complete. */
  progress?: ModuleProgress;
  onClick?: () => void;
  style?: CSSProperties;
}

/**
 * Full-width learning row: icon chip, title, subtitle + progress ring / arrow.
 * @startingPoint section="Cards" subtitle="Full-width module rows with progress" viewport="700x150"
 */
export function ModuleCard(props: ModuleCardProps): JSX.Element;
