import { ReactNode, CSSProperties, ElementType } from "react";

export interface CardProps {
  children?: ReactNode;
  /** Accent that tints the watercolour hover wash. */
  accent?: string;
  /** Enable the hover lift + wash even without onClick. */
  interactive?: boolean;
  /** Override the rendered tag (defaults to button when onClick is set). */
  as?: ElementType;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

/**
 * Paper-stock surface with hairline border, soft shadow & watercolour hover wash.
 * @startingPoint section="Core" subtitle="Paper card surface with watercolour wash" viewport="700x180"
 */
export function Card(props: CardProps): JSX.Element;
