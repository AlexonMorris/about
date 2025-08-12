import React, { useEffect, useState } from "react";

// ========================
// Config
// ========================
const PROFILE = {
  name: "AlexonMorris",
  role: "3D / Game Designer",
  tagline: {
    ru: "Эксперименты на стыке low‑poly, хоррора и PSX‑эстетики.",
    en: "Experiments at the edge of low‑poly, horror and PSX aesthetics.",
  },
  contacts: {
    telegram: "https://t.me/AxM_Channel",
    discord: "alexonmorris",
  }
};

const ACCENT = "#ff9000";

function cx(...cls){ return cls.filter(Boolean).join(" "); }

function useLang(){
  const [lang, setLang] = useState('ru');
  useEffect(()=>{
    const saved = localStorage.getItem('lang');
    if(saved) setLang(saved);
  },[]);
  useEffect(()=>{ localStorage.setItem('lang', lang); }, [lang]);
  return { lang, setLang };
}

// ========================
// Effects Layer (PSX feel without fragile data URIs)
// ========================
function EffectsLayer(){
  return (
    <>
      {/* film grain (CSS-only pseudo-noise) */}
      <div
        className="pointer-events-none fixed inset-0 mix-blend-overlay"
        style={{
          opacity: 0.22,
          backgroundImage:
            // repeating radial dots as faux grain (safe for JSX parsers)
            'repeating-radial-gradient(circle at 25% 25%, rgba(255,255,255,0.05), rgba(255,255,255,0.05) 1px, transparent 1px, transparent 3px),\n' +
            'repeating-radial-gradient(circle at 75% 75%, rgba(255,255,255,0.04), rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px)'
        }}
      />
      {/* scanlines */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          opacity: 0.2,
          backgroundImage: 'linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 50%)',
          backgroundSize: '100% 2px'
        }}
      />
      {/* vignette */}
      <div className="pointer-events-none fixed inset-0" style={{boxShadow:'inset 0 0 240px rgba(0,0,0,0.85)'}}/>
    </>
  );
}

function Nav({ lang, setLang }){
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a href="#home" className="font-display text-xl tracking-widest text-white" style={{color: ACCENT}}>ALEXONMORRIS</a>
        <button onClick={()=>setLang(lang==='ru'?'en':'ru')} className="rounded-2xl border border-neutral-700 px-3 py-1 text-xs text-neutral-200 hover:bg-neutral-900">
          {lang.toUpperCase()}
        </button>
      </div>
    </header>
  );
}

function Hero({ lang }){
  return (
    <section id="home" className="relative mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-16 sm:grid-cols-2">
      <div>
        <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl">
          {PROFILE.name}
          <span className="block text-xl font-normal text-neutral-400">{PROFILE.role}</span>
        </h1>
        <p className="mt-4 max-w-xl text-neutral-300">{PROFILE.tagline[lang]}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={PROFILE.contacts.telegram} target="_blank" rel="noreferrer" className="rounded-xl border border-neutral-700 px-4 py-2 text-sm text-neutral-200 transition hover:-translate-y-0.5 hover:bg-neutral-900" style={{boxShadow:`0 0 0 1px ${ACCENT} inset`}}>
            Telegram
          </a>
          <a href="#projects" className="rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black transition hover:-translate-y-0.5" style={{"--accent": ACCENT}}>
            {lang==='ru' ? 'Смотреть проекты' : 'View Projects'}
          </a>
        </div>
      </div>
      <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset]">
        <div className="absolute inset-0 grid place-items-center">
          <div className="px-6 text-center text-neutral-400">
            <div className="text-sm uppercase tracking-[0.3em]" style={{color:ACCENT}}>PSX FEED</div>
            <div className="mt-2 text-xs">Placeholder banner — add your render or GIF</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ children }){
  return (
    <h2 className="mb-4 font-display text-2xl text-white">
      {children}
    </h2>
  );
}

function Projects({ lang }){
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-10">
      <SectionTitle>{lang==='ru'? 'Проекты' : 'Projects'}</SectionTitle>
      <div className="overflow-hidden rounded-3xl border border-neutral-800">
        {/* NOTE: Some hosts block embedding with X-Frame-Options. If iframe is blocked, we'll show a link fallback below. */}
        <iframe title="itch-embed" src="https://alexonmorris.itch.io/" className="h-[520px] w-full" />
      </div>
      <p className="mt-3 text-xs text-neutral-500">
        {lang==='ru' ? 'Если виджет не загрузился, откройте профиль на itch.io: ' : 'If the widget did not load, open itch.io profile: '}
        <a className="underline" href="https://alexonmorris.itch.io/" target="_blank" rel="noreferrer">alexonmorris.itch.io</a>
      </p>
    </section>
  );
}

function About({ lang }){
  const text = {
    ru: `Я разрабатываю выразительные маленькие игры с упором на атмосферу, визуальные метафоры и индустриальную фактуру. Люблю ограниченную палитру и зерно, предпочитаю работать в малых командах или соло. Готов к коллабам и фрилансу.`,
    en: `I craft small expressive games focused on atmosphere, visual metaphors, and industrial texture. I enjoy limited palettes and grain, and prefer working solo or with tiny teams. Open for collabs and freelance.`
  };
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-10">
      <SectionTitle>{lang==='ru'? 'О себе' : 'About'}</SectionTitle>
      <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-5 text-neutral-300">
        {text[lang]}
      </div>
    </section>
  );
}

function Contacts({ lang }){
  return (
    <section id="contacts" className="mx-auto max-w-6xl px-4 py-12">
      <SectionTitle>{lang==='ru'? 'Контакты' : 'Contacts'}</SectionTitle>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <a href={PROFILE.contacts.telegram} target="_blank" rel="noreferrer" className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 text-neutral-300 hover:border-[var(--accent)]" style={{"--accent": ACCENT}}>
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-500">Telegram</div>
          <div className="truncate text-white">{PROFILE.contacts.telegram}</div>
        </a>
        <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 text-neutral-300">
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-500">Discord</div>
          <div className="text-white">{PROFILE.contacts.discord}</div>
        </div>
        <a href="https://alexonmorris.itch.io/" target="_blank" rel="noreferrer" className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 text-neutral-300 hover:border-[var(--accent)]" style={{"--accent": ACCENT}}>
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-500">Itch.io</div>
          <div className="text-white">alexonmorris.itch.io</div>
        </a>
      </div>
    </section>
  );
}

function Footer(){
  return (
    <footer className="mx-auto max-w-6xl px-4 pb-10 pt-6 text-xs text-neutral-500">
      © {new Date().getFullYear()} AlexonMorris. All rights reserved.
    </footer>
  );
}

export default function App(){
  const { lang, setLang } = useLang();

  useEffect(()=>{
    document.documentElement.style.setProperty('--accent', ACCENT);
  },[]);

  return (
    <div className={cx("min-h-screen bg-black text-neutral-200")} style={{fontFamily:"Molot, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto"}}>
      {/* subtle grid */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.03]" style={{backgroundImage:"linear-gradient(90deg,#fff 1px,transparent 1px),linear-gradient(#fff 1px,transparent 1px)", backgroundSize:"40px 40px"}}/>

      <EffectsLayer />
      <Nav lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        <Projects lang={lang} />
        <About lang={lang} />
        <Contacts lang={lang} />
      </main>
      <Footer />

      <style>{`
        .glitch:hover { filter: contrast(120%) saturate(120%); transform: translate3d(0,0,0); }
        @font-face { font-family: 'Molot'; src: local('Molot'), url('/fonts/Molot.woff2') format('woff2'); font-display: swap; }
      `}</style>
    </div>
  );
}
