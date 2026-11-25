import Image from "next/image";
import { IMAGES, PROFILE, type Content } from "@/data/content";
import { LocalTime } from "./LocalTime";
import { Reveal } from "./Reveal";
import { RoundButton } from "./RoundButton";

/** 하단 연락처 영역 (전화번호는 노출하지 않음) */
export function Contact({ t }: { t: Content }) {
  return (
    <footer id="contact" className="relative bg-ink text-white">
      <div className="mx-auto max-w-[1400px] px-6 pt-40 md:px-16 md:pt-52">
        <Reveal>
          <div className="flex items-center gap-5 md:gap-8">
            <span className="relative size-16 shrink-0 overflow-hidden rounded-full md:size-24">
              <Image src={IMAGES.profileAvatar} alt={t.name} fill sizes="96px" className="object-cover object-top" />
            </span>
            <h2 className="text-5xl leading-none font-normal tracking-tight md:text-[6.5vw]">{t.contact.title[0]}</h2>
          </div>
          <h2 className="mt-2 text-5xl leading-none font-normal tracking-tight md:text-[6.5vw]">{t.contact.title[1]}</h2>
        </Reveal>

        <div className="relative mt-20 border-b border-white/20 md:mt-24">
          <div className="absolute right-[6%] -translate-y-1/2 md:right-[10%]">
            <RoundButton
              href={`mailto:${PROFILE.email}`}
              className="size-32 bg-accent text-[15px] text-white md:size-44"
              fill="#2a3fc9"
              external
            >
              {t.contact.button}
            </RoundButton>
          </div>
          <svg viewBox="0 0 24 24" className="absolute top-[-120px] right-[2%] hidden size-8 md:block" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
            <path d="M5 5l14 14M19 8v11H8" />
          </svg>
        </div>

        <div className="mt-28 flex flex-wrap gap-3 md:mt-24">
          <RoundButton href={`mailto:${PROFILE.email}`} className="border border-white/30 px-8 py-6 text-[15px]" fill="#3b5bfd" external>
            <span className="relative">{PROFILE.email}</span>
          </RoundButton>
          <RoundButton href={PROFILE.github} className="border border-white/30 px-8 py-6 text-[15px]" fill="#3b5bfd" external>
            <span className="relative">github.com/totobabo-ux</span>
          </RoundButton>
        </div>

        <div className="mt-28 flex flex-col gap-8 pb-8 text-sm md:mt-40 md:flex-row md:items-end md:justify-between">
          <div className="flex gap-10">
            <div>
              <p className="mb-3 text-[11px] label-track text-white/40 uppercase">{t.contact.version}</p>
              <p>2026 © Edition</p>
            </div>
            <div>
              <p className="mb-3 text-[11px] label-track text-white/40 uppercase">{t.contact.localTime}</p>
              <LocalTime timeZone={PROFILE.timeZone} />
            </div>
          </div>
          <div>
            <p className="mb-3 text-[11px] label-track text-white/40 uppercase">{t.contact.socials}</p>
            <div className="flex gap-6">
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="dot-link">
                GitHub
              </a>
              <a href={PROFILE.siteRepo} target="_blank" rel="noreferrer" className="dot-link">
                Source
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
