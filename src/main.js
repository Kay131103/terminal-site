import { PROFILE } from "./config.js";

/* ------------------------------------------------------------------
 *  Terminal portfolio — a fake shell that's real enough to explore.
 *  All content lives in config.js; the shell lives here.
 * ------------------------------------------------------------------ */

const screen = document.getElementById("screen");
const inputLine = document.querySelector(".input-line");
const promptEl = document.querySelector(".prompt");
const input = document.getElementById("input");

/* ---------- output helpers ---------- */
function el(html) {
  const div = document.createElement("div");
  div.className = "line";
  div.innerHTML = html;
  screen.insertBefore(div, inputLine);
  return div;
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// out(): renders raw HTML with a {c}…{/} color-span shorthand.
// Callers MUST esc() any dynamic strings they embed (done throughout).
function out(html) {
  const div = el("");
  div.innerHTML = html
    .replace(/\{(\w)\}([\s\S]*?)\{\/\}/g, `<span class="$1">$2</span>`);
}

function scrollDown() {
  screen.scrollTop = screen.scrollHeight;
}

/* ---------- prompt ---------- */
const USER = PROFILE.handle;
const HOST = "portfolio";
function setPrompt() {
  promptEl.innerHTML = `<span class="a">${USER}@${HOST}</span><span class="m">:</span><span class="b">~</span><span class="m">$&nbsp;</span>`;
}
setPrompt();

/* ---------- history & completion ---------- */
const history = [];
let histIdx = history.length;

const COMMANDS = [
  "help", "about", "whoami", "skills", "projects", "contact", "socials",
  "resume", "experience", "education", "certs", "ls", "cat", "clear", "date",
  "echo", "neofetch", "theme", "open", "sudo", "banner", "history", "exit",
];

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const value = input.value;
    input.value = "";
    // echo the entered line
    const echo = el("");
    echo.innerHTML = promptEl.innerHTML + esc(value);
    if (value.trim()) {
      history.push(value);
      histIdx = history.length;
      run(value.trim());
    }
    scrollDown();
  } else if (e.key === "ArrowUp") {
    if (histIdx > 0) input.value = history[--histIdx];
    e.preventDefault();
  } else if (e.key === "ArrowDown") {
    if (histIdx < history.length - 1) input.value = history[++histIdx];
    else { histIdx = history.length; input.value = ""; }
    e.preventDefault();
  } else if (e.key === "Tab") {
    e.preventDefault();
    const v = input.value.trim();
    const matches = COMMANDS.filter((c) => c.startsWith(v));
    if (matches.length === 1) input.value = matches[0] + " ";
    else if (matches.length > 1) out(`<span class="m">${matches.join("   ")}</span>`);
  }
});

/* ---------- the shell ---------- */
const FILES = {
  "about.txt": () => PROFILE.about,
  "skills.json": () => JSON.stringify(PROFILE.skills, null, 2),
  "experience.md": () =>
    PROFILE.experience
      .map((x) => `## ${x.role} — ${x.org}\n${x.period}\n\n${x.points.map((p) => "- " + p).join("\n")}`)
      .join("\n\n"),
  "education.md": () =>
    PROFILE.education.map((e) => `## ${e.degree}\n${e.school} · ${e.period}`).join("\n\n"),
  "certs.txt": () => PROFILE.certifications.map((c, i) => `${i + 1}. ${c}`).join("\n"),
  "contact.md": () =>
    `email:     ${PROFILE.email}\nphone:     ${PROFILE.phone}\ngithub:    ${PROFILE.github}\nlinkedin:  ${PROFILE.linkedin}\nwebsite:   ${PROFILE.website}`,
};

function cmdTable(entries) {
  return `<table class="cmd-table">${entries
    .map(([c, d]) => `<tr><td><span class="g">${c}</span></td><td class="m">${d}</td></tr>`)
    .join("")}</table>`;
}

const HELP = cmdTable([
  ["about", "who I am"],
  ["skills", "what I work with"],
  ["projects", "things I've built"],
  ["experience", "where I've worked & what I shipped"],
  ["education", "degrees & grades"],
  ["certs", "certifications"],
  ["contact", "how to reach me"],
  ["resume", "grab my resume"],
  ["ls / cat", "poke around the filesystem"],
  ["neofetch", "system info, but make it personal"],
  ["theme <name>", "switch colors (green | purple | amber)"],
  ["banner", "reprint the banner"],
  ["clear", "wipe the screen"],
  ["help", "this message"],
]);

