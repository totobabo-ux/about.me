import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { Preloader } from "@/components/Preloader";
import { PRELOADER_KEY } from "@/components/preloader-key";
import { SmoothScroll } from "@/components/SmoothScroll";
import { getContent, hasLocale, IMAGES, locales } from "@/data/content";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getContent(lang);
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return {
    metadataBase: new URL(host ? `https://${host}` : "http://localhost:3000"),
    title: t.meta.title,
    description: t.meta.description,
    alternates: { languages: { ko: "/ko", en: "/en" } },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      images: [IMAGES.profileFull],
      locale: lang === "ko" ? "ko_KR" : "en_US",
      type: "website",
    },
  };
}

// 이번 세션에서 이미 로딩 화면을 봤다면 그리기 전에 숨김
const preloaderScript = `try{if(sessionStorage.getItem("${PRELOADER_KEY}"))document.documentElement.dataset.pl="1"}catch(e){}`;

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getContent(lang);

  return (
    <html lang={lang} className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preloaderScript }} />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>
        <Preloader words={t.preloader} />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
