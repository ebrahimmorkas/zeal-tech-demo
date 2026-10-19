import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { about, coreValues, sampleStats } from '../../../data/about';
import { groupCompanies } from '../../../data/groupCompanies';
import { news, formatDate } from '../../../data/news';
import { roadmap } from '../../../data/roadmap';
import { gallery } from '../../../data/gallery';
import { ICONS } from '../../../lib/icons';
import { Rings } from '../Rings';
import { Arch, Go, Grow, Kicker, Leaf, Note, P, Serif, Wave, Wrap, useMeta } from '../ui';

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -130]);
  return (
    <section ref={ref} className="relative bg-d7-lichen overflow-hidden">
      <Leaf className="absolute left-[6%] top-24 w-10 opacity-70 hidden md:block" />
      <Leaf className="absolute right-[7%] top-12 w-6 opacity-50 [animation-delay:-4s]" color="#2c5640" />
      <Wrap className="pt-12 lg:pt-20 text-center">
        <Grow>
          <Kicker>A group rooted in the long term</Kicker>
          <Serif as="h1" className="mt-6 mx-auto max-w-5xl text-[54px] sm:text-[84px] lg:text-[112px] text-d7-forest">
            Enterprises that <em>grow</em> like forests.
          </Serif>
          <p className="mt-6 mx-auto max-w-2xl text-[19px] leading-relaxed text-d7-soil">
            Patient capital, careful stewardship and companies that strengthen the industries, places and people around them.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Go to={P.about}>Our roots</Go>
            <Go to={P.companies} tone="ghost">
              Meet the companies
            </Go>
          </div>
        </Grow>
      </Wrap>
      <Wrap className="mt-14 lg:mt-20">
        <div className="grid grid-cols-3 gap-3 sm:gap-6 items-end">
          <motion.div style={{ y: y1 }}>
            <Arch src="/images/lab-glass-sm.jpg" alt="Scientist examining glassware in a laboratory" imgClass="aspect-[3/4]" delay={0.2} />
          </motion.div>
          <motion.div style={{ y: y2 }}>
            <Arch src="/images/wind-sunset.jpg" alt="Wind turbines silhouetted at sunset" imgClass="aspect-[3/5]" />
          </motion.div>
          <motion.div style={{ y: y1 }}>
            <Arch src="/images/team-work-sm.jpg" alt="Colleagues collaborating around a table" imgClass="aspect-[3/4]" delay={0.35} />
          </motion.div>
        </div>
      </Wrap>
      <Wave fill="#f3f6ee" className="-mt-10 sm:-mt-16 relative" />
    </section>
  );
}

