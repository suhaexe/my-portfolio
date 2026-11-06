import { useEffect, useRef, useState } from "react";
import "./App.css";

const SITE = "OFFSCRIPT";

const profile = {
  name: "Suha Rahman",
  role: "MERN Stack Developer",
  status: "Independent developer · Est. 2026",
  intro:
    "I'm still learning, and I build in public: ship it, break it, fix it, write down what happened.",
  about:
    "I'm a developer in training through a MERN stack course, bridging the gap between theory and production. I believe in learning in public: I ship code, break it, fix it, and document the process. I care about writing logic I can explain line by line and building tools that solve actual problems.",
  email: "suhaaa767@gmail.com",
  linkedin: "https://www.linkedin.com/in/suhaexe",
  github: "https://github.com/suhaexe",
};

const principles = [
  { code: "P-01", title: "Ship it live", text: "A project isn’t finished until it has a real URL someone can open." },
  { code: "P-02", title: "Read the error", text: "Most bugs explain themselves once I slow down and read the message." },
  { code: "P-03", title: "Know every line", text: "If I can’t explain it in an interview, I rewrite it until I can." },
];

const projects = [
  {
    id: "PROJECT_001",
    n: "001",
    title: "BookNook",
    status: "Deployed",
    year: "2026",
    role: "Full-stack developer",
    tone: "#E07A5F", 
    summary: "A platform for book clubs to track reading progress and share reviews.",
    problem: "Book clubs struggle to coordinate reading schedules and share thoughts without a dozen different apps.",
    features: [
      "JWT Authentication with Admin/User roles for moderation",
      "Real-time reading progress tracking linked to user profiles",
      "Dynamic reading streak tracker using MongoDB aggregation pipelines",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB"],
    surprise: "The dynamic reading streak uses a MongoDB aggregation pipeline to calculate consecutive days active—no cron jobs needed.",
    improve: "I would implement WebSockets to make the discussion boards real-time instead of needing a page refresh.",
    image: "/project-one.png",
    live: "https://booknook-omega-nine.vercel.app", 
    code: "https://github.com/suhaexe/BookNook", 
  },
  {
    id: "PROJECT_002",
    n: "002",
    title: "Bazardor",
    status: "Deployed",
    year: "2026",
    role: "Full-stack developer",
    tone: "#3D5A80", 
    summary: "A specialized e-commerce platform for independent artisans to sell handmade goods.",
    problem: "Independent creators struggle with massive platforms like Etsy where their products get buried in search algorithms.",
    features: [
      "JWT Authentication with Seller/Buyer roles",
      "Real-time inventory updates using MongoDB Change Streams",
      "A seamless checkout experience with Stripe integration",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    surprise: "I implemented MongoDB Change Streams to notify buyers in real-time if an item in their cart just sold out.",
    improve: "I would add a recommendation engine based on user browsing history to help artisans get more sales.",
    image: "/project-two.png", 
    live: "https://bazar-dor-pied-mu.vercel.app", 
    code: "https://github.com/suhaexe/ASSIGNMENT-7",
  },
];

const toolkit = [
  { title: "Languages", items: ["JavaScript (ES6+)", "HTML5", "CSS3"] },
  { title: "Technologies", items: ["React", "Node.js", "Express", "MongoDB", "Mongoose"] },
  { title: "Tools", items: ["Git & GitHub", "Postman", "VS Code", "Vercel", "Render"] },
  { title: "Currently exploring", live: true, items: ["TypeScript", "Next.js", "Testing with Jest"] },
];

const sections = [
  { id: "profile", code: "02", label: "Profile" },
  { id: "works", code: "03", label: "Works" },
  { id: "toolkit", code: "04", label: "Toolkit" },
  { id: "contact", code: "05", label: "Contact" },
];

function SecLabel({ code, title, note }) {
  return (
    <div className="sec-label">
      <span className="mono">SEC_{code}</span>
      <span className="mono sec-title">{title}</span>
      {note && <span className="mono note">{note}</span>}
    </div>
  );
}

function Case({ p }) {
  return (
    <article className="case" style={{ "--tone": p.tone }} data-n={p.n}>
      <header className="case-head mono">
        <span>{p.id}</span>
        <span className="state">
          <i className="rec" aria-hidden="true" />
          {p.status}
        </span>
      </header>

      <h3 className="case-title">{p.title}</h3>
      <p className="case-sum">{p.summary}</p>

      <div className="case-grid">
        <div className="shot-wrap">
          <figure className="plate shot">
            <img
              src={p.image}
              alt={`Screenshot of ${p.title}`}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <figcaption className="mono plate-cap">
              FIG. {p.n} / {p.title} interface
            </figcaption>
          </figure>
          <div className="reveal">
            <p className="mono tag">Signature detail</p>
            <p>{p.surprise}</p>
            <a className="textlink" href={p.live} target="_blank" rel="noreferrer">
              Open live demo
            </a>
          </div>
        </div>

        <div className="case-info">
          <dl className="specs">
            <div><dt className="mono">Role</dt><dd>{p.role}</dd></div>
            <div><dt className="mono">Year</dt><dd>{p.year}</dd></div>
            <div><dt className="mono">Stack</dt><dd>{p.stack.join(" / ")}</dd></div>
          </dl>

          <h4 className="mono">Problem</h4>
          <p>{p.problem}</p>

          <h4 className="mono">What it does</h4>
          <ul className="plain">
            {p.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>

          <h4 className="mono">Next iteration</h4>
          <p>{p.improve}</p>

          <div className="actions">
            <a className="btn solid" href={p.live} target="_blank" rel="noreferrer">
              Open live demo
            </a>
            <a className="btn" href={p.code} target="_blank" rel="noreferrer">
              Read the source
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function App() {
  const [now, setNow] = useState(() => new Date());
  const [active, setActive] = useState("entrance");
  const reticle = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const ids = ["entrance", ...sections.map((s) => s.id)];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(en.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = reticle.current;
    if (!fine || calm || !el) return undefined;

    let x = 0, y = 0, tx = 0, ty = 0, raf = 0, shown = false;
    const move = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!shown) {
        x = tx;
        y = ty;
        shown = true;
        el.classList.add("on");
      }
    };
    const over = (e) => {
      el.classList.toggle("hot", Boolean(e.target.closest && e.target.closest("a,button,input")));
    };
    const leave = () => {
      shown = false;
      el.classList.remove("on");
    };
    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.documentElement.addEventListener("mouseleave", leave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  const time = now.toLocaleTimeString("en-GB", { hour12: false });

  return (
    <>
      <div className="reticle" ref={reticle} aria-hidden="true" />

      <header className="nav">
        <a className="brand" href="#entrance">
          {SITE}
          <span className="brand-sub"> / SYSTEM</span>
        </a>

        <nav className="nav-links" aria-label="Sections">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={active === s.id ? "on" : ""}
              aria-current={active === s.id ? "true" : undefined}
            >
              <span>{s.code}</span> {s.label}
            </a>
          ))}
        </nav>

        <div className="nav-right">
          <time className="clock mono" dateTime={now.toISOString()}>
            <i className="rec" aria-hidden="true" />
            SYS {time}
          </time>
        </div>
      </header>

      <div className="page">
        <section id="entrance" className="hero">
          <div className="hero-meta mono">
            <span className="status">
              <i className="rec" aria-hidden="true" />
              {profile.status}
            </span>
            <span className="note">FILE 01 / ENTRANCE</span>
          </div>

          <h1 className="hero-title">
            <span>Not here</span> <span>to fit the</span> <span>framework.</span>
          </h1>

          <div className="hero-foot">
            <div>
              <p className="hero-name">
                {profile.name}
                <span> / {profile.role}</span>
              </p>
              <p className="hero-intro">{profile.intro}</p>
            </div>
            <div className="actions">
              <a className="btn solid" href="#works">
                View selected works
              </a>
            </div>
          </div>

          <p className="margin-note mono" aria-hidden="true">
            REV 1.0 — BUILD 2026.11 — ARCHIVE ACCESS: GRANTED
          </p>
        </section>

        <section id="profile" className="sec">
          <SecLabel code="02" title="Profile" note="Subject: the person behind the code" />
          <div className="sec-body">
            <div className="profile-text">
              <p className="lede">{profile.intro}</p>
              <p>{profile.about}</p>
              <ul className="principles">
                {principles.map((p) => (
                  <li key={p.code}>
                    <span className="mono code">{p.code}</span>
                    <div>
                      <h3>{p.title}</h3>
                      <p>{p.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="works" className="sec">
          <SecLabel code="03" title="Selected works" note="Two case files, both deployed" />
          <div className="sec-body">
            {projects.map((p) => (
              <Case key={p.id} p={p} />
            ))}
          </div>
        </section>

        <section id="toolkit" className="sec">
          <SecLabel code="04" title="Toolkit" note="No percentage bars. Just what I use." />
          <div className="sec-body">
            <div className="kit">
              {toolkit.map((g) => (
                <div key={g.title} className="kit-col">
                  <h3 className="mono kit-title">
                    {g.live && <i className="rec" aria-hidden="true" />}
                    {g.title}
                  </h3>
                  <ul>
                    {g.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="sec end">
          <SecLabel code="05" title="Transmission ended" />
          <div className="sec-body">
            <h2 className="end-title">
              If something here caught your attention, you know where to find me.
            </h2>
            <a className="mail" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <div className="actions">
              <a className="btn solid" href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="btn solid" href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </section>

        <footer className="foot mono">
          <span>END OF FILE</span>
          <span>
            © {now.getFullYear()} {profile.name} / {SITE}
          </span>
          <span>SYS {time}</span>
        </footer>
      </div>
    </>
  );
}