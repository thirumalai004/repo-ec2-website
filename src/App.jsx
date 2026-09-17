import {
  profile,
  skillGroups,
  projects,
  experience,
  education,
  award,
  languages,
} from "./data";

function Connector() {
  return <div className="connector" />;
}

function Panel({ id, label, children }) {
  return (
    <section className="panel" id={id}>
      <span className="panel-label">{label}</span>
      {children}
    </section>
  );
}

function SectionHead({ title }) {
  return (
    <div className="section-head">
      <h2>{title}</h2>
      <div className="rule" />
    </div>
  );
}

function App() {
  return (
    <div className="wrap">
      <header>
        <div className="role-tag">
          <span className="dot" />
          AVAILABLE FOR OPPORTUNITIES
        </div>
        <h1>{profile.name}</h1>
        <p className="subtitle">{profile.tagline}</p>
        <div className="contact-row">
          <span>{profile.location}</span>
          <span>·</span>
          <a href={profile.phoneHref}>{profile.phone}</a>
          <span>·</span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <span>·</span>
          <a href={profile.linkedinHref} target="_blank" rel="noopener noreferrer">
            {profile.linkedin}
          </a>
        </div>
      </header>

      <Connector />

      <Panel id="stack" label="01 — STACK">
        <SectionHead title="Technical Skills" />
        <div className="skill-groups">
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.title}>
              <div className="g-title">{group.title}</div>
              <div className="chip-row">
                {group.chips.map((chip) => (
                  <span className="chip" key={chip}>
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Connector />

      <Panel id="projects" label="02 — PROJECTS">
        <SectionHead title="Projects" />
        {projects.map((p) => (
          <div className="project" key={p.title}>
            <div className="project-head">
              <span className="project-title">{p.title}</span>
              <span className="project-date">{p.date}</span>
            </div>
            <ul>
              {p.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </Panel>

      <Connector />

      <Panel id="experience" label="03 — EXPERIENCE">
        <SectionHead title="Internship Experience" />
        {experience.map((e) => (
          <div className="exp" key={e.org}>
            <div className="exp-period">{e.period}</div>
            <div>
              <div className="exp-org">{e.org}</div>
              <ul>
                {e.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </Panel>

      <Connector />

      <Panel id="education" label="04 — EDUCATION">
        <SectionHead title="Education" />
        {education.map((ed) => (
          <div className="edu-row" key={ed.name}>
            <div>
              <div className="edu-name">{ed.name}</div>
              <div className="edu-sub">{ed.sub}</div>
            </div>
            <div className="edu-score">{ed.score}</div>
          </div>
        ))}
      </Panel>

      <Connector />

      <Panel id="more" label="05 — ADDITIONAL">
        <SectionHead title="Awards & Languages" />
        <div className="skill-groups">
          <div className="skill-group">
            <div className="g-title">AWARDS AND HONORS</div>
            <p className="award-text">{award}</p>
          </div>
          <div className="skill-group">
            <div className="g-title">LANGUAGES</div>
            <div className="chip-row">
              {languages.map((l) => (
                <span className="chip" key={l}>
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Panel>

      <footer>
        <div className="coord">END OF DOCUMENT</div>
        <div className="close-tag">Built &amp; deployed on AWS EC2 · Chennai, India</div>
      </footer>
    </div>
  );
}

export default App;
