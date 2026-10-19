import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { about, timeline } from '../../../data/about';
import { groupCompanies } from '../../../data/groupCompanies';
import { chairman } from '../../../data/leadership';
import { news, formatDate } from '../../../data/news';
import { gallery } from '../../../data/gallery';
import { Cue, Dolly, Fade, Go, Letters, P, ROMAN, Sample, ScrollWords, Stage, Title, useMeta } from '../ui';

function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[620px] overflow-hidden bg-d9-black">
      <img src="/images/city-night.jpg" alt="City skyline at night" className="absolute inset-0 w-full h-full object-cover saturate-[0.55] motion-safe:animate-d9-kenburns" />
      <div className="absolute inset-0 bg-gradient-to-b from-d9-black/70 via-d9-black/20 to-d9-black" />
      {/* Letterbox bars slide away on load */}
      <motion.div className="absolute top-0 inset-x-0 bg-d9-black" initial={{ height: '50%' }} animate={{ height: '9%' }} transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }} aria-hidden />
      <motion.div className="absolute bottom-0 inset-x-0 bg-d9-black" initial={{ height: '50%' }} animate={{ height: '9%' }} transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }} aria-hidden />
      <Stage className="relative h-full flex flex-col justify-end pb-[16vh]">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }}>
          <Cue className="!text-d9-ash">Nexora Group · Industry, infrastructure, energy & technology</Cue>
        </motion.div>
        <Title as="h1" className="mt-6 text-[64px] sm:text-[120px] lg:text-[170px] leading-[0.88]">
          <Letters text="The long" delay={1} />
          <br />
          <em>
            <Letters text="view." delay={1.35} />
          </em>
        </Title>
        <motion.div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.9, duration: 1 }}>
          <Go to={P.about}>Enter the group</Go>
          <Go to={P.companies}>The companies</Go>
        </motion.div>
      </Stage>
      <div className="absolute right-6 sm:right-10 bottom-[12%] flex flex-col items-center gap-3" aria-hidden>
        <span className="font-d9-sans text-[10px] uppercase tracking-[0.4em] [writing-mode:vertical-rl]">Scroll</span>
        <span className="w-px h-16 bg-d9-bone/80 motion-safe:animate-d9-scroll" />
      </div>
    </section>
  );
}

function Statement() {
  return (
    <section className="py-32 lg:py-48">
      <Stage className="max-w-[1100px] text-center">
        <Cue>I · Why we exist</Cue>
        <ScrollWords text={about.whyWeExist} className="mt-10 font-d9-serif text-[32px] sm:text-[48px] lg:text-[58px] leading-[1.12]" />
      </Stage>
    </section>
  );
}

