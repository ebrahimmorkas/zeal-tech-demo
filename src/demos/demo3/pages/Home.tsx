import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BRAND } from '../../../data/brand';
import { about, timeline } from '../../../data/about';
import { groupCompanies } from '../../../data/groupCompanies';
import { chairman, leaders } from '../../../data/leadership';
import { news, formatDate } from '../../../data/news';
import { partnershipTypes } from '../../../data/partnerships';
import { Fade, Figure, Kicker, Note, Ornament, P, Page, ROMAN, ReadLink, Rule, Serif, SolidLink, useMeta } from '../ui';

export default function Home() {
  useMeta('Home', `${BRAND.name} — a group of enterprises defined by reputation, leadership and long-term relationships.`);
  const [active, setActive] = useState(0);
  const journal = news.filter((n) => n.category !== 'Video');

  return (
    <>
      {/* COVER */}
      <section className="pt-12 lg:pt-16 pb-20 lg:pb-28">
        <Page className="grid lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="lg:col-span-7 flex flex-col">
            <Kicker>The Cover Story · Sample Edition</Kicker>
            <motion.h1
              className="mt-8 font-d3-serif font-light tracking-[-0.03em] leading-[0.95] text-[58px] sm:text-[92px] xl:text-[124px]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              The quiet strength of <em className="text-d3-oxblood">enduring</em> enterprise.
            </motion.h1>
            <div className="mt-auto pt-12 grid sm:grid-cols-[1.4fr_1fr] gap-10 items-end">
              <p className="font-d3-serif text-[21px] leading-[1.55] text-d3-ink/85">
                For more than two decades*, {BRAND.shortName} has built companies the patient way — investing in people, standards and relationships that outlast any single cycle.
              </p>
              <div>
                <p className="font-d3-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-d3-taupe">In this edition</p>
                <ol className="mt-3 space-y-1.5 font-d3-serif text-[17px]">
                  {[
                    ['A letter from the Chairman', '#letter'],
                    ['The companies', '#companies'],
                    ['Chapters of our history', '#chapters'],
                    ['From the journal', '#journal'],
                  ].map(([t, h], i) => (
                    <li key={h}>
                      <a href={h} className="flex gap-3 hover:text-d3-oxblood">
                        <span className="italic text-d3-taupe w-6">{ROMAN[i]}.</span> {t}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
          <motion.div className="lg:col-span-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6, delay: 0.2 }}>
            <Figure src="/images/office-window.jpg" alt="Calm, light-filled office with plants beside floor-to-ceiling windows" caption="Fig. 1 — A place for considered work (representative image)" imgClass="aspect-[4/5] lg:aspect-[3/4]" />
          </motion.div>
        </Page>
      </section>

      {/* LETTER */}
      <section id="letter" className="scroll-mt-20 bg-d3-cream border-y border-d3-rule py-24 lg:py-32">
        <Page className="grid lg:grid-cols-12 gap-12">
          <Fade className="lg:col-span-4">
            <Kicker>I. A Letter from the Chairman</Kicker>
            <Figure src={chairman.portrait} alt={`${chairman.name} (placeholder portrait)`} caption={`${chairman.name}, ${chairman.role} — fictional placeholder`} className="mt-8 max-w-[340px]" imgClass="aspect-[4/5] grayscale" />
          </Fade>
          <Fade delay={0.1} className="lg:col-span-8">
            <Serif className="text-[40px] sm:text-[60px]">
              “{chairman.quote}”
            </Serif>
            <div className="mt-10 md:columns-2 gap-12 text-[17px] leading-[1.8] text-d3-ink/85 [&>p+p]:mt-5">
              {about.chairmanMessage.paragraphs.map((p, i) => (
                <p key={p} className={i === 0 ? 'first-letter:float-left first-letter:font-d3-serif first-letter:text-[84px] first-letter:leading-[0.8] first-letter:mr-3 first-letter:mt-1 first-letter:text-d3-oxblood' : ''}>
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
              <p className="font-d3-serif italic text-[30px] text-d3-oxblood">{chairman.name.split(' ')[0]} {chairman.name.split(' ')[1][0]}.</p>
              <ReadLink to={`${P.about}#letters`}>Continue reading</ReadLink>
            </div>
          </Fade>
        </Page>
      </section>

      {/* CHAPTERS */}
      <section id="chapters" className="scroll-mt-20 py-24 lg:py-32">
        <Page>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Kicker>II. Chapters</Kicker>
              <Serif className="mt-5 text-[44px] sm:text-[64px]">
                A history written <em>patiently</em>.
              </Serif>
            </div>
            <ReadLink to={`${P.about}#chapters`}>The full chronology</ReadLink>
          </div>
          <ol className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 border-t border-d3-ink">
            {[timeline[0], timeline[2], timeline[4], timeline[7]].map((t, i) => (
              <li key={t.year} className={`pt-8 pb-4 sm:pr-8 ${i > 0 ? 'lg:border-l lg:pl-8' : ''} border-d3-rule`}>
                <Fade delay={i * 0.1}>
                  <p className="font-d3-serif font-light text-[76px] leading-none text-d3-ink/90">{t.year}</p>
                  <p className="mt-4 font-d3-serif italic text-[22px]">{t.title}</p>
                  <p className="mt-2 text-[15px] text-d3-taupe">{t.description}</p>
                </Fade>
              </li>
            ))}
          </ol>
          <div className="mt-6">
            <Note>Years shown are illustrative placeholders.</Note>
          </div>
        </Page>
      </section>

      {/* COMPANIES INDEX */}
      <section id="companies" className="scroll-mt-20 bg-d3-ink text-d3-paper py-24 lg:py-32">
        <Page className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Kicker className="!text-[#c48b7d]">III. The Companies</Kicker>
            <h2 className="mt-5 font-d3-serif font-light text-[44px] sm:text-[60px] leading-[1.02] tracking-[-0.02em]">
              Six houses, <em>one name.</em>
            </h2>
            <div className="mt-10 hidden lg:block relative aspect-[4/5] overflow-hidden">
              {groupCompanies.map((c, i) => (
                <img key={c.slug} src={c.image.sm} alt="" aria-hidden className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${active === i ? 'opacity-100' : 'opacity-0'}`} />
              ))}
            </div>
          </div>
          <ol className="lg:col-span-7 lg:pt-28 border-t border-d3-paper/20">
            {groupCompanies.map((c, i) => (
              <li key={c.slug} className="border-b border-d3-paper/20" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>
                <Link to={P.company(c.slug)} className="group grid grid-cols-[48px_1fr] gap-4 py-7 focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#c48b7d]">
                  <span className="font-d3-serif italic text-[18px] text-d3-paper/50 pt-2">{ROMAN[i]}</span>
                  <span>
                    <span className={`block font-d3-serif font-light text-[32px] sm:text-[42px] leading-[1.05] transition-colors ${active === i ? 'text-d3-paper' : 'text-d3-paper/60'} group-hover:text-d3-paper`}>{c.shortName}</span>
                    <span className="block mt-2 text-[14px] text-d3-paper/55">
                      {c.sector} — <span className="italic font-d3-serif">{c.tagline}</span>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </Page>
      </section>

      {/* IMAGE ESSAY */}
      <section className="relative">
        <img src="/images/wind-hills.jpg" alt="Wind turbines across rolling green hills under soft light" className="w-full h-[70vh] min-h-[420px] object-cover" loading="lazy" />
        <Page className="relative -mt-40 sm:-mt-56">
          <Fade className="bg-d3-paper max-w-3xl p-10 sm:p-16 ml-auto">
            <Kicker>IV. On Stewardship</Kicker>
            <p className="mt-6 font-d3-serif font-light text-[30px] sm:text-[40px] leading-[1.2]">
              “{about.philosophy[0]}”
            </p>
            <p className="mt-6 text-d3-taupe">{about.whyWeExist}</p>
          </Fade>
        </Page>
      </section>

      {/* JOURNAL */}
      <section id="journal" className="scroll-mt-20 py-24 lg:py-32">
        <Page>
          <div className="text-center">
            <Kicker>V. From the Journal</Kicker>
            <Serif className="mt-5 text-[44px] sm:text-[64px]">News & perspectives</Serif>
          </div>
          <div className="mt-16 grid lg:grid-cols-12 gap-10 lg:gap-12">
            <Fade className="lg:col-span-7">
              <Link to={P.article(journal[0].slug)} className="group block">
                <Figure src={journal[0].image.src} alt={journal[0].image.alt} imgClass="aspect-[4/3]" />
                <p className="mt-6 font-d3-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-d3-oxblood">{journal[0].category} · {formatDate(journal[0].date)}</p>
                <h3 className="mt-3 font-d3-serif font-light text-[34px] sm:text-[42px] leading-[1.08] group-hover:text-d3-oxblood transition-colors">{journal[0].title}</h3>
                <p className="mt-3 text-d3-taupe">{journal[0].excerpt}</p>
              </Link>
            </Fade>
            <div className="lg:col-span-5 flex flex-col gap-10">
              {journal.slice(1, 3).map((n, i) => (
                <Fade key={n.slug} delay={0.1 * (i + 1)}>
                  <Link to={P.article(n.slug)} className="group grid grid-cols-[1fr_140px] gap-6">
                    <span>
                      <span className="block font-d3-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-d3-oxblood">{n.category}</span>
                      <span className="block mt-2 font-d3-serif text-[24px] leading-[1.15] group-hover:text-d3-oxblood transition-colors">{n.title}</span>
                      <span className="block mt-2 font-d3-serif italic text-[14px] text-d3-taupe">{formatDate(n.date)}</span>
                    </span>
                    <img src={n.image.sm} alt="" className="w-full aspect-[3/4] object-cover" loading="lazy" />
                  </Link>
                </Fade>
              ))}
              <Rule />
              <Fade>
                <Link to={P.article(journal[3].slug)} className="group block">
                  <span className="block font-d3-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-d3-oxblood">{journal[3].category}</span>
                  <span className="block mt-2 font-d3-serif italic text-[28px] leading-[1.15] group-hover:text-d3-oxblood transition-colors">{journal[3].title}</span>
                  <span className="block mt-2 text-[15px] text-d3-taupe">{journal[3].excerpt}</span>
                </Link>
              </Fade>
              <ReadLink to={P.news}>The full journal</ReadLink>
            </div>
          </div>
        </Page>
      </section>

      {/* PORTRAITS */}
      <section className="bg-d3-cream border-y border-d3-rule py-24">
        <Page>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Kicker>VI. The Stewards</Kicker>
              <Serif className="mt-5 text-[40px] sm:text-[56px]">Leadership</Serif>
            </div>
            <ReadLink to={P.leadership}>Meet the board</ReadLink>
          </div>
          <ul className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {leaders.slice(0, 6).map((l, i) => (
              <li key={l.id} className={i % 2 ? 'lg:mt-12' : ''}>
                <Fade delay={i * 0.06}>
                  <img src={l.portrait} alt={`${l.name} (placeholder portrait)`} className="w-full aspect-[3/4] object-cover object-top grayscale hover:grayscale-0 transition duration-700" loading="lazy" />
                  <p className="mt-3 font-d3-serif italic text-[18px] leading-tight">{l.name}</p>
                  <p className="text-[12px] text-d3-taupe">{l.role}</p>
                </Fade>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Note>All profiles are fictional placeholders.</Note>
          </div>
        </Page>
      </section>

      {/* CORRESPONDENCE */}
      <section className="py-24 lg:py-32">
        <Page className="max-w-4xl text-center">
          <Kicker>VII. An Invitation</Kicker>
          <Serif className="mt-6 text-[44px] sm:text-[68px]">
            Relationships are the <em className="text-d3-oxblood">enterprise</em>.
          </Serif>
          <p className="mt-8 font-d3-serif text-[21px] leading-[1.6] text-d3-ink/80">
            We welcome conversations with distributors, manufacturers, technology innovators, investors and suppliers who share a long view.
          </p>
          <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 font-d3-serif italic text-[18px] text-d3-taupe">
            {partnershipTypes.map((p) => (
              <li key={p.id}>
                <Link to={P.partnerType(p.id)} className="hover:text-d3-oxblood">
                  {p.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap justify-center gap-6 items-center">
            <SolidLink to={P.partner}>Begin a conversation</SolidLink>
            <ReadLink to={P.contact}>Write to us</ReadLink>
          </div>
          <div className="mt-20">
            <Ornament />
          </div>
        </Page>
      </section>
    </>
  );
}
