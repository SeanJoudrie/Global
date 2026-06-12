import { ReactNode, CSSProperties } from "react";

export interface HeroCardProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  accent?: string;
  /** Contained media slot on the right (e.g. a <FlagChip />). */
  media?: ReactNode;
  /** CTA pill label; omit for a non-CTA hero. */
  cta?: string;
  onClick?: () => void;
  minHeight?: number;
  style?: CSSProperties;
}

/**
 * Big image-led card for the Today tab: eyebrow, serif title, subtitle, CTA.
 * @startingPoint section="Cards" subtitle="Image-led hero card for the Today tab" viewport="700x200"
 */
export function HeroCard(props: HeroCardProps): JSX.Element;
