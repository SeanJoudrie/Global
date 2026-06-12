import { CSSProperties } from "react";

export interface FlagChipProps {
  /** ISO 3166-1 alpha-2 code, e.g. "fr". */
  code: string;
  w?: number;
  h?: number;
  rounded?: string;
  /** Path to the self-hosted flag folder (relative to the page). */
  flagBase?: string;
  style?: CSSProperties;
}

/**
 * Flag image in a clean white frame, fully contained, with CDN fallbacks.
 */
export function FlagChip(props: FlagChipProps): JSX.Element;
