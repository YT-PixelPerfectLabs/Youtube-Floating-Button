(() => {
  /* ============================================================
     PIXEL PERFECT — CodePen Channel Widget (Toast only)
     CDN: https://cdn.jsdelivr.net/gh/YT-PixelPerfectLabs/
          Youtube-Floating-Button/dist/script.js

     ┌─────────────────────────────────────────┐
     │  CONFIG — change these values only      │
     │  SHOW_DELAY → ms before toast appears   │
     └─────────────────────────────────────────┘
  ============================================================ */

  const SHOW_DELAY = 2000; // milliseconds before toast drops in

  /* ── Shared brand tokens ── */
  const T = {
    bg: "#0a0a0a",
    ink: "#f0ede6",
    accent: "#b1b2ae",
    muted: "rgba(213, 213, 213, 0.35)",
    border: "rgba(240,237,230,0.08)",
    grid: "rgba(255,255,255,0.03)",
    yt: "https://linkly.link/2CJtA",
    ig: "https://www.instagram.com/pixelperfectlabs.ig",
  };

  /* ── Shared SVGs ── */
  const SVG_YT = `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>`;
  const SVG_IG = `<svg viewBox="0 0 24 24" fill="#ffffff" width="16" height="16"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm10 2H7a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm-5 3.5a5.5 5.5 0 110 11 5.5 5.5 0 010-11zm0 2a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM19 6.5a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"/></svg>`;

  /* ── Shared base CSS ── */
  const BASE_CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');

    .pp-widget * { box-sizing: border-box; margin: 0; padding: 0; }
    .pp-widget a { text-decoration: none; cursor: pointer; }

    .pp-btn-yt, .pp-btn-ig {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: 'DM Mono', monospace !important;
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
      background: linear-gradient(135deg, rgb(131 58 180 / 14%), rgb(225 48 108 / 14%), rgb(253 121 36 / 14%));
      border-color: rgb(225 48 108 / 30%);
      color: #f0ede6;
    }
    .pp-btn-ig:hover {
      background: linear-gradient(135deg, rgb(131 58 180 / 25%), rgb(225 48 108 / 25%), rgb(253 121 36 / 25%));
      border-color: rgb(225 48 108 / 60%);
      color: #ffffff;
    }
    .pp-close {
      background: rgba(240,237,230,0.1);
      border: 1px solid rgba(240,237,230,0.3);
      color: ${T.ink};
      cursor: pointer;
      border-radius: 3px;
      font-family: 'DM Mono', monospace !important;
      font-size: 0.6rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      transition: all 0.2s;
      line-height: 1;
    }
    .pp-close:hover {
      background: rgba(240,237,230,0.2);
      border-color: rgba(240,237,230,0.55);
      color: #ffffff;
    }
    @media (prefers-reduced-motion: reduce) {
      .pp-widget, .pp-widget * { animation: none !important; transition: none !important; }
    }
  `;

  /* ══════════════════════════════════════════
     TOAST
     Drops in from top after SHOW_DELAY ms.
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
        font-family: 'Bebas Neue', sans-serif !important;
        font-size: 1.5rem; line-height: 0.92;
        letter-spacing: 0.04em; color: ${T.ink};
      }
      .pp-toast-brand-name em { font-style: normal; color: ${T.accent}; }
      .pp-toast-brand-sub {
        font-family: 'DM Mono', monospace !important;
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
      .pp-toast-actions .pp-close  { padding: 9px 10px; display: flex; align-items: center; justify-content: center; }

      /* ── Row 2: copy — full width ── */
      .pp-toast-copy {
        padding: 11px 18px 14px;
        display: flex; flex-direction: column; gap: 4px;
      }
      .pp-toast-copy-head {
        font-family: 'DM Mono', monospace !important;
        font-size: 0.9rem; letter-spacing: 0.16em;
        text-transform: uppercase; color: ${T.ink};
        margin-bottom: 0.1rem;
      }
      .pp-toast-copy-sub {
        font-family: 'DM Mono', monospace !important;
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
        border: 1px solid rgba(255, 255, 255, 0.2);
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
        font-family: 'DM Mono', monospace !important;
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
              <button class="pp-close" id="ppClose" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" width="14" height="14"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
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

    requestAnimationFrame(() => {
      const toast = document.getElementById("ppToast");
      const reopen = document.getElementById("ppReopen");
      const close = document.getElementById("ppClose");

      if (!toast || !reopen || !close) {
        console.warn("[Pixel Perfect Widget] Toast elements not found.");
        return;
      }

      // Drop in after SHOW_DELAY
      setTimeout(() => toast.classList.add("visible"), SHOW_DELAY);

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

  /* ── Helpers ── */
  function inject(css, html) {
    const s = document.createElement("style");
    s.textContent = BASE_CSS + css;
    document.head.appendChild(s);
    const t = document.createElement("div");
    t.innerHTML = html.trim();
    document.body.appendChild(t.firstChild);
  }

  /* ── Init ── */
  const run = () => mountToast();

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", run)
    : run();
})();
