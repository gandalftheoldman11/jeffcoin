import { useState } from "react";
import {
  Twitter,
  ExternalLink,
  ChevronDown,
  Check,
  Shield,
  Eye,
  Siren,
  AlertTriangle,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import jeffBanner from "@/imports/jeffbanner.png";
import stoneWallBg from "@/imports/stone-wall-bg.png";
import leftyImg from "@/imports/lefty.png";
import middlesworthImg from "@/imports/middlesworth.png";
import jeffImg from "@/imports/jeff.png";
import fenceIcon from "@/imports/fence.png";
import jeffBannerText from "@/imports/jeffbannertext.png";
import jeffTitleImage from "@/imports/jeff_title_image.png";
import jeffLogo from "@/imports/jefflogo.png";
import jeffFullBody from "@/imports/jeff_fullbody.png";
import towerIcon from "@/imports/tower.png";
import towersideImg from "@/imports/towerside.png";
import forestsideImg from "@/imports/forestside.png";
import radioIcon from "@/imports/radio.png";
import sidearmIcon from "@/imports/sidearm.png";
import suppliesIcon from "@/imports/supplies.png";
import mapsIcon from "@/imports/maps.png";

const INVENTORY = [
  { img: fenceIcon, name: "The Fence", note: "Height: debatable. Purpose: also debatable." },
  { img: towerIcon, name: "The Watchtower", note: "Built for wolves. Mostly used to watch the Hendersons' new pool." },
  { img: radioIcon, name: "The Radio", note: "Picks up one channel. It's Jeff, narrating the forest to himself." },
  { img: sidearmIcon, name: "The Sidearm", note: "Safety: on. Confidence: also on. Accuracy: untested." },
  { img: suppliesIcon, name: "The Supplies", note: "Three years of canned beans. Zero years of a therapist." },
  { img: mapsIcon, name: "The Property Map", note: "Hand-drawn by Jeff. Peer-reviewed by absolutely nobody." },
];

const RULES = [
  {
    icon: Shield,
    rule: "Protect the home.",
    counter: "Whose home, exactly? The yard was two acres in March. It is currently visible from space.",
  },
  {
    icon: Eye,
    rule: "Know who is approaching.",
    counter: "Jeff has never actually met a wolf. He met one (1) large raccoon in 2019, and it changed him.",
  },
  {
    icon: Siren,
    rule: "Prepare before the threat arrives.",
    counter: "Reasonable, in theory. It's also why Jeff owns 40 rolls of duct tape and zero umbrellas.",
  },
];

const BROTHERS = [
  {
    name: "Lefty",
    tag: "The Idealist",
    house: "A house of straw. No walls, no gate — just a welcome mat and an open-door policy.",
    body: "When the wolves showed up, Lefty pulled out the good chairs and poured mimosas. He believed hospitality was the whole answer. The wolves ate the brunch. Then they ate the house.",
    outcome: "Status today: rebuilding, on Jeff's land, three doors down from Jeff, who brings this up constantly.",
    img: leftyImg,
    imgAlt: "Lefty the pig, holding a mimosa glass with a smug grin",
  },
  {
    name: "Middlesworth",
    tag: "The Diplomat",
    house: "A house of sticks, with one lock he mostly forgets to use.",
    body: "Middlesworth believed this was a negotiation. He sat down to draft a treaty — some land for the wolves, in exchange for peace. He was still formatting the footnotes when the roof came off.",
    outcome: "Status today: draft #14. The wolves have never opened the document.",
    img: middlesworthImg,
    imgAlt: "Middlesworth the pig, writing a treaty with a quill pen",
  },
];

const TICKER_ITEMS = [
  "⚠️ WOLF SIGHTINGS: 3 (UNCONFIRMED)",
  "🐷 JEFF HAS OPINIONS",
  "🚧 FENCE HEIGHT: STILL UNDER DEBATE",
  "📡 RADIO CHATTER: MOSTLY JEFF, TALKING TO HIMSELF",
  "🥂 BROTHER #1 LOST HIS HOUSE TO BRUNCH",
  "📝 BROTHER #2 STILL DRAFTING THE TREATY",
  "📜 RULE #4: SEE RULE #1",
  "🌲 FOREST: STILL, TECHNICALLY, A FOREST",
  "🐺 WOLVES: STILL WOLVES, PROBABLY",
  "🔒 GATE: LOCKED. ALSO METAPHORICAL.",
];

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="overflow-hidden bg-primary text-primary-foreground py-2.5 border-y-[3px] border-ink">
      <div
        className="flex gap-8 whitespace-nowrap"
        style={{ animation: "ticker 32s linear infinite" }}
      >
        {items.map((item, i) => (
          <span key={i} className="font-display font-bold text-sm tracking-widest uppercase shrink-0">
            {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

const FENCE_LEVELS = [
  {
    max: 20,
    label: "WELCOME MAT",
    body: "The gate's wide open and there's a little bowl of water out for anyone who's thirsty, wolf or otherwise. Jeff has not slept in three days.",
  },
  {
    max: 40,
    label: "GARDEN GATE",
    body: "A gate exists. It is, notably, unlocked, because Jeff keeps forgetting where he put the key.",
  },
  {
    max: 60,
    label: "STANDARD FENCE",
    body: "Waist-high, freshly painted, neighborly. Reasonable people agree this is fine — which, historically, is exactly when the argument starts.",
  },
  {
    max: 80,
    label: "PERIMETER SYSTEM",
    body: "Motion sensors, floodlights, a moat with one confused duck in it. Jeff refers to this as 'just being careful.'",
  },
  {
    max: 100,
    label: "SEALED BUNKER",
    body: "Nothing gets in. Nothing gets out. Jeff has begun writing his memoirs from inside, working title: 'I Was Right The Whole Time (Probably).'",
  },
];

function getFenceLevel(value: number) {
  return FENCE_LEVELS.find((l) => value <= l.max) ?? FENCE_LEVELS[FENCE_LEVELS.length - 1];
}

export default function App() {
  const [openRule, setOpenRule] = useState<number | null>(null);
  const [fenceHeight, setFenceHeight] = useState(55);

  const level = getFenceLevel(fenceHeight);

  return (
    <div
      className="min-h-screen bg-background text-foreground overflow-x-hidden relative"
      style={{ fontFamily: "Nunito, sans-serif" }}
    >
      {/* Fixed background image with theme-matched overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${stoneWallBg})`,
            filter: "brightness(0.55) saturate(0.75) sepia(0.1) contrast(1.05)",
          }}
        />
        {/* Gradient overlay: lighter now, just enough to keep text readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,18,15,0.55) 0%, rgba(20,18,15,0.4) 30%, rgba(20,18,15,0.55) 70%, rgba(20,18,15,0.75) 100%)",
          }}
        />
        {/* Subtle vignette at top/bottom edges only, so the middle stays clearest */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/40" />
      </div>

      {/* Page content sits above the fixed background */}
      <div className="relative z-10">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b-[3px] border-ink bg-background/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ImageWithFallback
              src={jeffLogo}
              alt="Jeff the pig, looking suspicious"
              className="w-10 h-10 rounded-full object-cover border-[3px] border-ink shadow-[2px_2px_0_0_var(--comic-shadow-ink)]"
            />
            <ImageWithFallback
              src={jeffBannerText}
              alt="JEFF"
              className="h-8 w-auto object-contain"
            />
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground uppercase tracking-widest font-bold">
            {[
              { label: "The Story", href: "#story" },
              { label: "The Dossier", href: "#about" },
              { label: "The Rules", href: "#rules" },
              { label: "The Line", href: "#the-line" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-primary transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="comic-btn flex items-center gap-2 bg-[#000000] text-white px-4 py-2 rounded-full font-bold uppercase tracking-wider text-sm"
              style={{ fontFamily: "Baloo 2, sans-serif" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Follow
            </a>
            <a
              href="https://pump.fun"
              target="_blank"
              rel="noopener noreferrer"
              className="comic-btn flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full font-bold uppercase tracking-wider text-sm"
              style={{ fontFamily: "Baloo 2, sans-serif" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              Buy
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-20 min-h-screen flex flex-col justify-center overflow-hidden">

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
          <div className="comic-panel mb-10 rounded-[2rem] overflow-hidden max-w-3xl mx-auto rotate-[-0.5deg]">
            <ImageWithFallback
              src={jeffTitleImage}
              alt="Jeff, a pig in an olive jacket and stars-and-stripes bandana, leaning on a cannon atop his stone compound"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="flex justify-center mb-3">
            <img
              src={jeffBannerText}
              alt="JEFF"
              className="w-full max-w-2xl h-auto object-contain"
            />
          </div>

          <p
            className="text-primary font-extrabold text-[clamp(1.25rem,3vw,2rem)] uppercase tracking-[0.15em] mb-8"
            style={{ fontFamily: "Baloo 2, sans-serif" }}
          >
            Saw them coming.
          </p>

          <p className="text-muted-foreground text-lg md:text-xl max-w-4xl mx-auto mb-12 leading-relaxed">
            Jeff built the fence before anyone asked why. He stocked the bunker before anyone else noticed the wolves.
            He was right once, in 2019, about a raccoon and he has{" "}
            <span className="text-foreground font-bold italic">never let it go.</span>{" "}
            This is his compound. His rules. His{" "}
            <span className="text-primary font-bold">very strongly held opinions about perimeter security.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-16">
            <a
              href="#about"
              className="comic-btn group flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-extrabold uppercase tracking-widest text-sm"
              style={{ fontFamily: "Baloo 2, sans-serif" }}
            >
              Enter The Compound
              <ExternalLink size={14} className="opacity-70" />
            </a>
            <a
              href="#the-line"
              className="comic-btn group flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-full font-extrabold text-sm uppercase tracking-widest"
              style={{ fontFamily: "Baloo 2, sans-serif" }}
            >
              Meet The Wolves
            </a>
          </div>

        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-primary">
          <ChevronDown size={28} strokeWidth={3} />
        </div>
      </section>

      <Ticker />

      {/* Origin — the story of three brothers */}
      <section id="story" className="py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2
              className="text-5xl md:text-6xl font-extrabold uppercase"
              style={{ fontFamily: "'Goudy Stout', serif", WebkitTextStroke: "6px #000", paintOrder: "stroke fill", color: "#f7dbbf" }}
            >
              Three Brothers. <span className="text-primary">One Forest.</span>
            </h2>
            <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
              Same mother, same forest, same wolves at the door. What each brother built is the whole story.
            </p>
          </div>

          <div className="space-y-6">
            {BROTHERS.map(({ name, tag, house, body, outcome, img, imgAlt }) => (
              <div key={name} className="comic-panel bg-card rounded-2xl p-8 opacity-90 flex gap-6 items-center">
                <div className="shrink-0 w-36 h-36 md:w-44 md:h-44 rounded-xl overflow-hidden border-2 border-border bg-background flex items-end justify-center">
                  <img
                    src={img}
                    alt={imgAlt}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3
                      className="text-2xl font-extrabold uppercase tracking-wide text-muted-foreground"
                      style={{ fontFamily: "Baloo 2, sans-serif" }}
                    >
                      {name}
                    </h3>
                    <span className="text-xs uppercase tracking-widest font-bold text-accent">{tag}</span>
                  </div>
                  <p className="text-sm text-muted-foreground/80 italic mb-3">{house}</p>
                  <p className="text-muted-foreground leading-relaxed mb-3">{body}</p>
                  <p className="text-sm text-muted-foreground/70">{outcome}</p>
                </div>
              </div>
            ))}

            <div className="comic-panel bg-primary/5 rounded-2xl p-8 rotate-[-0.3deg] flex gap-6 items-center">
              <div className="shrink-0 w-36 h-36 md:w-44 md:h-44 rounded-xl overflow-hidden border-2 border-primary/30 bg-background flex items-end justify-center">
                <img
                  src={jeffImg}
                  alt="Jeff the pig, in military jacket with a pipe, looking confident"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3 mb-2">
                  <h3
                    className="text-2xl font-extrabold uppercase tracking-wide text-primary"
                    style={{ fontFamily: "Baloo 2, sans-serif" }}
                  >
                    Jeff
                  </h3>
                  <span className="text-xs uppercase tracking-widest font-bold text-accent">The Youngest</span>
                </div>
                <p className="text-sm text-foreground/70 italic mb-3">
                  A house of brick and stone, with a fence he'd already built before anyone asked why.
                </p>
                <p className="text-foreground leading-relaxed font-medium">
                  Jeff watched both of his brothers lose their houses in the same afternoon. He didn't argue with the
                  wolves and he didn't invite them in — he'd already locked the gate, armed the perimeter, and was
                  watching the whole thing through a scope. When the wolves reached his walls, they turned around.
                  Jeff has told this story at every family dinner since. He is, by his own account, "just built
                  different."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Jeff / Dossier */}
      <section id="about" className="py-24 bg-card/75 backdrop-blur-sm border-t border-border overflow-hidden relative">
        {/* Jeff full-body — peeks in from the left, cut by overflow-hidden */}
        <ImageWithFallback
          src={jeffFullBody}
          alt="Jeff the pig, standing in full military gear"
          className="hidden lg:block absolute top-1/2 left-0 -translate-y-1/2 h-[75%] w-auto object-contain pointer-events-none"
          style={{ filter: "drop-shadow(6px 0 16px rgba(0,0,0,0.6))" }}
        />

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <div className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-4">Classified Dossier</div>
              <h2
                className="text-5xl md:text-6xl font-extrabold uppercase leading-tight mb-6"
                style={{ fontFamily: "'Goudy Stout', serif", WebkitTextStroke: "6px #000", paintOrder: "stroke fill", color: "#f7dbbf" }}
              >
                Meet <span className="text-primary">Jeff</span>
              </h2>

              <div className="flex flex-wrap gap-3 mb-8 text-xs uppercase tracking-widest font-bold" style={{ fontFamily: "Baloo 2, sans-serif" }}>
                <span className="comic-sticker bg-background px-3 py-1.5 rotate-[-1deg] inline-block">Status: Prepared</span>
                <span className="comic-sticker bg-background px-3 py-1.5 rotate-[1deg] inline-block">Location: Fortified Compound</span>
                <span className="comic-sticker bg-background px-3 py-1.5 rotate-[-1deg] inline-block">Priorities: Home, Borders, Snacks</span>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Jeff doesn't believe danger announces itself. He believes preparation is responsibility, and that
                responsibility is best measured in fence height. When wolves start moving through the forest,
                Jeff sees the threat before anyone else does — mostly because he's the only one still awake at 3am
                with binoculars.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                He read one (1) article about wolf migration patterns in 2021 and has not, by his own account,
                <span className="text-foreground font-bold"> "stopped doing the research."</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {INVENTORY.map(({ img, name, note }) => (
                <div
                  key={name}
                  className="comic-panel bg-background rounded-2xl p-5 hover:bg-primary/5 group cursor-default"
                >
                  <div className="w-14 h-14 flex items-center justify-center mb-3">
                    <img
                      src={img}
                      alt={name}
                      className="w-full h-full object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-200"
                    />
                  </div>
                  <div
                    className="font-extrabold uppercase text-sm tracking-wide mb-1 group-hover:text-primary transition-colors"
                    style={{ fontFamily: "Baloo 2, sans-serif" }}
                  >
                    {name}
                  </div>
                  <div className="text-xs text-muted-foreground italic leading-relaxed">{note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Jeff's Rules */}
      <section id="rules" className="py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-4">Posted At The Gate</div>
            <h2
              className="text-5xl md:text-6xl font-extrabold uppercase"
              style={{ fontFamily: "'Goudy Stout', serif", WebkitTextStroke: "6px #000", paintOrder: "stroke fill", color: "#f7dbbf" }}
            >
              Jeff's <span className="text-primary">Rules</span>
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Click one. Every rule has a comeback it wasn't expecting.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {RULES.map(({ icon: Icon, rule, counter }, i) => {
              const isOpen = openRule === i;
              return (
                <button
                  key={rule}
                  onClick={() => setOpenRule(isOpen ? null : i)}
                  className="comic-panel text-left bg-card rounded-2xl p-8 group"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-ink flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <span className="text-3xl font-extrabold text-muted-foreground/40" style={{ fontFamily: "Baloo 2, sans-serif" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3
                    className="text-xl font-extrabold uppercase tracking-wide mb-3"
                    style={{ fontFamily: "Baloo 2, sans-serif" }}
                  >
                    {rule}
                  </h3>
                  {isOpen ? (
                    <p className="text-accent leading-relaxed italic font-medium">{counter}</p>
                  ) : (
                    <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">
                      Tap for the counterpoint →
                    </p>
                  )}
                </button>
              );
            })}
            <div className="comic-panel bg-primary/5 rounded-2xl p-8 flex flex-col justify-center rotate-[-0.5deg]">
              <p
                className="text-xl font-extrabold uppercase tracking-wide mb-2 text-primary"
                style={{ fontFamily: "Baloo 2, sans-serif" }}
              >
                But who writes the rules?
              </p>
              <p className="text-muted-foreground leading-relaxed font-medium">
                Currently: Jeff. Unanimously. In a meeting attended only by Jeff.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Line — interactive fence slider */}
      <section id="the-line" className="relative pt-48 pb-0 bg-card/75 backdrop-blur-sm border-t border-border overflow-hidden">

        {/* Tower — pinned to left edge of screen, vertically centered in section */}
        <img
          src={towersideImg}
          alt="Castle tower"
          className="hidden lg:block absolute left-0 bottom-0 w-[260px] xl:w-[340px] h-auto object-contain object-bottom pointer-events-none"
          style={{ filter: "drop-shadow(6px 0 20px rgba(0,0,0,0.6))" }}
        />

        {/* Forest — pinned to right edge of screen */}
        <img
          src={forestsideImg}
          alt="Forest with wolves"
          className="hidden lg:block absolute right-0 bottom-0 w-[260px] xl:w-[340px] h-auto object-contain object-bottom pointer-events-none"
          style={{ filter: "drop-shadow(-6px 0 20px rgba(0,0,0,0.6))" }}
        />

        <div className="max-w-4xl mx-auto px-6 pb-20">
          <div className="text-center mb-16">
            <div className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-4">The Only Real Question</div>
            <h2
              className="text-5xl md:text-6xl font-extrabold uppercase"
              style={{ fontFamily: "'Goudy Stout', serif", WebkitTextStroke: "6px #000", paintOrder: "stroke fill", color: "#f7dbbf" }}
            >
              The <span className="text-primary">Line</span>
            </h2>
            <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
              How high should the fence be? Who gets through the gate? How much security is enough — and who
              decided that? Drag it and find out where you land.
            </p>
          </div>

          <div className="comic-panel bg-background rounded-[2rem] p-8 md:p-12">
            <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-widest mb-4" style={{ fontFamily: "Baloo 2, sans-serif" }}>
              <span className="text-accent">Home</span>
              <span className="text-primary">Forest</span>
            </div>

            <input
              type="range"
              min={0}
              max={100}
              value={fenceHeight}
              onChange={(e) => setFenceHeight(Number(e.target.value))}
              className="w-full h-3 rounded-full appearance-none cursor-pointer accent-primary border-2 border-ink"
              style={{
                background: `linear-gradient(to right, #4B5D3A ${fenceHeight}%, #2A2621 ${fenceHeight}%)`,
              }}
              aria-label="Fence height"
            />

            <div className="text-center mt-10">
              <div
                className="text-primary text-xs font-extrabold uppercase tracking-[0.3em] mb-3"
                style={{ fontFamily: "Baloo 2, sans-serif" }}
              >
                Current Setting: {level.label}
              </div>
              <p className="text-foreground text-lg md:text-xl leading-relaxed max-w-xl mx-auto font-medium">
                {level.body}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mt-12 text-sm text-muted-foreground">
              {[
                "How high should the fence be?",
                "Who gets through the gate?",
                "How much security is enough?",
                "What happens when fear becomes policy?",
              ].map((q) => (
                <div key={q} className="flex items-start gap-2 bg-card border-2 border-ink rounded-xl px-4 py-3 font-medium">
                  <AlertTriangle size={14} className="text-primary mt-0.5 shrink-0" />
                  {q}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="comic-btn inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-extrabold uppercase tracking-widest text-sm"
              style={{ fontFamily: "Baloo 2, sans-serif" }}
            >
              <Twitter size={16} />
              Follow The Story
            </a>
          </div>
        </div>

        <div className="mt-10 border-t-[3px] border-ink pt-8 text-center">
          <p className="text-muted-foreground text-xs uppercase tracking-widest px-6 font-semibold">
            JEFF © 2026 — A work of satire. No actual wolves, pigs, or policies were harmed. Jeff's blood pressure, possibly.
          </p>
        </div>
      </section>

      </div>
      {/* end relative z-10 content wrapper */}
    </div>
  );
}
