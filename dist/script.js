(() => {
  /* ============================================================
     PIXEL PERFECT — CodePen Channel Widget
     CDN: https://cdn.jsdelivr.net/gh/YT-PixelPerfectLabs/
          Youtube-Floating-Button/dist/script.js

     ┌─────────────────────────────────────────┐
     │  CONFIG — change this one value only    │
     │  "bar"   → bottom notification bar      │
     │  "card"  → corner card (bottom-right)   │
     │  "toast" → top drop-in notification     │
     └─────────────────────────────────────────┘
  ============================================================ */

  const WIDGET_STYLE = "toast"; // "bar" | "card" | "toast"

  /* ── Shared brand tokens ── */
  const T = {
    bg: "#0a0a0a",
    ink: "#f0ede6",
    accent: "#b1b2ae",
    muted: "rgba(213, 213, 213, 0.28)",
    border: "rgba(240,237,230,0.08)",
    grid: "rgba(255,255,255,0.03)",
    yt: "https://linkly.link/2CJtA",
    ig: "https://www.instagram.com/pixelperfectlabs.ig",
  };

  /* ── Shared SVGs ── */
  const SVG_YT = `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>`;
  const SVG_IG = `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm10 2H7a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm-5 3.5a5.5 5.5 0 110 11 5.5 5.5 0 010-11zm0 2a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM19 6.5a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"/></svg>`;

  /* ── Shared base CSS ── */
  const BASE_CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');

    .pp-widget * { box-sizing: border-box; margin: 0; padding: 0; }
    .pp-widget a { text-decoration: none; cursor: pointer; }

    .pp-btn-yt, .pp-btn-ig {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: 'DM Mono', monospace;
      font-size: 0.62rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      border-radius: 3px;
      border: 1px solid transparent;
      transition: all 0.2s ease;
    }
    .pp-btn-yt {
      background: rgb(255 0 0 / 9%);
      border-color: rgb(255 0 0 / 25%);
      color: #ffffff;
    }
    .pp-btn-yt:hover {
      background: rgb(255 0 0 / 16%);
    border-color: rgb(255 0 0 / 56%);
    }
    .pp-btn-ig {
      background: rgba(240,237,230,0.05);
      border-color: ${T.border};
      color: ${T.muted};
    }
    .pp-btn-ig:hover {
      background: rgba(240,237,230,0.1);
      border-color: rgba(240,237,230,0.2);
      color: ${T.ink};
    }
    .pp-close {
      background: none;
      border: 1px solid ${T.border};
      color: ${T.muted};
      cursor: pointer;
      border-radius: 3px;
      font-family: 'DM Mono', monospace;
      font-size: 0.55rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      transition: all 0.2s;
      line-height: 1;
    }
    .pp-close:hover {
      border-color: rgba(240,237,230,0.25);
      color: ${T.ink};
    }
    @media (prefers-reduced-motion: reduce) {
      .pp-widget, .pp-widget * { animation: none !important; transition: none !important; }
    }
  `;

  /* ══════════════════════════════════════════
     MODE 1 — BAR
     Slim bar pinned to the bottom.
     Expands upward on hover / tap.
  ══════════════════════════════════════════ */
  function mountBar() {
    const css = `
      .pp-bar {
        position: fixed;
        bottom: 0; left: 0; right: 0;
        z-index: 2147483647;
        background: ${T.bg};
        background-image:
          linear-gradient(${T.grid} 1px, transparent 1px),
          linear-gradient(90deg, ${T.grid} 1px, transparent 1px);
        background-size: 20px 20px;
        border-top: 1px solid ${T.border};
        display: flex;
        flex-direction: column;
        transform: translateY(calc(100% - 46px));
        transition: transform 0.42s cubic-bezier(0.4,0,0.2,1);
        animation: pp-bar-in 0.6s cubic-bezier(0.22,1,0.36,1) 1.4s both;
      }
      @keyframes pp-bar-in {
        from { transform: translateY(100%); }
        to   { transform: translateY(calc(100% - 46px)); }
      }
      .pp-bar:hover,
      .pp-bar.open { transform: translateY(0); }

      .pp-bar-strip {
        height: 46px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 28px;
        cursor: pointer;
        flex-shrink: 0;
        border-bottom: 1px solid ${T.border};
        gap: 14px;
      }
      .pp-bar-strip-left { display: flex; align-items: center; gap: 12px; }

      .pp-bar-pulse {
        width: 7px; height: 7px;
        border-radius: 50%;
        background: ${T.accent};
        box-shadow: 0 0 8px ${T.accent};
        flex-shrink: 0;
        animation: pp-pulse 2s ease-in-out infinite;
      }
      @keyframes pp-pulse {
        0%,100% { opacity:1; transform:scale(1); }
        50%      { opacity:0.45; transform:scale(0.7); }
      }

      .pp-bar-name {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 1.15rem;
        letter-spacing: 0.07em;
        color: ${T.ink};
      }
      .pp-bar-name em { font-style:normal; color:${T.accent}; }

      .pp-bar-tags {
        font-family: 'DM Mono', monospace;
        font-size: 0.5rem;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: ${T.muted};
      }

      .pp-bar-chevron {
        font-size: 0.6rem;
        color: ${T.muted};
        font-family: 'DM Mono', monospace;
        transition: transform 0.35s ease;
        margin-left: auto;
      }
      .pp-bar:hover .pp-bar-chevron,
      .pp-bar.open  .pp-bar-chevron { transform: rotate(180deg); }

      .pp-bar-body {
        padding: 22px 28px 26px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        flex-wrap: wrap;
      }

      .pp-bar-identity {
        display: flex; flex-direction: column; gap: 4px; flex: 1; min-width: 180px;
      }
      .pp-bar-label {
        font-family: 'DM Mono', monospace;
        font-size: 0.48rem; letter-spacing: 0.26em;
        text-transform: uppercase; color: ${T.muted};
      }
      .pp-bar-title {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 2rem; line-height: 0.92; letter-spacing: 0.03em; color: ${T.ink};
      }
      .pp-bar-title em { font-style: normal; color: ${T.accent}; }
      .pp-bar-desc {
        font-family: 'DM Mono', monospace;
        font-size: 0.48rem; letter-spacing: 0.16em;
        text-transform: uppercase; color: ${T.muted}; margin-top: 2px;
      }

      .pp-bar-actions {
        display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
      }
      .pp-bar-actions .pp-btn-yt,
      .pp-bar-actions .pp-btn-ig { padding: 11px 20px; white-space: nowrap; }
      .pp-bar-actions .pp-close  { padding: 11px 16px; }

      @media (max-width: 580px) {
        .pp-bar-body { flex-direction: column; align-items: flex-start; }
        .pp-bar-actions { width: 100%; }
        .pp-bar-actions .pp-btn-yt,
        .pp-bar-actions .pp-btn-ig { flex:1; justify-content:center; }
      }
    `;

    const html = `
      <div class="pp-widget pp-bar" id="ppWidget">
        <div class="pp-bar-strip" id="ppStrip">
          <div class="pp-bar-strip-left">
            <div class="pp-bar-pulse"></div>
            <span class="pp-bar-name">PIXEL <em>PERFECT</em></span>
            <span class="pp-bar-tags">GSAP · CSS · Frontend</span>
          </div>
          <span class="pp-bar-chevron">▲</span>
        </div>
        <div class="pp-bar-body">
          <div class="pp-bar-identity">
            <span class="pp-bar-label">UI Tutorial Channel</span>
            <div class="pp-bar-title">PIXEL<br/><em>PERFECT</em></div>
            <span class="pp-bar-desc">New video every week · Free source code</span>
          </div>
          <div class="pp-bar-actions">
            <a class="pp-btn-yt" href="${T.yt}" target="_blank" rel="noopener">${SVG_YT} Subscribe on YouTube</a>
            <a class="pp-btn-ig" href="${T.ig}" target="_blank" rel="noopener">${SVG_IG} Follow on Instagram</a>
            <button class="pp-close" id="ppClose">✕ Dismiss</button>
          </div>
        </div>
      </div>
    `;

    inject(css, html);
    bindClose();
    const bar = document.getElementById("ppWidget");
    document
      .getElementById("ppStrip")
      .addEventListener("click", () => bar.classList.toggle("open"));
  }

  /* ══════════════════════════════════════════
     MODE 2 — CARD
     Corner card anchored bottom-right.
     Partially visible — fully opens on hover/tap.
  ══════════════════════════════════════════ */
  function mountCard() {
    const css = `
      .pp-card-wrap {
        position: fixed;
        bottom: 24px; right: 0;
        z-index: 2147483647;
        width: 270px;
        transform: translateX(calc(100% - 54px));
        transition: transform 0.42s cubic-bezier(0.4,0,0.2,1);
        animation: pp-card-in 0.7s cubic-bezier(0.22,1,0.36,1) 1.4s both;
      }
      @keyframes pp-card-in {
        from { transform: translateX(100%); opacity:0; }
        to   { transform: translateX(calc(100% - 54px)); opacity:1; }
      }
      .pp-card-wrap:hover,
      .pp-card-wrap.open { transform: translateX(0); }

      .pp-card-shell {
        background: ${T.bg};
        background-image:
          linear-gradient(${T.grid} 1px, transparent 1px),
          linear-gradient(90deg, ${T.grid} 1px, transparent 1px);
        background-size: 20px 20px;
        border: 1px solid ${T.border};
        border-right: none;
        border-radius: 10px 0 0 10px;
        display: flex;
        overflow: hidden;
        box-shadow: -4px 0 30px rgba(0,0,0,0.4);
      }

      /* Pull tab */
      .pp-card-tab {
        width: 54px; flex-shrink: 0;
        display: flex; flex-direction: column;
        align-items: center; justify-content: center;
        gap: 12px; padding: 22px 0;
        cursor: pointer;
        border-right: 1px solid ${T.border};
        position: relative;
      }
      .pp-card-tab::after {
        content: '';
        position: absolute;
        top: 0; right: -1px;
        width: 2px; height: 0%;
        background: ${T.accent};
        transition: height 0.35s ease;
      }
      .pp-card-wrap:hover .pp-card-tab::after,
      .pp-card-wrap.open  .pp-card-tab::after { height: 100%; }

      .pp-card-tab-dot {
        width: 24px; height: 24px;
        border-radius: 50%;
        background: rgba(200,255,0,0.1);
        border: 1px solid rgba(200,255,0,0.3);
        display: flex; align-items: center; justify-content: center;
      }
      .pp-card-tab-label {
        writing-mode: vertical-rl;
        text-orientation: mixed;
        rotate: 180deg;
        font-family: 'DM Mono', monospace;
        font-size: 0.48rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: ${T.muted};
      }

      /* Card content */
      .pp-card-content {
        flex: 1; padding: 20px 18px 18px;
        display: flex; flex-direction: column; gap: 14px;
      }
      .pp-card-title {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 2.1rem; line-height: 0.9; letter-spacing: 0.03em; color: ${T.ink};
      }
      .pp-card-title em { font-style: normal; color: ${T.accent}; }
      .pp-card-meta {
        font-family: 'DM Mono', monospace;
        font-size: 0.48rem; letter-spacing: 0.18em;
        text-transform: uppercase; color: ${T.muted}; line-height: 1.9;
      }
      .pp-card-divider { height:1px; background: ${T.border}; }
      .pp-card-btns { display:flex; flex-direction:column; gap:8px; }
      .pp-card-btns .pp-btn-yt,
      .pp-card-btns .pp-btn-ig { padding: 10px 14px; }
      .pp-card-foot {
        display: flex; align-items: center; justify-content: space-between;
      }
      .pp-card-foot-note {
        font-family: 'DM Mono', monospace;
        font-size: 0.42rem; letter-spacing: 0.15em;
        text-transform: uppercase; color: rgba(240,237,230,0.18);
      }
      .pp-card-foot .pp-close { padding: 5px 10px; font-size: 0.48rem; }
    `;

    const html = `
      <div class="pp-widget pp-card-wrap" id="ppWidget">
        <div class="pp-card-shell">
          <div class="pp-card-tab" id="ppStrip">
            <div class="pp-card-tab-dot">
              <svg viewBox="0 0 24 24" fill="${T.accent}" width="13" height="13"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
            </div>
            <span class="pp-card-tab-label">Pixel Perfect</span>
          </div>
          <div class="pp-card-content">
            <div class="pp-card-title">PIXEL<br/><em>PERFECT</em></div>
            <div class="pp-card-meta">GSAP · CSS · Frontend<br/>New video every week</div>
            <div class="pp-card-divider"></div>
            <div class="pp-card-btns">
              <a class="pp-btn-yt" href="${T.yt}" target="_blank" rel="noopener">${SVG_YT} Subscribe</a>
              <a class="pp-btn-ig" href="${T.ig}" target="_blank" rel="noopener">${SVG_IG} Follow</a>
            </div>
            <div class="pp-card-foot">
              <span class="pp-card-foot-note">Pixel Perfect Labs</span>
              <button class="pp-close" id="ppClose">✕</button>
            </div>
          </div>
        </div>
      </div>
    `;

    inject(css, html);
    bindClose();
    const card = document.getElementById("ppWidget");
    document
      .getElementById("ppStrip")
      .addEventListener("click", () => card.classList.toggle("open"));
  }

  /* ══════════════════════════════════════════
     MODE 3 — TOAST
     Drops in from top after 2s.
     Row 1: stripe + brand + actions (close btn)
     Row 2: copy — full width
     No auto-dismiss. Reopen tab persists after close.
  ══════════════════════════════════════════ */
  function mountToast() {
    const css = `
      /* ── Toast wrapper ── */
      .pp-toast {
        position: fixed;
        top: 20px; left: 50%;
        transform: translateX(-50%) translateY(-140%);
        z-index: 2147483647;
        background: ${T.bg};
        background-image:
          linear-gradient(${T.grid} 1px, transparent 1px),
          linear-gradient(90deg, ${T.grid} 1px, transparent 1px);
        background-size: 20px 20px;
        border: 1px solid ${T.border};
        border-radius: 6px;
        overflow: hidden;
        width: min(600px, calc(100vw - 32px));
        opacity: 0;
        transition: transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease;
        box-shadow: 0 10px 50px rgba(0,0,0,0.55), 0 0 0 1px rgba(200,255,0,0.07);
        display: flex;
        flex-direction: column;
      }
      .pp-toast.visible {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
      }
      .pp-toast.hiding {
        transform: translateX(-50%) translateY(-140%);
        opacity: 0;
      }

      /* ── Row 1: stripe + brand + actions ── */
      .pp-toast-row1 {
        display: flex;
        align-items: stretch;
        border-bottom: 1px solid ${T.border};
      }

      .pp-toast-stripe {
        width: 3px; flex-shrink: 0;
        background: ${T.accent};
      }

      .pp-toast-brand {
        padding: 14px 18px;
        display: flex; flex-direction: column;
        justify-content: center; gap: 3px;
        flex-shrink: 0;
        border-right: 1px solid ${T.border};
      }
      .pp-toast-brand-name {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 1.5rem; line-height: 0.92;
        letter-spacing: 0.04em; color: ${T.ink};
      }
      .pp-toast-brand-name em { font-style: normal; color: ${T.accent}; }
      .pp-toast-brand-sub {
        font-family: 'DM Mono', monospace;
        font-size: 0.6rem; letter-spacing: 0.2em;
        text-transform: uppercase; color: ${T.muted};
      }

      .pp-toast-actions {
        flex: 1;
        padding: 10px 14px;
        display: flex; align-items: center;
        justify-content: flex-end; gap: 8px;
        flex-wrap: wrap;
      }
      .pp-toast-actions .pp-btn-yt,
      .pp-toast-actions .pp-btn-ig { padding: 9px 16px; white-space: nowrap; }
      .pp-toast-actions .pp-close  { padding: 9px 12px; }

      /* ── Row 2: copy — full width ── */
      .pp-toast-copy {
        padding: 11px 18px 14px;
        display: flex; flex-direction: column; gap: 4px;
      }
      .pp-toast-copy-head {
        font-family: 'DM Mono', monospace;
        font-size: 0.9rem; letter-spacing: 0.16em;
        text-transform: uppercase; color: ${T.ink};
        margin-bottom: 0.1rem;
      }
      .pp-toast-copy-sub {
        font-family: 'DM Mono', monospace;
        font-size: 0.8rem; letter-spacing: 0.14em;
        text-transform: uppercase; color: ${T.muted};
      }

      /* ── Reopen tab — stays after close ── */
      .pp-reopen {
        position: fixed;
        top: 0; left: 50%;
        transform: translateX(-50%) translateY(-100%);
        z-index: 2147483647;
        background: ${T.bg};
        border: 1px solid rgba(200,255,0,0.2);
        border-top: none;
        border-radius: 0 0 6px 6px;
        padding: 7px 18px 8px;
        display: flex; align-items: center; gap: 8px;
        cursor: pointer;
        opacity: 0;
        transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease;
        box-shadow: 0 6px 20px rgba(0,0,0,0.4);
      }
      .pp-reopen.visible {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
      }
      .pp-reopen-dot {
        width: 6px; height: 6px; border-radius: 50%;
        background: ${T.accent};
        box-shadow: 0 0 6px ${T.accent};
        flex-shrink: 0;
        animation: pp-pulse 2s ease-in-out infinite;
      }
      @keyframes pp-pulse {
        0%,100% { opacity:1; transform:scale(1); }
        50%      { opacity:0.4; transform:scale(0.7); }
      }
      .pp-reopen-label {
        font-family: 'DM Mono', monospace;
        font-size: 0.5rem; letter-spacing: 0.18em;
        text-transform: uppercase; color: ${T.muted};
        white-space: nowrap;
        transition: color 0.2s;
      }
      .pp-reopen:hover .pp-reopen-label { color: ${T.ink}; }

      /* ── Mobile ── */
      @media (max-width: 520px) {
        .pp-toast { top: 0; border-radius: 0 0 6px 6px; border-top: none; }
        .pp-toast-actions { justify-content: flex-start; }
        .pp-toast-actions .pp-btn-yt,
        .pp-toast-actions .pp-btn-ig { flex: 1; justify-content: center; }
      }
    `;

    // Wrap both elements in one root so inject() captures them all
    const html = `
      <div class="pp-toast-root">
        <div class="pp-widget pp-toast" id="ppToast">
          <div class="pp-toast-row1">
            <div class="pp-toast-stripe"></div>
            <div class="pp-toast-brand">
              <div class="pp-toast-brand-name">PIXEL<br/><em>PERFECT</em></div>
            </div>
            <div class="pp-toast-actions">
              <a class="pp-btn-yt" href="${T.yt}" target="_blank" rel="noopener">${SVG_YT} Subscribe</a>
              <a class="pp-btn-ig" href="${T.ig}" target="_blank" rel="noopener">${SVG_IG} Follow</a>
              <button class="pp-close" id="ppClose">❌</button>
            </div>
          </div>
          <div class="pp-toast-copy">
            <div class="pp-toast-copy-head">New UI tutorials every week</div>
            <div class="pp-toast-copy-sub">G sap · ScrollTrigger · Creative CSS</div>
          </div>
        </div>
        <button class="pp-reopen" id="ppReopen" aria-label="Reopen Pixel Perfect widget">
          <span class="pp-reopen-dot"></span>
          <span class="pp-reopen-label">Pixel Perfect</span>
        </button>
      </div>
    `;

    inject(css, html);

    // Query after inject — wrapped in rAF so elements are guaranteed in DOM
    requestAnimationFrame(() => {
      const toast = document.getElementById("ppToast");
      const reopen = document.getElementById("ppReopen");
      const close = document.getElementById("ppClose");

      if (!toast || !reopen || !close) {
        console.warn("[Pixel Perfect Widget] Toast elements not found.");
        return;
      }

      // Drop in after 2s
      setTimeout(() => toast.classList.add("visible"), 2000);

      // Close → hide toast, show reopen tab
      close.addEventListener("click", (e) => {
        e.stopPropagation();
        toast.classList.remove("visible");
        toast.classList.add("hiding");
        setTimeout(() => {
          toast.style.display = "none";
          reopen.classList.add("visible");
        }, 550);
      });

      // Reopen tab → hide tab, show toast
      reopen.addEventListener("click", () => {
        reopen.classList.remove("visible");
        toast.style.display = "";
        toast.classList.remove("hiding");
        requestAnimationFrame(() =>
          requestAnimationFrame(() => toast.classList.add("visible")),
        );
      });
    });
  }

  /* ── Shared helpers ── */
  function inject(css, html) {
    const s = document.createElement("style");
    s.textContent = BASE_CSS + css;
    document.head.appendChild(s);
    const t = document.createElement("div");
    t.innerHTML = html.trim();
    document.body.appendChild(t.firstChild);
  }

  function dismiss(el) {
    if (!el || !el.isConnected) return;
    el.classList.add("hiding");
    setTimeout(() => {
      if (el.isConnected) el.remove();
    }, 600);
  }

  function bindClose() {
    requestAnimationFrame(() => {
      const btn = document.getElementById("ppClose");
      const widget = document.getElementById("ppWidget");
      if (btn && widget) {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          dismiss(widget);
        });
      }
    });
  }

  /* ── Router ── */
  const run = () => {
    if (WIDGET_STYLE === "bar") mountBar();
    else if (WIDGET_STYLE === "card") mountCard();
    else if (WIDGET_STYLE === "toast") mountToast();
    else
      console.warn(
        `[Pixel Perfect Widget] Unknown WIDGET_STYLE: "${WIDGET_STYLE}". Use "bar", "card", or "toast".`,
      );
  };

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", run)
    : run();
})();
