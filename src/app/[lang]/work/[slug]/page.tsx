import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Contact } from "@/components/Contact";
import { FloatingMenu } from "@/components/FloatingMenu";
import { Header } from "@/components/Header";
import { Reveal, WordReveal } from "@/components/Reveal";
import { RoundButton } from "@/components/RoundButton";
import { content, getContent, hasLocale, locales } from "@/data/content";

export async function generateStaticParams() {
  return locales.flatMap((lang) => content[lang].projects.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const t = getContent(lang);
  const project = t.projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} | ${t.name}`,
    description: `${project.service} — ${project.role}`,
    openGraph: { images: [project.cover] },
  };
}

export default async function WorkDetail({ params }: PageProps<"/[lang]/work/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getContent(lang);
  const index = t.projects.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const project = t.projects[index];
  const next = t.projects[(index + 1) % t.projects.length];
  const base = `/${lang}`;

  const info = [
    { label: t.detail.service, value: project.service },
    { label: t.detail.role, value: project.role },
    { label: t.detail.team, value: project.team },
    { label: t.detail.period, value: project.period },
  ];

  return (
    <>
      <Header lang={lang} t={t} base={base} tone="dark" />
      <FloatingMenu lang={lang} t={t} base={base} />
      <main>
        {/* 타이틀 */}
        <section className="mx-auto max-w-[1400px] px-6 pt-44 md:px-16 md:pt-56">
          <Reveal>
            <p className="mb-6 text-xs label-track text-muted uppercase">{project.kind}</p>
            <h1 className="text-[18vw] leading-[0.9] font-normal tracking-tight md:text-[9vw]">{project.name}</h1>
          </Reveal>
          <div className="mt-16 grid gap-8 border-t border-line pt-8 md:mt-24 md:grid-cols-4">
            {info.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08}>
                <p className="mb-3 text-xs label-track text-muted uppercase">{item.label}</p>
                <p className="text-[15px] leading-relaxed">{item.value}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 대표 이미지 */}
        <section className="mx-auto mt-20 max-w-[1400px] px-6 md:px-16">
          <Reveal>
            <div className="flex aspect-[16/10] items-center justify-center md:aspect-[16/8]" style={{ background: project.color }}>
              <div className="relative h-[78%] w-[82%] overflow-hidden shadow-2xl">
                <Image src={project.gallery[0]} alt={`${project.name} screenshot`} fill priority sizes="(max-width: 1400px) 90vw, 1200px" className="object-cover" />
              </div>
            </div>
          </Reveal>
        </section>

        {/* 담당 기능 + 기술 스택 */}
        <section className="mx-auto grid max-w-[1400px] gap-16 px-6 py-24 md:grid-cols-2 md:px-16 md:py-32">
          <div>
            <p className="mb-8 text-xs label-track text-muted uppercase">{t.detail.features}</p>
            <ul className="border-b border-line">
              {project.features.map((f, i) => (
                <Reveal key={f} delay={i * 0.05}>
                  <li className="flex gap-6 border-t border-line py-5 text-lg">
                    <span className="font-mono text-sm leading-7 text-muted">0{i + 1}</span>
                    {f}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-8 text-xs label-track text-muted uppercase">{t.detail.stack}</p>
            <Reveal>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span key={s} className="rounded-full border border-line px-5 py-2.5 text-[15px]">
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* 문제 해결 */}
        <section className="bg-paper-soft">
          <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-16 md:py-36">
            <p className="mb-14 text-xs label-track text-muted uppercase">{t.detail.troubleshooting}</p>
            <div className="flex flex-col gap-24 md:gap-32">
              {project.issues.map((issue, i) => (
                <article key={issue.title} className="grid gap-10 md:grid-cols-[1fr_1.3fr] md:gap-16">
                  <div>
                    <p className="mb-5 font-mono text-sm text-muted">0{i + 1}</p>
                    <WordReveal text={issue.title} className="text-3xl leading-tight font-normal tracking-tight md:text-4xl" />
                  </div>
                  <Reveal delay={0.1}>
                    <ul className="flex flex-col gap-4 text-[15px] leading-relaxed text-ink/80">
                      {issue.points.map((pt) => (
                        <li key={pt} className="flex gap-3">
                          <span className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-ink" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                    {(issue.before || issue.after) && (
                      <div className="mt-10 grid gap-3 sm:grid-cols-2">
                        {issue.before && (
                          <div className="rounded-2xl border border-line bg-paper p-6">
                            <p className="mb-3 text-xs label-track text-muted uppercase">{t.detail.before}</p>
                            <p className="text-[15px] leading-relaxed">{issue.before}</p>
                          </div>
                        )}
                        {issue.after && (
                          <div className="rounded-2xl bg-accent p-6 text-white">
                            <p className="mb-3 text-xs label-track text-white/60 uppercase">{t.detail.after}</p>
                            <p className="text-[15px] leading-relaxed">{issue.after}</p>
                          </div>
                        )}
                      </div>
                    )}
                    {issue.result && (
                      <div className="mt-3 rounded-2xl bg-ink p-6 text-white">
                        <p className="mb-3 text-xs label-track text-white/50 uppercase">{t.detail.result}</p>
                        <p className="text-[15px] leading-relaxed">{issue.result}</p>
                      </div>
                    )}
                  </Reveal>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 추가 이미지 */}
        {project.gallery[1] && (
          <section className="mx-auto max-w-[1400px] px-6 pt-24 md:px-16 md:pt-32">
            <Reveal>
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image src={project.gallery[1]} alt={`${project.name} detail`} fill sizes="(max-width: 1400px) 90vw, 1200px" className="object-cover" />
              </div>
            </Reveal>
          </section>
        )}

        {/* 저장소 + 다음 프로젝트 */}
        <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-16 md:py-36">
          <div className="mb-24 flex justify-center">
            <RoundButton href={project.github} external className="border border-line px-10 py-6 text-[15px] hover:text-white">
              <span className="relative">{t.detail.repo} ↗</span>
            </RoundButton>
          </div>
          <Link href={`/${lang}/work/${next.slug}`} className="group block border-t border-line pt-10 text-center">
            <p className="mb-6 text-xs label-track text-muted uppercase">{t.detail.next}</p>
            <p className="text-[16vw] leading-none tracking-tight transition-opacity duration-300 group-hover:opacity-50 md:text-[9vw]">
              {next.name}
            </p>
          </Link>
          <div className="mt-16 flex justify-center">
            <RoundButton href={`/${lang}#work`} className="bg-ink px-10 py-6 text-[15px] text-white">
              <span className="relative">{t.detail.back}</span>
            </RoundButton>
          </div>
        </section>
      </main>
      <Contact t={t} />
    </>
  );
}
