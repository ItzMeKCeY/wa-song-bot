// ytdl.js (CommonJS)
"use strict";

const SAVE_BASE = "https://p.savenow.to";
const SAVE_KEY = process.env.YT_SAVE_KEY || "dfcb6d76f2f6a9894gjkege8a4ab232222";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const YT_URL_RE = /https?:\/\/(?:www\.|m\.|music\.)?(?:youtube\.com\/(?:watch\?[^\s]*v=|shorts\/|live\/)|youtu\.be\/)[\w-]{11}[^\s]*/;
const DATA_RE = /var ytInitialData = (\{.*?\});<\/script>/s;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(url, headers = {}, type = "text") {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`http ${res.status}`);
  return type === "json" ? res.json() : res.text();
}

// ---- helpers for the YouTube search JSON ----
function ytText(obj, key) {
  const o = obj && obj[key];
  if (!o) return "";
  if (typeof o.simpleText === "string") return o.simpleText;
  if (Array.isArray(o.runs) && o.runs[0]) return o.runs[0].text || "";
  return "";
}

function findVideos(node, out) {
  if (Array.isArray(node)) {
    for (const c of node) findVideos(c, out);
  } else if (node && typeof node === "object") {
    const vr = node.videoRenderer;
    if (vr && typeof vr.videoId === "string") {
      out.push(vr);
      return;
    }
    for (const k of Object.keys(node)) findVideos(node[k], out);
  }
}

function toInfo(vr) {
  return {
    url: "https://www.youtube.com/watch?v=" + vr.videoId,
    id: vr.videoId,
    title: ytText(vr, "title"),
    channel: ytText(vr, "ownerText"),
    duration: ytText(vr, "lengthText"),
    views: ytText(vr, "viewCountText"),
    thumb: `https://i.ytimg.com/vi/${vr.videoId}/hqdefault.jpg`,
  };
}

// search YouTube, returns up to n videos
async function search(query, n = 10) {
  const html = await get(
    "https://www.youtube.com/results?sp=EgIQAQ%3D%3D&search_query=" + encodeURIComponent(query),
    { "User-Agent": UA, "Accept-Language": "en-US,en;q=0.9", Cookie: "CONSENT=YES+1" }
  );
  const m = DATA_RE.exec(html);
  if (!m) throw new Error("youtube data not found");
  const vrs = [];
  findVideos(JSON.parse(m[1]), vrs);

  const seen = new Set();
  const out = [];
  for (const vr of vrs) {
    if (seen.has(vr.videoId)) continue;
    seen.add(vr.videoId);
    out.push(toInfo(vr));
    if (out.length >= n) break;
  }
  if (!out.length) throw new Error("no results");
  return out;
}

// title / channel / thumb for a pasted link (oEmbed)
async function linkInfo(link) {
  const info = { url: link, title: "YouTube Video", channel: "", duration: "", thumb: "" };
  try {
    const o = await get(
      "https://www.youtube.com/oembed?format=json&url=" + encodeURIComponent(link),
      {},
      "json"
    );
    if (o.title) info.title = o.title;
    info.channel = o.author_name || "";
    info.thumb = o.thumbnail_url || "";
  } catch (_) {}
  return info;
}

// the savenow scraper. format: "mp3" | "360" | "480" | "720" | "1080"
// resolves to a direct download url
async function fetchDownload(link, format = "mp3", { tries = 60, interval = 2000 } = {}) {
  const headers = {
    "User-Agent": UA,
    Accept: "*/*",
    Referer: "https://y2down.cc/",
    Origin: "https://y2down.cc",
  };
  const qs = new URLSearchParams({ copyright: "0", format, url: link, api: SAVE_KEY });
  const first = await get(`${SAVE_BASE}/ajax/download.php?${qs}`, headers, "json");
  if (!first || !first.progress_url) throw new Error("savenow returned no progress url");

  for (let i = 0; i < tries; i++) {
    try {
      const p = await get(first.progress_url, headers, "json");
      if (p && p.download_url) return p.download_url;
    } catch (_) {}
    await sleep(interval);
  }
  throw new Error("savenow timed out");
}

// all-in-one: name or link -> { info, format, downloadUrl }
async function ytdl(queryOrLink, format = "mp3") {
  const m = YT_URL_RE.exec(queryOrLink);
  const info = m ? await linkInfo(m[0]) : (await search(queryOrLink, 1))[0];
  const downloadUrl = await fetchDownload(info.url, format);
  return { info, format, downloadUrl };
}

module.exports = { search, linkInfo, fetchDownload, ytdl, YT_URL_RE };
