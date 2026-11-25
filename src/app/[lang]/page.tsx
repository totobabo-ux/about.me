import { notFound } from "next/navigation";
import { Contact } from "@/components/Contact";
import { FloatingMenu } from "@/components/FloatingMenu";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Reveal, WordReveal } from "@/components/Reveal";
import { RoundButton } from "@/components/RoundButton";
import { SlidingImages } from "@/components/SlidingImages";
import { WorkList } from "@/components/WorkList";
import { getContent, hasLocale, PROFILE } from "@/data/content";

function Label({ children }: { children: string }) {
  return <p className="mb-8 text-xs label-track text-muted uppercase md:mb-14">{children}</p>;
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getContent(lang);

  return (
    <>
      <Header lang={lang} t={t} base="" />
      <FloatingMenu lang={lang} t={t} base="" />
      <main>
        <Hero t={t} />

        {/* 소개 */}
        <section id="about" className="mx-auto max-w-[1400px] px-6 pt-20 pb-12 md:px-16 md:pt-40 md:pb-56">
          <div className="grid gap-10 md:grid-cols-[1fr_280px] md:gap-20">
            <WordReveal text={t.intro.headline} className="text-2xl leading-[1.45] md:text-[2.6vw] md:leading-[1.35]" />
            <div className="relative">
              <Reveal delay={0.2}>
                <p className="text-[15px] leading-relaxed text-ink/70">{t.intro.side}</p>
              </Reveal>
              <div className="mt-14 md:absolute md:top-[115%] md:left-0 md:mt-0">
                <RoundButton href="#approach" className="size-36 bg-ink text-[15px] text-white md:size-44">
                  <span className="relative">{t.intro.button}</span>
                </RoundButton>
              </div>
            </div>
          </div>
        </section>

        {/* 일하는 방식 */}
        <section id="approach" className="mx-auto max-w-[1400px] px-6 py-16 md:px-16 md:py-32">
          <Label>{t.approach.label}</Label>
          <div className="grid gap-12 md:grid-cols-3 md:gap-10">
            {t.approach.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <p className="mb-8 border-b border-line pb-6 font-mono text-sm text-muted">0{i + 1}</p>
                <h3 className="mb-4 text-2xl font-medium md:text-3xl">{item.title}</h3>
                <p className="text-[15px] leading-relaxed text-ink/70">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 프로젝트 */}
        <section id="work" className="mx-auto max-w-[1400px] px-6 py-16 md:px-16 md:py-32">
          <Label>{t.work.label}</Label>
          <WorkList lang={lang} t={t} />
          <div className="mt-16 flex justify-center">
            <RoundButton href={PROFILE.github} external className="border border-line px-10 py-6 text-[15px] hover:text-white">
              <span className="relative">{t.work.more}</span>
            </RoundButton>
          </div>
        </section>

        {/* 경험 */}
        <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-16 md:py-32">
          <Label>{t.experience.label}</Label>
          <ul className="border-b border-line">
            {t.experience.items.map((item) => (
              <li key={item.title} className="grid gap-6 border-t border-line py-12 md:grid-cols-[1fr_1.2fr] md:gap-16">
                <Reveal>
                  <h3 className="text-3xl font-normal tracking-tight md:text-4xl">{item.title}</h3>
                  <p className="mt-3 text-[15px] text-muted">
                    {item.org} · {item.period}
                  </p>
                </Reveal>
                <Reveal delay={0.1}>
                  <ul className="flex flex-col gap-4 text-[15px] leading-relaxed text-ink/75">
                    {item.points.map((pt) => (
                      <li key={pt} className="flex gap-3">
                        <span className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-ink" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        {/* 기술 스택 + 학력 */}
        <section className="mx-auto grid max-w-[1400px] gap-16 px-6 py-16 md:gap-24 md:grid-cols-[1.4fr_1fr] md:px-16 md:py-32">
          <div>
            <Label>{t.skills.label}</Label>
            <div className="flex flex-col">
              {t.skills.groups.map((g) => (
                <Reveal key={g.name}>
                  <div className="grid gap-4 border-t border-line py-6 md:grid-cols-[160px_1fr]">
                    <span className="text-sm text-muted">{g.name}</span>
                    <div className="flex flex-wrap gap-2">
                      {g.items.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-line px-4 py-2 text-sm transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <Label>{t.education.label}</Label>
            <Reveal>
              <div className="border-t border-line pt-6">
                <h3 className="text-3xl font-normal tracking-tight">{t.education.school}</h3>
                <p className="mt-3 text-[15px]">{t.education.major}</p>
                <p className="mt-1 text-[15px] text-muted">{t.education.period}</p>
                <p className="mt-1 text-[15px] text-muted">{t.education.gpa}</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 지원 동기 / 목표 */}
        <section className="bg-paper-soft">
          <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-16 md:py-36">
            <Label>{t.goal.label}</Label>
            <div className="grid gap-8 md:grid-cols-2 md:gap-16">
              {t.goal.body.map((p, i) => (
                <WordReveal key={i} text={p} className="text-xl leading-relaxed md:text-2xl" />
              ))}
            </div>
          </div>
        </section>

        <SlidingImages lang={lang} projects={t.projects} />
      </main>
      <Contact t={t} />
    </>
  );
}
