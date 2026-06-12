export interface ProgressRingProps {
  done: number;
  total: number;
  /** Ring colour — defaults to the antique-gold accent. */
  accent?: string;
  size?: number;
  stroke?: number;
  /** Show the centred % readout. */
  label?: boolean;
}

/**
 * Circular completion meter with a monospaced % readout.
 */
export function ProgressRing(props: ProgressRingProps): JSX.Element;