/** Pinned section: vertical scroll drives a horizontal reel of companies. Falls back to a grid when motion is reduced. */
function Reel() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);
  useEffect(() => {
    // How far the track must travel so its last card ends at the right edge.
    const measure = () => track.current && setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth + 40));
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [reduce]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, (v) => -v * distance);

  const Card = ({ c, i }: { c: (typeof groupCompanies)[number]; i: number }) => (
    <Link to={P.company(c.slug)} className="group block relative h-full overflow-hidden focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-d9-bone">
      <img src={c.image.src} alt={c.image.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover saturate-[0.5] brightness-[0.6] transition-all duration-1000 group-hover:saturate-100 group-hover:brightness-[0.8] group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-d9-black via-transparent to-transparent" />
      <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10">
        <Cue className="!text-d9-ash">
          {ROMAN[i]} · {c.sector}
        </Cue>
        <h3 className="mt-4 font-d9-serif text-[38px] sm:text-[56px] leading-none group-hover:italic">{c.shortName}</h3>
        <p className="mt-4 max-w-md font-d9-sans font-light text-d9-ash">{c.tagline}</p>
      </div>
    </Link>
  );

  if (reduce)
    return (
      <section className="py-24">
        <Stage>
          <Cue>II · The companies</Cue>
          <ul className="mt-10 grid md:grid-cols-2 gap-4">
            {groupCompanies.map((c, i) => (
              <li key={c.slug} className="h-[420px]">
                <Card c={c} i={i} />
              </li>
            ))}
          </ul>
        </Stage>
      </section>
    );

  return (
    <section ref={ref} className="relative" style={{ height: `${groupCompanies.length * 55}vh` }} aria-label="The companies">
      <div className="sticky top-0 h-[100svh] overflow-hidden flex flex-col justify-center">
        <Stage className="flex items-end justify-between gap-6 mb-8">
          <div>
            <Cue>II · The companies</Cue>
            <Title className="mt-4 text-[40px] sm:text-[64px]">
              Six <em>companies</em>
            </Title>
          </div>
          <Go to={P.companies} className="hidden sm:inline-flex">
            View all
          </Go>
        </Stage>
        <motion.ul ref={track} style={{ x }} className="flex gap-4 sm:gap-6 pl-5 sm:pl-10 w-max">
          {groupCompanies.map((c, i) => (
            <li key={c.slug} className="w-[82vw] sm:w-[58vw] lg:w-[44vw] h-[56vh] sm:h-[62vh]">
              <Card c={c} i={i} />
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function Chairman() {
  return (
    <section className="grid lg:grid-cols-2 min-h-[90vh]">
      <Dolly src={chairman.portrait} alt={`${chairman.name} (placeholder portrait)`} imgClass="h-full min-h-[480px] grayscale" className="h-full" />
      <div className="flex flex-col justify-center px-6 sm:px-14 lg:px-20 py-20 bg-d9-carbon">
        <Cue>III · From the Chairman</Cue>
        <Fade>
          <Title as="p" className="mt-10 text-[34px] sm:text-[48px] leading-[1.1] italic">
            “{chairman.quote}”
          </Title>
        </Fade>
        <p className="mt-10 font-d9-sans font-light text-[17px] leading-relaxed text-d9-ash max-w-lg">{about.chairmanMessage.paragraphs[0]}</p>
        <p className="mt-8 font-d9-serif text-[22px]">{chairman.name}</p>
        <Cue className="mt-1">{chairman.role} · fictional placeholder</Cue>
        <div className="mt-10">
          <Go to={P.about}>Read the full letter</Go>
        </div>
      </div>
    </section>
  );
}

/** Timeline as a strip of film frames with sprocket holes. */
function FilmStrip() {
  return (
    <section className="py-28 lg:py-36">
      <Stage className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Cue>IV · Chronology</Cue>
          <Title className="mt-4 text-[44px] sm:text-[72px]">
            A <em>chronology</em>
          </Title>
        </div>
        <Sample>Dates are illustrative</Sample>
      </Stage>
      <div className="mt-14 bg-[#050505] py-4 border-y border-d9-graphite">
        <div className="h-3 mx-4 mb-3 bg-[repeating-linear-gradient(90deg,#1e1e1e_0_14px,transparent_14px_30px)]" aria-hidden />
        <ol className="flex gap-3 overflow-x-auto px-4 no-scrollbar" tabIndex={0} aria-label="Chronology">
          {timeline.map((t) => (
            <li key={t.year} className="shrink-0 w-[270px] sm:w-[320px]">
              <div className="relative aspect-[4/3] overflow-hidden">
                {t.image && <img src={t.image.sm} alt={t.image.alt} className="w-full h-full object-cover grayscale brightness-75" loading="lazy" />}
                <span className="absolute top-3 left-3 font-d9-serif italic text-[40px] leading-none">{t.year}</span>
              </div>
              <p className="mt-4 font-d9-serif text-[22px]">{t.title}</p>
              <p className="mt-1 font-d9-sans font-light text-[14.5px] text-d9-smoke">{t.description}</p>
            </li>
          ))}
        </ol>
        <div className="h-3 mx-4 mt-4 bg-[repeating-linear-gradient(90deg,#1e1e1e_0_14px,transparent_14px_30px)]" aria-hidden />
      </div>
    </section>
  );
}

/** News list where hovering a row reveals its still beside the list. */
function Journal() {
  const items = news.slice(0, 5);
  const [hover, setHover] = useState(0);
  return (
    <section className="py-24 lg:py-32 border-t border-d9-graphite">
      <Stage className="grid lg:grid-cols-[1.4fr_1fr] gap-14 items-start">
        <div>
          <Cue>V · Journal</Cue>
          <ul className="mt-10">
            {items.map((n, i) => (
              <li key={n.slug} className="border-b border-d9-graphite">
                <Link
                  to={P.article(n.slug)}
                  onMouseEnter={() => setHover(i)}
                  onFocus={() => setHover(i)}
                  className="group grid grid-cols-[1fr_auto] gap-6 items-baseline py-7 focus-visible:outline focus-visible:outline-1 focus-visible:outline-d9-bone"
                >
                  <span>
                    <span className="block font-d9-sans text-[11px] uppercase tracking-[0.32em] text-d9-smoke">
                      {n.category} · {formatDate(n.date)}
                    </span>
                    <span className={`block mt-3 font-d9-serif text-[26px] sm:text-[34px] leading-[1.1] transition-all duration-500 ${hover === i ? 'italic translate-x-2' : 'text-d9-ash'}`}>{n.title}</span>
                  </span>
                  <span className="font-d9-sans text-[12px] tracking-[0.3em] text-d9-smoke">{ROMAN[i]}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Go to={P.news}>The full journal</Go>
          </div>
        </div>
        <div className="hidden lg:block sticky top-32 aspect-[4/5] overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.img key={items[hover].slug} src={items[hover].image.sm} alt="" className="absolute inset-0 w-full h-full object-cover saturate-[0.6]" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} />
          </AnimatePresence>
        </div>
      </Stage>
    </section>
  );
}

/** Three columns of stills drifting at different speeds. */
function Stills() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const a = useTransform(scrollYProgress, [0, 1], [60, -160]);
  const b = useTransform(scrollYProgress, [0, 1], [-60, 120]);
  const cols = [gallery.slice(0, 3), gallery.slice(3, 6), gallery.slice(6, 9)];
  return (
    <section ref={ref} className="py-24 lg:py-32 overflow-hidden">
      <Stage className="text-center">
        <Cue>VI · Stills</Cue>
        <Title className="mt-4 text-[44px] sm:text-[72px]">
          Moments, <em>in frame</em>
        </Title>
      </Stage>
      <div className="mt-16 grid grid-cols-3 gap-3 sm:gap-6 px-3 sm:px-10 h-[560px] sm:h-[760px] overflow-hidden">
        {cols.map((col, k) => (
          <motion.ul key={k} style={{ y: k === 1 ? b : a }} className="space-y-3 sm:space-y-6">
            {col.map((g) => (
              <li key={g.id}>
                <Link to={P.gallery} aria-label={`Gallery: ${g.caption}`}>
                  <img src={g.image.sm} alt="" className="w-full aspect-[3/4] object-cover saturate-[0.55] hover:saturate-100 transition duration-700" loading="lazy" />
                </Link>
              </li>
            ))}
          </motion.ul>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Go to={P.gallery}>Open the gallery</Go>
      </div>
    </section>
  );
}

export default function Home() {
  useMeta('', 'A cinematic, monochrome corporate presence for a group with a long-term outlook (design concept).');
  return (
    <>
      <Hero />
      <Statement />
      <Reel />
      <Chairman />
      <FilmStrip />
      <Journal />
      <Stills />
    </>
  );
}
