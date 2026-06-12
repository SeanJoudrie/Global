import { ReactNode, CSSProperties } from "react";

export interface TabItem {
  key: string;
  label: string;
  glyph: string;
  accent: string;
}

export interface TabBarProps {
  active: string;
  onChange?: (key: string) => void;
  /** Override the five default destinations. */
  tabs?: TabItem[];
  /** Draw an icon for a tab. Return any node. */
  renderIcon?: (glyph: string, active: boolean, color: string) => ReactNode;
  /** Fix to viewport bottom (default true). */
  fixed?: boolean;
  style?: CSSProperties;
}

/**
 * Fixed bottom tab bar — Today · Learn · Play · Codex · You.
 */
export function TabBar(props: TabBarProps): JSX.Element;