const BANNER = (name) => `<span class="a">
   ▄▄ ·  ▄ .▄▪   ▪  ▪  ▄▄▄▄· ▄▄· ▄ •▄ ▪  ▄▄▄▄·
   ▀█. ▌▪▄▀▄▌██ ██ ▐█·▐█ ▀█ ▐█ ▌▪▀▄▄·██ ▐█ ▀█
   ▄▀.▄▌▐▀▀▪▌▐█·▐█▌▐▌·▐█ ▪▐▄██ ▄▄▐▀▀▪▌▐█·▐█ ▪▐▄
   ▐ ▌▐▌▐█▄▐▌▐█▌ ██ ██ ██▌▐▀▐▌ ▐▌▐█▄▐▌██ ██▌▐▀
    ▀▀▀· ▀▀▀· ▀▀▀ ▀▀▀▀  ▀▀▀ ·▀▀▀▀ ▀▀▀·▀▀▀ ▀▀▀ ·</span>`;

function run(raw) {
  const [cmd, ...args] = raw.split(/\s+/);
  const arg = args.join(" ");
  switch (cmd) {
    case "help":
      out(HELP);
      break;

    case "about":
      out(`<span class="p">${esc(PROFILE.tagline)}</span>\n${esc(PROFILE.about)}`);
      break;

    case "whoami":
      out(`${esc(PROFILE.name)} — <span class="b">${esc(PROFILE.role)}</span> · ${esc(PROFILE.location)}`);
      break;

    case "skills": {
      for (const [k, v] of Object.entries(PROFILE.skills)) {
        out(`<span class="g">${esc(k.padEnd(10))}</span><span class="m">${esc(v)}</span>`);
      }
      break;
    }

    case "projects": {
      if (!PROFILE.projects.length) { out('<span class="m">no projects yet — check back soon</span>'); break; }
      out(`<span class="m">${PROFILE.projects.length} project(s):</span>`);
      PROFILE.projects.forEach((p, i) => {
        out(
          `  <span class="y">${String(i + 1).padStart(2)}</span> <span class="g">${esc(p.name)}</span>` +
          (p.url ? ` <span class="b">↗</span>` : "") +
          `\n      ${esc(p.desc)}` +
          (p.url ? `\n      <span class="m">${esc(p.url)}</span>` : "")
        );
      });
      out(`<span class="m">tip: run</span> <span class="g">project ${esc(PROFILE.projects[0].name)}</span> <span class="m">to open one</span>`);
      break;
    }

    case "project": {
      const p = PROFILE.projects.find((x) => x.name.toLowerCase() === arg.toLowerCase());
      if (!p) { out(`<span class="r">project not found:</span> ${esc(arg)}`); break; }
      out(`<span class="g">${esc(p.name)}</span>\n${esc(p.desc)}`);
      if (p.url) {
        out(`<span class="b">↗ opening ${esc(p.url)}</span>`);
        window.open(p.url, "_blank");
      }
      break;
    }

    case "contact":
    case "socials":
      out(
        `<span class="g">email</span>     <a class="b" href="mailto:${esc(PROFILE.email)}">${esc(PROFILE.email)}</a>\n` +
        `<span class="g">phone</span>     <a class="b" href="tel:${esc(PROFILE.phone.replace(/\s/g, ""))}">${esc(PROFILE.phone)}</a>\n` +
        `<span class="g">github</span>    <a class="b" href="${esc(PROFILE.github)}" target="_blank">${esc(PROFILE.github.replace("https://", ""))}</a>\n` +
        `<span class="g">linkedin</span>  <a class="b" href="${esc(PROFILE.linkedin)}" target="_blank">${esc(PROFILE.linkedin.replace("https://www.", "").replace("https://", ""))}</a>\n` +
        `<span class="g">website</span>   <a class="b" href="${esc(PROFILE.website)}" target="_blank">${esc(PROFILE.website.replace("https://", ""))}</a>`
      );
      break;

    case "experience":
    case "exp":
      for (const x of PROFILE.experience) {
        out(
          `<span class="y">${esc(x.role)}</span> <span class="m">·</span> <span class="g">${esc(x.org)}</span> <span class="m">(${esc(x.period)})</span>`
        );
        for (const p of x.points) out(`  <span class="m">▸</span> ${esc(p)}`);
        out("");
      }
      break;

    case "education":
    case "edu":
      for (const e of PROFILE.education) {
        out(`<span class="g">${esc(e.degree)}</span>\n<span class="m">${esc(e.school)} · ${esc(e.period)}</span>`);
      }
      break;

    case "certs":
    case "certifications":
      PROFILE.certifications.forEach((c, i) => out(`<span class="y">${String(i + 1).padStart(2)}</span>  ${esc(c)}`));
      break;

    case "resume":
      out(`<span class="m">resume lives at</span> <span class="b">/${esc(PROFILE.resume)}</span>`);
      out(`<span class="m">drop the real file into</span> <span class="g">public/</span> <span class="m">before deploying — then run:</span>`);
      out(`  <span class="g">open ${esc(PROFILE.resume)}</span>`);
      break;

  case "ls":
      out(Object.keys(FILES).map((f) => `<span class="b">${esc(f)}</span>`).join("   ") + `<span class="m">   ${esc(PROFILE.resume)}</span>`);
      break;

    case "cat": {
      const file = FILES[arg];
      if (arg === PROFILE.resume) { out(`<span class="m">binary file — try</span> <span class="g">open ${esc(arg)}</span>`); break; }
      if (!file) { out(`<span class="r">cat:</span> ${esc(arg)}: no such file`); break; }
      out(`<span class="m">${esc(file())}</span>`);
      break;
    }

    case "open": {
      const urls = { github: PROFILE.github, linkedin: PROFILE.linkedin, resume: PROFILE.resume, website: PROFILE.website, os: PROFILE.website, "krithi.os": PROFILE.website, links: "links.html" };
      const key = arg.toLowerCase().replace("./", "");
      if (urls[key]) {
        const target = key === "resume" || key === "links" ? "/" + urls[key] : urls[key];
        out(`<span class="b">↗ opening ${esc(target)}</span>`);
        window.open(target, "_blank");
      } else out(`<span class="r">open:</span> unknown target ${esc(arg)} <span class="m">(try: github, linkedin, website, resume, links)</span>`);
      break;
    }

    case "theme": {
      const t = arg.toLowerCase();
      if (["green", "purple", "amber"].includes(t)) {
        document.body.className = t === "green" ? "" : t;
        out(`theme set to <span class="a">${t}</span>`);
      } else out("usage: theme green|purple|amber");
      break;
    }

    case "neofetch": {
      const info = [
        `<span class="a">${USER}@${HOST}</span>`,
        `─────────────────`,
        `<span class="g">role</span>: ${esc(PROFILE.role)}`,
        `<span class="g">shell</span>: web-shell v1.0`,
        `<span class="g">theme</span>: terminal-chic`,
        `<span class="g">uptime</span>: since first "Hello, World!"`,
      ];
      const catLines = [
        `  ╱╲___╱╲  `,
        ` ( o    o ) `,
        `  ╱  ▼  ╱   `,
        ` ╱ ╲___╱ ╱  `,
        `╱________╱  `,
      ];
      const lines = [];
      const rows = Math.max(catLines.length, info.length);
      for (let i = 0; i < rows; i++) {
        const catPart = (catLines[i] || "").padEnd(14);
        lines.push(`<span class="y">${esc(catPart)}</span>${info[i] || ""}`);
      }
      out(lines.join("\n"));
      break;
    }

    case "date":
      out(esc(new Date().toString()));
      break;

    case "echo":
      out(esc(arg || ""));
      break;

    case "history":
      history.forEach((h, i) => out(`<span class="m">${String(i + 1).padStart(4)}</span>  ${esc(h)}`));
      break;

    case "banner":
      out(BANNER(PROFILE.name));
      break;

    case "sudo":
      if (/sandwich/.test(raw)) out(`<span class="y">🥪</span> okay.`);
      else out(`<span class="r">${USER} is not in the sudoers file.</span> <span class="m">This incident has been reported. 🚨</span>`);
      break;

    case "exit":
      out(`<span class="m">there is no exit — this is a website. try</span> <span class="g">clear</span>`);
      break;

    case "rm":
      out(`<span class="r">nice try.</span>`);
      break;

    default:
      out(`<span class="r">${esc(cmd)}</span>: command not found <span class="m">— try</span> <span class="g">help</span>`);
  }
}

/* ---------- boot sequence ---------- */
async function boot() {
  const bootLines = [
    "booting web-shell v1.0…",
    "loading personality… ok",
    "mounting /home/" + USER + "… ok",
    "",
  ];
  for (const line of bootLines) {
    const div = el(`<span class="boot">${esc(line)}</span>`);
    div.classList.add("boot");
    await new Promise((r) => setTimeout(r, 120));
  }
  out(BANNER(PROFILE.name));
  out(`<span class="m">Welcome to ${esc(USER)}'s terminal portfolio.</span> Type <span class="g">help</span> to explore, or press <span class="g">Tab</span> to autocomplete.`);
  scrollDown();
}
boot();

/* focus handling: click anywhere types into the shell */
screen.addEventListener("click", () => input.focus());
input.focus();

/* make links clickable & styled */
screen.addEventListener("click", (e) => {
  if (e.target.tagName === "A") e.stopPropagation();
});