function Manifesto() {
  return (
    <section className="py-20 lg:py-28">
      <Wrap className="grid lg:grid-cols-[1fr_2.2fr] gap-10">
        <div>
          <Kicker>Why we exist</Kicker>
          <dl className="mt-10 grid grid-cols-2 gap-6">
            {sampleStats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-[13.5px] text-d7-soil">{s.label}</dt>
                <dd className="font-d7-serif text-[48px] leading-none text-d7-forest">{s.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6">
            <Note>Figures are illustrative</Note>
          </div>
        </div>
        <Grow>
          <p className="font-d7-serif text-[30px] sm:text-[42px] leading-[1.2] text-d7-forest">
            Industry and infrastructure underpin everyday life. We exist to make those systems <em className="italic text-d7-moss">more reliable</em>, <em className="italic text-d7-moss">more efficient</em> and{' '}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10 italic">more sustainable</span>
              <span className="absolute left-0 right-0 bottom-1 h-3 bg-d7-lime/70 rounded-full -z-0" aria-hidden />
            </span>
            .
          </p>
          <p className="mt-8 max-w-2xl text-[17.5px] leading-relaxed text-d7-soil">{about.story[2]}</p>
        </Grow>
      </Wrap>
    </section>
  );
}

function Values() {
  return (
    <section className="pb-20 lg:pb-28">
      <Wrap>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Serif className="text-[44px] sm:text-[60px] text-d7-forest max-w-2xl">
            Six values, <em>deeply rooted.</em>
          </Serif>
          <Go to={P.about} tone="ghost">
            Our story
          </Go>
        </div>
        <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {coreValues.map((v, i) => {
            const Icon = ICONS[v.icon];
            return (
              <li key={v.title}>
                <Grow delay={(i % 3) * 0.1} className="h-full">
                  <div className={`h-full p-8 transition-transform duration-500 hover:-translate-y-1 ${i % 2 ? 'bg-white rounded-[40px_8px_40px_8px]' : 'bg-d7-lichen rounded-[8px_40px_8px_40px]'}`}>
                    <span className="grid place-items-center w-12 h-12 rounded-full bg-d7-forest text-d7-lime">
                      <Icon size={22} aria-hidden />
                    </span>
                    <h3 className="mt-6 font-d7-serif text-[30px] text-d7-forest">{v.title}</h3>
                    <p className="mt-2 text-d7-soil">{v.description}</p>
                  </div>
                </Grow>
              </li>
            );
          })}
        </ul>
      </Wrap>
    </section>
  );
}

function CompanyArches() {
  return (
    <section className="bg-d7-forest text-d7-mist">
      <Wave fill="#1f3d2b" flip className="bg-d7-mist" />
      <div className="py-16 lg:py-24">
        <Wrap className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Kicker light>The group</Kicker>
            <Serif className="mt-4 text-[44px] sm:text-[64px] text-d7-mist">
              Six companies, <em className="!text-d7-lime">one ecosystem.</em>
            </Serif>
          </div>
          <Go to={P.companies} tone="lime">
            All companies
          </Go>
        </Wrap>
        <ul className="mt-12 flex gap-5 overflow-x-auto px-5 sm:px-8 lg:px-[max(2rem,calc((100vw_-_1240px)/2_+_2rem))] pb-6 no-scrollbar" aria-label="Group companies">
          {groupCompanies.map((c, i) => (
            <li key={c.slug} className="shrink-0 w-[260px] sm:w-[300px]">
              <Link to={P.company(c.slug)} className="group block focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-d7-lime rounded-t-full">
                <div className="relative overflow-hidden rounded-t-full">
                  <img src={c.image.sm} alt={c.image.alt} className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <span className="absolute bottom-4 left-4 grid place-items-center w-12 h-12 rounded-full bg-d7-lime text-d7-forest font-semibold text-[14px]">{c.monogram}</span>
                </div>
                <p className="mt-5 text-[13px] text-d7-lime">
                  {String(i + 1).padStart(2, '0')} · {c.sector}
                </p>
                <h3 className="mt-1 font-d7-serif text-[28px] leading-tight group-hover:italic">{c.shortName}</h3>
                <p className="mt-2 text-[15px] text-d7-mist/70">{c.tagline}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Wave fill="#f3f6ee" className="bg-d7-forest" />
    </section>
  );
}

function Horizons() {
  const [active, setActive] = useState(0);
  const r = roadmap[active];
  return (
    <section className="py-20 lg:py-28">
      <Wrap className="grid lg:grid-cols-2 gap-14 items-center">
        <Rings active={active} onSelect={setActive} />
        <div>
          <Kicker>Horizons</Kicker>
          <Serif className="mt-4 text-[44px] sm:text-[58px] text-d7-forest">
            Growing in <em>rings</em>, not leaps.
          </Serif>
          <AnimatePresence mode="wait">
            <motion.div id="d7-phase" role="tabpanel" key={r.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="mt-8 rounded-[32px] bg-white p-7">
              <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-d7-moss">
                {r.label} · {r.horizon}
              </p>
              <h3 className="mt-2 font-d7-serif text-[30px] text-d7-forest">{r.title}</h3>
              <p className="mt-2 text-d7-soil">{r.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {r.initiatives.map((it) => (
                  <li key={it.title} className="h-9 px-3.5 rounded-full bg-d7-lichen text-[14px] inline-flex items-center">
                    {it.title}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Go to={P.roadmap} tone="ghost">
              The full roadmap
            </Go>
            <Note>Illustrative, not an official commitment</Note>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

function Stories() {
  const [lead, ...rest] = news.slice(0, 4);
  return (
    <section className="pb-20 lg:pb-28">
      <Wrap>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Serif className="text-[44px] sm:text-[60px] text-d7-forest">
            Field <em>notes.</em>
          </Serif>
          <Go to={P.news} tone="ghost">
            All stories
          </Go>
        </div>
        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          <Link to={P.article(lead.slug)} className="group relative block rounded-[40px] overflow-hidden min-h-[440px] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-d7-moss">
            <img src={lead.image.src} alt={lead.image.alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-d7-forest via-d7-forest/30 to-transparent" />
            <span className="absolute bottom-0 p-8 text-d7-mist">
              <span className="inline-flex h-7 px-3 rounded-full bg-d7-lime text-d7-forest text-[13px] font-semibold items-center">{lead.category}</span>
              <span className="block mt-4 font-d7-serif text-[32px] sm:text-[38px] leading-tight">{lead.title}</span>
              <time dateTime={lead.date} className="block mt-3 text-[14px] text-d7-mist/75">
                {formatDate(lead.date)}
              </time>
            </span>
          </Link>
          <ul className="grid gap-4">
            {rest.map((n) => (
              <li key={n.slug}>
                <Link to={P.article(n.slug)} className="group grid grid-cols-[110px_1fr] sm:grid-cols-[150px_1fr] gap-5 items-center p-3 pr-6 rounded-[28px] bg-white hover:bg-d7-lichen transition-colors">
                  <img src={n.image.sm} alt="" className="w-full aspect-square object-cover rounded-[22px] rounded-tl-[70px]" loading="lazy" />
                  <span>
                    <span className="text-[13px] text-d7-moss font-semibold">
                      {n.category} · {formatDate(n.date, 'short')}
                    </span>
                    <span className="block mt-1 font-d7-serif text-[21px] sm:text-[24px] leading-snug text-d7-forest">{n.title}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Wrap>
    </section>
  );
}

function Invitation() {
  return (
    <section className="pb-20 lg:pb-28">
      <Wrap>
        <div className="relative overflow-hidden rounded-[48px] bg-d7-lime px-7 sm:px-14 py-14 sm:py-20 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
          <Leaf className="absolute -right-8 -bottom-20 w-36 opacity-25" color="#1f3d2b" />
          <div>
            <Kicker className="!text-d7-forest">Partnerships</Kicker>
            <Serif className="mt-4 text-[44px] sm:text-[64px] text-d7-forest">
              Plant something <em className="!text-d7-pine">lasting</em> with us.
            </Serif>
            <p className="mt-5 max-w-xl text-[18px] text-d7-forest/80">Distributors, OEMs, technology firms, investors and suppliers — five programmes, each with its own application.</p>
          </div>
          <div className="flex flex-col items-start lg:items-end gap-3 relative">
            <Go to={P.partner}>Explore partnerships</Go>
            <Link to={P.contact} className="inline-flex items-center gap-1 text-d7-forest font-medium underline underline-offset-4">
              Or start a conversation <ArrowUpRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

function GalleryStrip() {
  const pics = gallery.slice(0, 6);
  return (
    <section className="pb-12">
      <Wrap className="flex items-end justify-between gap-6">
        <Serif className="text-[40px] sm:text-[52px] text-d7-forest">
          Seen <em>along the way</em>
        </Serif>
        <Link to={P.gallery} className="hidden sm:inline-flex items-center gap-1 font-medium text-d7-forest underline underline-offset-4">
          Open the gallery <ArrowUpRight size={16} aria-hidden />
        </Link>
      </Wrap>
      <ul className="mt-10 grid grid-cols-3 lg:grid-cols-6 gap-3 px-3">
        {pics.map((g, i) => (
          <li key={g.id}>
            <Link to={P.gallery} aria-label={`Gallery: ${g.caption}`}>
              <img src={g.image.sm} alt="" className={`w-full object-cover hover:opacity-85 transition-opacity ${i % 2 ? 'aspect-[3/4] rounded-b-full' : 'aspect-[3/4] rounded-t-full'}`} loading="lazy" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Home() {
  useMeta('', 'A calm, nature-led corporate presence for a group focused on stewardship and sustainable growth (design concept).');
  return (
    <>
      <Hero />
      <Manifesto />
      <Values />
      <CompanyArches />
      <Horizons />
      <Stories />
      <Invitation />
      <GalleryStrip />
    </>
  );
}
