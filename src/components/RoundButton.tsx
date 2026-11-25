import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "./cn";
import { Magnetic } from "./Magnetic";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  /** 호버 시 차오르는 색 */
  fill?: string;
  external?: boolean;
};

/** 원형/알약형 버튼 (마그네틱 + 호버 시 색 차오름) */
export function RoundButton({ href, children, className, fill, external }: Props) {
  const style = fill ? ({ "--fill": fill } as CSSProperties) : undefined;
  const classes = cn(
    "fill-hover flex items-center justify-center rounded-full transition-colors duration-300",
    className,
  );
  return (
    <Magnetic>
      {external ? (
        <a href={href} target="_blank" rel="noreferrer" className={classes} style={style}>
          {children}
        </a>
      ) : (
        <Link href={href} className={classes} style={style}>
          {children}
        </Link>
      )}
    </Magnetic>
  );
}
