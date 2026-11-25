"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/data/content";
import { cn } from "./cn";

/** 현재 경로를 유지한 채 언어만 바꾸는 토글 */
export function LangSwitch({ lang, className }: { lang: Locale; className?: string }) {
  const pathname = usePathname() ?? `/${lang}`;
  const rest = pathname.replace(/^\/(ko|en)(?=\/|$)/, "");
  return (
    <div className={cn("flex items-center gap-1 text-sm", className)}>
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="opacity-40">/</span>}
          <Link
            href={`/${l}${rest}`}
            aria-current={l === lang ? "true" : undefined}
            className={cn(
              "uppercase transition-opacity",
              l === lang ? "opacity-100" : "opacity-50 hover:opacity-100",
            )}
          >
            {l}
          </Link>
        </span>
      ))}
    </div>
  );
}
