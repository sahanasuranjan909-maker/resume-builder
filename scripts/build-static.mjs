import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const dist = resolve(root, "dist");
const source = resolve(root, "resume_platform");

let html = await readFile(resolve(source, "templates", "resume_platform", "builder.html"), "utf8");
html = html
  .replace("{% load static %}", "")
  .replaceAll("{% static 'resume_platform/style.css' %}", "/static/resume_platform/style.css")
  .replaceAll("{% static 'resume_platform/app.js' %}", "/static/resume_platform/app.js");

await mkdir(resolve(dist, "static", "resume_platform"), { recursive: true });
await writeFile(resolve(dist, "index.html"), html, "utf8");
await cp(resolve(source, "static", "resume_platform", "style.css"), resolve(dist, "static", "resume_platform", "style.css"));
await cp(resolve(source, "static", "resume_platform", "app.js"), resolve(dist, "static", "resume_platform", "app.js"));
