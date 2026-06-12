import { ReactNode, CSSProperties } from "react";

export interface GameTileProps {
  icon?: ReactNode;
  title: string;
  subtitle: string;
  accent?: string;
  onClick?: () => void;
  /** Fixed width for carousels; pass "100%" for grids. */
  width?: number | string;
  style?: CSSProperties;
}

/**
 * Compact minigame tile for the Play arcade grids and swipeable rows.
 */
export function GameTile(props: GameTileProps): JSX.Element;
