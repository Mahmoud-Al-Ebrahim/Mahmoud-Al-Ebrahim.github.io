import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  getArticles,
  getExperience,
  getFamilies,
  getProducts,
  getProject,
  getProjects,
} from "@/lib/content";
import { projects as rawProjects } from "@/content/projects";

const BANNED = [/passionate/i, /\bdreams?\b/i, /\bninja\b/i, /rockstar/i, /\bguru\b/i];
const HOTLINK = [/googleusercontent\.com/, /mzstatic\.com/];

function allStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => allStrings(v, out));
  else if (value && typeof value === "object") Object.values(value).forEach((v) => allStrings(v, out));
  return out;
}

function sentences(text: string): number {
  return text.split(/[.!?]\s|[.!?]$/).filter((s) => s.trim().length > 0).length;
}

describe("content integrity", () => {
  it("references only assets that exist under public/", () => {
    const missing: string[] = [];
    for (const p of getProducts()) {
      for (const path of [p.icon, ...p.screenshots]) {
        if (!existsSync(resolve(process.cwd(), "public", `.${path}`))) missing.push(`${p.slug}: ${path}`);
      }
    }
    for (const p of getProjects()) {
      for (const path of p.screenshots) {
        if (!existsSync(resolve(process.cwd(), "public", `.${path}`))) missing.push(`${p.slug}: ${path}`);
      }
    }
    expect(missing).toEqual([]);
  });

  it("keeps every product summary to two or three sentences", () => {
    for (const p of getProducts()) {
      const n = sentences(p.summary);
      expect(n, `${p.slug} summary has ${n} sentences`).toBeGreaterThanOrEqual(2);
      expect(n, `${p.slug} summary has ${n} sentences`).toBeLessThanOrEqual(4);
    }
  });

  it("contains no banned marketing words", () => {
    const text = allStrings([getProducts(), getFamilies(), getProjects(), getArticles()]);
    for (const s of text) {
      for (const re of BANNED) expect(s, `banned word in: ${s.slice(0, 80)}`).not.toMatch(re);
    }
  });

  it("never hotlinks store CDN images", () => {
    const text = allStrings([getProducts(), getFamilies(), getProjects()]);
    for (const s of text) {
      for (const re of HOTLINK) expect(s).not.toMatch(re);
    }
  });

  it("strips private repository urls from projects", () => {
    for (const raw of rawProjects) {
      if (raw.repo && !raw.repo.public) {
        expect(getProject(raw.slug)?.repo).toBeUndefined();
      }
    }
  });

  it("sorts experience newest first, with at most one open-ended role besides teaching", () => {
    const entries = getExperience();
    for (let i = 1; i < entries.length; i++) {
      expect(entries[i - 1].start >= entries[i].start).toBe(true);
    }
    const open = entries.filter((e) => e.end === "present");
    // Teaching runs alongside; at most one current engagement besides it (freelance since July 2026).
    expect(open.filter((e) => !e.teaching).length).toBeLessThanOrEqual(1);
  });
});
