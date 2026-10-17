export type Kind = "still" | "live";
export type Device = "phone" | "tablet" | "desktop";

export interface Wallpaper {
  id: string;
  title: string;
  kind: Kind;
  category: string;
  tags: string[];
  devices: Device[];
  width: number;
  height: number;
  format: string;
  sizeMB: number;
  added: string; // ISO date
  downloads: number;
  published: boolean;
  /** public, optimized preview only. Originals live in private storage (not in this prototype). */
  preview: string;
  compatibility: string;
}

const img = (seed: string, w: number, h: number) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

const raw: Omit<Wallpaper, "preview">[] = [
  { id: "obsidian-dune", title: "Obsidian Dune", kind: "still", category: "Landscape", tags: ["desert", "dark", "minimal"], devices: ["phone", "tablet"], width: 1290, height: 2796, format: "JPEG", sizeMB: 2.4, added: "2026-09-28", downloads: 4120, published: true, compatibility: "iOS 16+, Android 10+" },
  { id: "north-current", title: "North Current", kind: "live", category: "Ocean", tags: ["water", "motion", "blue"], devices: ["phone"], width: 1179, height: 2556, format: "MP4 (H.264)", sizeMB: 11.8, added: "2026-10-04", downloads: 2210, published: true, compatibility: "Live on Android 10+. iOS: save as video, set via Live Photo converter" },
  { id: "quiet-ridge", title: "Quiet Ridge", kind: "still", category: "Landscape", tags: ["mountain", "fog"], devices: ["desktop", "tablet"], width: 5120, height: 2880, format: "JPEG", sizeMB: 6.1, added: "2026-08-12", downloads: 6830, published: true, compatibility: "macOS, Windows, iPadOS" },
  { id: "violet-hour", title: "Violet Hour", kind: "still", category: "Abstract", tags: ["violet", "gradient", "night"], devices: ["phone", "tablet", "desktop"], width: 3840, height: 2160, format: "PNG", sizeMB: 8.7, added: "2026-10-10", downloads: 1980, published: true, compatibility: "All devices" },
  { id: "city-static", title: "City Static", kind: "live", category: "Urban", tags: ["city", "night", "lights"], devices: ["phone", "desktop"], width: 1920, height: 1080, format: "MP4 (H.265)", sizeMB: 18.2, added: "2026-09-02", downloads: 3105, published: true, compatibility: "Desktop via wallpaper apps; Android 10+" },
  { id: "low-tide", title: "Low Tide", kind: "still", category: "Ocean", tags: ["sea", "calm", "minimal"], devices: ["phone"], width: 1290, height: 2796, format: "JPEG", sizeMB: 1.9, added: "2026-07-19", downloads: 5402, published: true, compatibility: "iOS 16+, Android 10+" },
  { id: "concrete-light", title: "Concrete Light", kind: "still", category: "Architecture", tags: ["brutalist", "shadow"], devices: ["desktop"], width: 5120, height: 2880, format: "JPEG", sizeMB: 5.4, added: "2026-06-30", downloads: 2876, published: true, compatibility: "macOS, Windows" },
  { id: "ember-field", title: "Ember Field", kind: "live", category: "Nature", tags: ["fire", "warm", "slow"], devices: ["phone"], width: 1179, height: 2556, format: "MP4 (H.264)", sizeMB: 9.6, added: "2026-10-14", downloads: 860, published: true, compatibility: "Live on Android 10+" },
  { id: "pine-silence", title: "Pine Silence", kind: "still", category: "Nature", tags: ["forest", "green", "fog"], devices: ["phone", "tablet"], width: 2048, height: 2732, format: "JPEG", sizeMB: 3.3, added: "2026-05-22", downloads: 7310, published: true, compatibility: "iPadOS, iOS, Android" },
  { id: "monolith", title: "Monolith", kind: "still", category: "Architecture", tags: ["dark", "minimal", "geometry"], devices: ["phone", "desktop"], width: 3840, height: 2160, format: "PNG", sizeMB: 7.2, added: "2026-09-15", downloads: 3990, published: true, compatibility: "All devices" },
  { id: "orbit-noise", title: "Grain Study 04", kind: "still", category: "Abstract", tags: ["texture", "grain", "mono"], devices: ["phone"], width: 1290, height: 2796, format: "JPEG", sizeMB: 2.1, added: "2026-08-01", downloads: 1544, published: true, compatibility: "iOS 16+, Android 10+" },
  { id: "rain-glass", title: "Rain on Glass", kind: "live", category: "Urban", tags: ["rain", "bokeh", "night"], devices: ["phone", "tablet"], width: 1179, height: 2556, format: "MP4 (H.264)", sizeMB: 14.0, added: "2026-10-01", downloads: 2650, published: true, compatibility: "Live on Android 10+; iPadOS via video" },
];

export const wallpapers: Wallpaper[] = raw.map((w) => {
  const portrait = w.height > w.width;
  return { ...w, preview: img(w.id, portrait ? 720 : 1280, portrait ? 1280 : 720) };
});

export const categories = Array.from(new Set(wallpapers.map((w) => w.category))).sort();
