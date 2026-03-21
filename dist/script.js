(() => {
  /* ============================================================
    PIXEL PERFECT — CodePen Channel Widget
    CDN: https://cdn.jsdelivr.net/gh/YT-PixelPerfectLabs/
    Youtube-Floating-Button/dist/script.js
  ============================================================ */
  
  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
  
    .pp-dock {
      position: fixed;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      z-index: 2147483647;
      display: flex;
      align-items: center;
      pointer-events: none;
    }
  
    /* ── TAB (always visible) ── */
    .pp-tab {
      writing-mode: vertical-rl;
      text-orientation: mixed;
      rotate: 180deg;
      background: #0a0a0a;
      border: 1px solid rgba(240,237,230,0.1);
      border-right: none;
      color: #c8ff00;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 0.75rem;
      letter-spacing: 0.25em;
      padding: 14px 8px;
      cursor: pointer;
      pointer-events: all;
      border-radius: 6px 0 0 6px;
      transition: background 0.2s, padding 0.2s;
      user-select: none;
      flex-shrink: 0;
      position: relative;
    }
  
    .pp-tab::before {
      content: '';
      position: absolute;
      top: 0; left: 0;
      width: 2px;
      height: 0%;
      background: #c8ff00;
      border-radius: 6px 0 0 6px;
      transition: height 0.35s ease;
    }
  
    .pp-dock:hover .pp-tab::before,
    .pp-dock.open  .pp-tab::before { height: 100%; }
  
    .pp-dock:hover .pp-tab,
    .pp-dock.open  .pp-tab { background: #0f0f0f; }
  
    /* ── CARD ── */
    .pp-card {
      background: #0a0a0a;
      background-image:
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
      background-size: 20px 20px;
      border: 1px solid rgba(240,237,230,0.08);
      border-right: none;
      width: 0;
      overflow: hidden;
      pointer-events: all;
      transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      border-radius: 8px 0 0 8px;
      display: flex;
      flex-direction: column;
    }
  
    .pp-dock:hover .pp-card,
    .pp-dock.open  .pp-card { width: 200px; }
  
    .pp-card-inner {
      width: 200px;
      padding: 20px 16px 16px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
  
    /* Channel identity */
    .pp-identity {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
  
    .pp-eyebrow {
      font-family: 'DM Mono', monospace;
      font-size: 0.48rem;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: rgba(240,237,230,0.3);
    }
  
    .pp-name {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.5rem;
      line-height: 0.95;
      letter-spacing: 0.04em;
      color: #f0ede6;
    }
  
    .pp-name em {
      font-style: normal;
      color: #c8ff00;
    }
  
    .pp-tags {
      font-family: 'DM Mono', monospace;
      font-size: 0.45rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: rgba(240,237,230,0.25);
      margin-top: 2px;
    }
  
    /* Divider */
    .pp-divider {
      height: 1px;
      background: rgba(240,237,230,0.07);
    }
  
    /* Buttons */
    .pp-btns {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  
    .pp-btn {
      display: flex;
      align-items: center;
      gap: 9px;
      padding: 9px 12px;
      border-radius: 4px;
      text-decoration: none;
      font-family: 'DM Mono', monospace;
      font-size: 0.6rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      transition: all 0.2s ease;
      border: 1px solid transparent;
      position: relative;
      overflow: hidden;
    }
  
    .pp-btn::after {
      content: '';
      position: absolute;
      inset: 0;
      background: currentColor;
      opacity: 0;
      transition: opacity 0.2s;
    }
  
    .pp-btn:hover::after { opacity: 0.07; }
  
    .pp-btn svg {
      width: 14px;
      height: 14px;
      flex-shrink: 0;
    }
  
    /* YouTube */
    .pp-btn-yt {
      background: rgba(200,255,0,0.07);
      border-color: rgba(200,255,0,0.2);
      color: #c8ff00;
    }
    .pp-btn-yt:hover {
      background: rgba(200,255,0,0.13);
      border-color: rgba(200,255,0,0.4);
    }
  
    /* Instagram */
    .pp-btn-ig {
      background: rgba(240,237,230,0.04);
      border-color: rgba(240,237,230,0.1);
      color: rgba(240,237,230,0.7);
    }
    .pp-btn-ig:hover {
      background: rgba(240,237,230,0.08);
      border-color: rgba(240,237,230,0.2);
      color: #f0ede6;
    }
  
    /* Footer note */
    .pp-note {
      font-family: 'DM Mono', monospace;
      font-size: 0.42rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: rgba(240,237,230,0.18);
      text-align: center;
      line-height: 1.7;
    }
  
    /* Entrance animation */
    @keyframes pp-slide-in {
      from { transform: translateY(-50%) translateX(100%); opacity: 0; }
      to   { transform: translateY(-50%) translateX(0);   opacity: 1; }
    }
  
    .pp-dock {
      animation: pp-slide-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) 1.2s both;
    }
  
    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .pp-dock { animation: none; }
      .pp-card, .pp-tab::before { transition: none; }
    }
  `;
  
  const HTML = `
    <div class="pp-dock" id="ppDock">
      <div class="pp-card">
        <div class="pp-card-inner">
  
          <div class="pp-identity">
            <span class="pp-eyebrow">UI Channel</span>
            <div class="pp-name">PIXEL<br/><em>PERFECT</em></div>
            <span class="pp-tags">GSAP · CSS · Frontend</span>
          </div>
  
          <div class="pp-divider"></div>
  
          <div class="pp-btns">
            <a
              class="pp-btn pp-btn-yt"
              href="https://linkly.link/2CJtA"
              target="_blank"
              rel="noopener"
              aria-label="Subscribe on YouTube"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356
                  2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246
                  15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549
                  -4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
              Subscribe
            </a>
  
            <a
              class="pp-btn pp-btn-ig"
              href="https://www.instagram.com/pixelperfectlabs.ig"
              target="_blank"
              rel="noopener"
              aria-label="Follow on Instagram"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0
                  015-5zm10 2H7a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0
                  00-3-3zm-5 3.5a5.5 5.5 0 110 11 5.5 5.5 0 010-11zm0 2a3.5 3.5 0
                  100 7 3.5 3.5 0 000-7zM19 6.5a1.25 1.25 0 11-2.5 0 1.25 1.25 0
                  012.5 0z"/>
              </svg>
              Follow
            </a>
          </div>
  
          <div class="pp-divider"></div>
  
          <p class="pp-note">
            Made with G sap<br/>
            More on YouTube ↗
          </p>
  
        </div>
      </div>
  
      <div class="pp-tab" id="ppTab" role="button" aria-label="Open Pixel Perfect channel card">
        PIXEL PERFECT
      </div>
    </div>
  `;
  
  // ── Mount styles ──
  const styleEl = document.createElement("style");
  styleEl.textContent = CSS;
  document.head.appendChild(styleEl);
  
  // ── Mount HTML ──
  const wrapper = document.createElement("div");
  wrapper.innerHTML = HTML.trim();
  document.body.appendChild(wrapper.firstChild);
  
  // ── Tab click toggles open on mobile ──
  const dock = document.getElementById("ppDock");
  const tab  = document.getElementById("ppTab");
  
  tab.addEventListener("click", () => {
    dock.classList.toggle("open");
  });
  
  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!dock.contains(e.target)) {
      dock.classList.remove("open");
    }
  });
})();
