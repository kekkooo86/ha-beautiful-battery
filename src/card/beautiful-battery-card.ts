import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { BatteryConfig } from '../types/config';
import type { HomeAssistant } from '../types/hass';

const DEFAULT_CONFIG: BatteryConfig = {
  type: 'custom:beautiful-battery',
  entity: '',
  theme: 'liquid-glass',
  show_percentage: true,
  show_voltage: false,
  show_power: false,
  show_status: true,
  show_particles: true,
  charge_colors: {
    low: '#ff4444',
    mid: '#ffaa00',
    high: '#44cc44',
    full: '#00ddff',
  },
  size: 'medium',
  glow_intensity: 0.8,
  tap_action: { action: 'more-info' },
  language: 'auto',
  test_override: null,
  voltage_entity: '',
  power_entity: '',
};

const SIZE_MAP = { small: 140, medium: 200, large: 260 };

const STRINGS: Record<string, { charging: string; discharging: string; full: string; empty: string }> = {
  it: { charging: 'In carica', discharging: 'Scarica', full: 'Piena', empty: 'Vuota' },
  en: { charging: 'Charging', discharging: 'Discharging', full: 'Full', empty: 'Empty' },
};

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}

function lerpColor(a: string, b: string, t: number): string {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const ra = (pa >> 16) & 0xff, ga = (pa >> 8) & 0xff, ba2 = pa & 0xff;
  const rb = (pb >> 16) & 0xff, gb = (pb >> 8) & 0xff, bb = pb & 0xff;
  const r = Math.round(ra + (rb - ra) * t);
  const g = Math.round(ga + (gb - ga) * t);
  const b2 = Math.round(ba2 + (bb - ba2) * t);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b2).toString(16).slice(1)}`;
}

function chargeColor(pct: number, colors: BatteryConfig['charge_colors']): string {
  if (pct < 25) return lerpColor(colors.low, colors.mid, pct / 25);
  if (pct < 50) return lerpColor(colors.mid, colors.high, (pct - 25) / 25);
  if (pct < 85) return lerpColor(colors.high, colors.full, (pct - 50) / 35);
  return colors.full;
}

@customElement('beautiful-battery')
class BeautifulBatteryCard extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    ha-card {
      background: transparent;
      border: none;
      box-shadow: none;
      padding: 0;
    }

    .battery-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0;
      padding: 20px;
      perspective: 800px;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .battery-outer {
      position: relative;
      transform-style: preserve-3d;
      transition: transform 0.1s ease-out;
    }

    .battery-wrapper:not(.mouse-active) .battery-outer {
      animation: bb-float 4s ease-in-out infinite;
    }

    @keyframes bb-float {
      0%, 100% { transform: translateY(0) rotateX(2deg) rotateY(0deg); }
      25% { transform: translateY(-6px) rotateX(0deg) rotateY(3deg); }
      50% { transform: translateY(-2px) rotateX(-2deg) rotateY(0deg); }
      75% { transform: translateY(-8px) rotateX(0deg) rotateY(-3deg); }
    }

    .drops-area {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: center;
    }

    .drops-above {
      position: absolute;
      bottom: 100%;
      left: 0;
      right: 0;
      height: 30px;
      pointer-events: none;
      overflow: visible;
    }

    .drops-below {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      height: 30px;
      pointer-events: none;
      overflow: visible;
    }

    .drop {
      position: absolute;
      pointer-events: none;
    }

    .drop-inner {
      width: 8px;
      height: 12px;
      border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
      opacity: 0.85;
    }

    .drop.falling-in {
      animation: bb-drop-fall-in 2s ease-in infinite;
    }

    .drop.draining-out {
      animation: bb-drop-drain-out 2s ease-in infinite;
    }

    @keyframes bb-drop-fall-in {
      0% {
        transform: translateY(0) scale(0.6);
        opacity: 0;
      }
      15% {
        opacity: 0.9;
        transform: translateY(-5px) scale(0.8);
      }
      60% {
        opacity: 0.7;
      }
      100% {
        transform: translateY(var(--drop-distance, 50px)) scale(1.2, 0.3);
        opacity: 0;
      }
    }

    @keyframes bb-drop-drain-out {
      0% {
        transform: translateY(0) scale(0.8);
        opacity: 0;
      }
      15% {
        opacity: 0.9;
      }
      60% {
        opacity: 0.5;
      }
      100% {
        transform: translateY(var(--drop-distance, 50px)) scale(0.5, 1.3);
        opacity: 0;
      }
    }

    .battery-cap {
      position: relative;
      margin: 0 auto;
      border-radius: 6px 6px 0 0;
      z-index: 2;
    }

    .battery-cap-inner {
      width: 100%;
      height: 100%;
      border-radius: 6px 6px 0 0;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.2) 0%,
        rgba(255, 255, 255, 0.08) 100%
      );
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-bottom: none;
      box-shadow:
        0 -2px 8px rgba(0, 0, 0, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }

    .battery-body {
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.12) 0%,
        rgba(255, 255, 255, 0.05) 40%,
        rgba(0, 0, 0, 0.1) 100%
      );
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      box-shadow:
        0 8px 32px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.2),
        inset 0 -1px 0 rgba(0, 0, 0, 0.1);
    }

    .battery-body::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 40%;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.15) 0%,
        rgba(255, 255, 255, 0.0) 100%
      );
      border-radius: 16px 16px 0 0;
      pointer-events: none;
      z-index: 3;
    }

    .battery-body::after {
      content: '';
      position: absolute;
      top: 4px;
      left: 8px;
      right: 60%;
      height: 6px;
      background: rgba(255, 255, 255, 0.25);
      border-radius: 100px;
      filter: blur(3px);
      pointer-events: none;
      z-index: 4;
    }

    .battery-body.solid-theme {
      background: linear-gradient(135deg, #3a3a40 0%, #252528 50%, #1a1a1d 100%);
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow:
        0 8px 32px rgba(0, 0, 0, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.08),
        inset 0 -1px 0 rgba(0, 0, 0, 0.2);
    }

    .battery-body.solid-theme::before {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, transparent 100%);
    }

    .battery-body.solid-theme::after {
      background: rgba(255, 255, 255, 0.12);
    }

    .battery-cap.solid-theme .battery-cap-inner {
      background: linear-gradient(180deg, #3a3a40 0%, #2a2a2e 100%);
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.3);
    }

    .charge-glow {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: 0 0 16px 16px;
      pointer-events: none;
      z-index: 0;
    }

    .charge-fill {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: 0 0 14px 14px;
      transition: height 1.2s cubic-bezier(0.34, 1.56, 0.64, 1),
                  background 0.8s ease;
      z-index: 1;
    }

    .charge-fill.animating {
      transition: height 2s cubic-bezier(0.34, 1.56, 0.64, 1),
                  background 0.8s ease;
    }

    .charge-fill::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 20px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.35) 0%,
        rgba(255, 255, 255, 0.0) 100%
      );
      pointer-events: none;
    }

    .charge-fill::after {
      content: '';
      position: absolute;
      top: 0;
      left: 10%;
      right: 50%;
      height: 8px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 100px;
      filter: blur(4px);
    }

    .liquid-wave {
      position: absolute;
      top: -8px;
      left: -5%;
      width: 110%;
      height: 16px;
      z-index: 2;
      pointer-events: none;
    }

    .liquid-wave path {
      fill: inherit;
    }

    .particle {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.25);
      pointer-events: none;
      z-index: 2;
      animation: bb-particle-float linear infinite;
    }

    @keyframes bb-particle-float {
      0% {
        transform: translateY(0) translateX(0) scale(1);
        opacity: 0;
      }
      10% { opacity: 0.6; }
      90% { opacity: 0.3; }
      100% {
        transform: translateY(-100%) translateX(10px) scale(0.5);
        opacity: 0;
      }
    }

    .battery-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      margin-top: 14px;
    }

    .battery-name {
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 14px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.85);
      text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
      text-align: center;
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .battery-percentage {
      font-family: 'SF Mono', 'JetBrains Mono', monospace;
      font-size: 32px;
      font-weight: 700;
      letter-spacing: -0.5px;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    }

    .battery-status {
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 11px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      opacity: 0.7;
    }

    .battery-details {
      display: flex;
      gap: 16px;
      font-family: 'SF Mono', 'JetBrains Mono', monospace;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
      margin-top: 2px;
    }

    .battery-detail-value {
      font-weight: 600;
      color: rgba(255, 255, 255, 0.8);
    }

    .charging .charge-fill::before {
      animation: bb-shimmer 2s ease-in-out infinite;
    }

    @keyframes bb-shimmer {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }

    .battery-body:active {
      transform: scale(0.97);
      transition: transform 0.1s ease;
    }

    :host(.light-theme) .battery-body {
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.65) 0%,
        rgba(255, 255, 255, 0.35) 40%,
        rgba(200, 200, 200, 0.2) 100%
      );
      border: 1px solid rgba(255, 255, 255, 0.5);
      box-shadow:
        0 8px 32px rgba(0, 0, 0, 0.12),
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        inset 0 -1px 0 rgba(0, 0, 0, 0.05);
    }

    :host(.light-theme) .battery-name,
    :host(.light-theme) .battery-percentage,
    :host(.light-theme) .battery-status,
    :host(.light-theme) .battery-details {
      color: rgba(0, 0, 0, 0.75);
      text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
    }

    :host(.light-theme) .battery-detail-value {
      color: rgba(0, 0, 0, 0.85);
    }

    :host(.light-theme) .battery-cap-inner {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.2) 100%);
      border: 1px solid rgba(255, 255, 255, 0.4);
    }

    :host(.light-theme) .battery-body::before {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, transparent 100%);
    }

    :host(.light-theme) .battery-body::after {
      background: rgba(255, 255, 255, 0.4);
    }
  `;

  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _config?: BatteryConfig;
  @state() private _chargePercent = 0;
  @state() private _displayPercent = 0;
  @state() private _isCharging = false;
  @state() private _mouseX = 0;
  @state() private _mouseY = 0;
  @state() private _mouseActive = false;
  @state() private _isDark = true;
  @state() private _initialized = false;
  private _particles: Array<{ x: number; y: number; size: number; dur: number; delay: number }> = [];

  static async getConfigElement() {
    await import('../editor/beautiful-battery-editor');
    return document.createElement('beautiful-battery-editor');
  }

  static getStubConfig() {
    return { type: 'custom:beautiful-battery', entity: '' };
  }

  setConfig(config: Record<string, unknown>) {
    this._config = { ...DEFAULT_CONFIG, ...config } as BatteryConfig;
    this._syncState();
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('hass')) {
      this._syncState();
    }
    if (changed.has('_chargePercent') && this._config?.show_particles) {
      this._generateParticles();
    }
  }

  private _syncState() {
    if (!this.hass || !this._config?.entity) return;
    const entity = this.hass.states[this._config.entity];
    if (!entity) return;

    if (this._config.test_override != null) {
      this._chargePercent = clamp(this._config.test_override, 0, 100);
    } else {
      const level = Number(entity.state);
      this._chargePercent = clamp(Number.isFinite(level) ? level : 0, 0, 100);
    }

    this._isCharging = entity.state === 'charging' ||
      (typeof entity.attributes?.battery_charging === 'boolean' && entity.attributes.battery_charging) ||
      entity.attributes?.charging === true;

    this._isDark = this.hass.themes?.darkMode !== false;

    if (!this._initialized) {
      this._initialized = true;
      setTimeout(() => { this._displayPercent = this._chargePercent; }, 50);
    } else {
      this._displayPercent = this._chargePercent;
    }

    this._generateParticles();
  }

  private _generateParticles() {
    const count = Math.max(2, Math.floor(this._chargePercent / 15));
    this._particles = Array.from({ length: count }, () => ({
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 70,
      size: 2 + Math.random() * 4,
      dur: 2 + Math.random() * 3,
      delay: Math.random() * 2,
    }));
  }

  private _getLang(): string {
    if (this._config?.language && this._config.language !== 'auto') {
      return this._config.language;
    }
    return this.hass?.locale?.language ?? this.hass?.language ?? 'en';
  }

  private _getStatusLabel(): string {
    const lang = this._getLang();
    const t = STRINGS[lang] ?? STRINGS.en;
    if (this._isCharging) return t.charging;
    if (this._chargePercent >= 100) return t.full;
    if (this._chargePercent <= 0) return t.empty;
    return t.discharging;
  }

  private _getColor(): string {
    return chargeColor(this._chargePercent, this._config?.charge_colors ?? DEFAULT_CONFIG.charge_colors);
  }

  private _getEntityState(entityId: string): number | null {
    if (!this.hass || !entityId) return null;
    const entity = this.hass.states[entityId];
    if (!entity) return null;
    const val = Number(entity.state);
    return Number.isFinite(val) ? val : null;
  }

  private _onPointerMove(e: PointerEvent) {
    const rect = this.shadowRoot?.querySelector('.battery-wrapper') as HTMLElement;
    if (!rect) return;
    const bounds = rect.getBoundingClientRect();
    const x = (e.clientX - bounds.left) / bounds.width - 0.5;
    const y = (e.clientY - bounds.top) / bounds.height - 0.5;
    this._mouseX = x;
    this._mouseY = y;
    this._mouseActive = true;
  }

  private _onPointerLeave() {
    this._mouseActive = false;
  }

  private _handleTap(e: Event) {
    e.stopPropagation();
    const action = this._config?.tap_action;
    if (!action || action.action === 'none' || !this.hass || !this._config?.entity) return;

    switch (action.action) {
      case 'more-info': {
        const ev = new CustomEvent('hass-more-info', {
          bubbles: true,
          composed: true,
          detail: { entityId: this._config.entity },
        });
        this.dispatchEvent(ev);
        break;
      }
      case 'toggle':
        this.hass.callService?.('homeassistant', 'toggle', { entity_id: this._config.entity });
        break;
      case 'call-service':
        if (action.service) {
          const [domain, service] = action.service.split('.');
          this.hass.callService?.(domain, service, action.service_data, action.target);
        }
        break;
    }
  }

  render() {
    if (!this._config) return html``;
    const entity = this.hass?.states[this._config.entity];
    if (!entity) return html`<ha-card><div class="battery-wrapper"><p>Entity not found</p></div></ha-card>`;

    const pct = this._displayPercent;
    const color = this._getColor();
    const isSolid = this._config.theme === 'solid';
    const size = SIZE_MAP[this._config.size];
    const bodyW = size * 0.45;
    const bodyH = size;
    const capW = bodyW * 0.35;
    const capH = 12;
    const glowIntensity = clamp(this._config.glow_intensity, 0, 1);

    const voltage = this._getEntityState(this._config.voltage_entity);
    const power = this._getEntityState(this._config.power_entity);

    const rotateX = this._mouseActive ? clamp(this._mouseY * -15, -12, 12) : 0;
    const rotateY = this._mouseActive ? clamp(this._mouseX * 15, -12, 12) : 0;

    const liquidTopPx = bodyH * (1 - pct / 100);

    const dropPositions = [
      { left: '20%', delay: '0s' },
      { left: '45%', delay: '0.6s' },
      { left: '70%', delay: '1.2s' },
    ];

    return html`
      <ha-card>
        <div class="battery-wrapper ${this._mouseActive ? 'mouse-active' : ''}"
             @pointermove=${this._onPointerMove}
             @pointerleave=${this._onPointerLeave}
             @click=${this._handleTap}>
          <div class="battery-outer" style="transform: rotateX(${rotateX}deg) rotateY(${rotateY}deg);">

            <div class="drops-area">
              <div class="drops-above">
                ${this._isCharging ? dropPositions.map(d => html`
                  <div class="drop falling-in" style="
                    left: calc(${d.left} - 4px);
                    animation-delay: ${d.delay};
                    --drop-distance: ${bodyH + capH + 10}px;
                  ">
                    <div class="drop-inner" style="background: ${color};"></div>
                  </div>
                `) : nothing}
              </div>

              <div>
                <div class="battery-cap ${isSolid ? 'solid-theme' : ''}"
                     style="width:${capW}px; height:${capH}px;">
                  <div class="battery-cap-inner"></div>
                </div>

                <div class="battery-body ${this._isCharging ? 'charging' : ''} ${isSolid ? 'solid-theme' : ''}"
                     style="width:${bodyW}px; height:${bodyH}px;">
                  <div class="charge-glow"
                       style="height: ${pct}%; background: ${color}; opacity: ${glowIntensity}; filter: blur(${12 + glowIntensity * 20}px); box-shadow: 0 0 ${20 + glowIntensity * 30}px ${color};">
                  </div>

                  <div class="charge-fill ${!this._initialized ? 'animating' : ''}"
                       style="height: ${pct}%; background: linear-gradient(0deg, ${color}, ${color}ee);">
                    <svg class="liquid-wave" viewBox="0 0 100 16" preserveAspectRatio="none"
                         style="fill: ${color};">
                      <path d="${this._wavePath()}">
                        <animate attributeName="d"
                                 values="${this._wavePath()};${this._wavePath(1)};${this._wavePath()}"
                                 dur="3s"
                                 repeatCount="indefinite" />
                      </path>
                    </svg>

                    ${this._config.show_particles ? this._particles.map(p => html`
                      <div class="particle" style="
                        left: ${p.x}%;
                        bottom: ${p.y}%;
                        width: ${p.size}px;
                        height: ${p.size}px;
                        animation-duration: ${p.dur}s;
                        animation-delay: ${p.delay}s;
                      "></div>
                    `) : nothing}
                  </div>
                </div>
              </div>

              <div class="drops-below">
                ${!this._isCharging && pct > 5 ? dropPositions.map(d => html`
                  <div class="drop draining-out" style="
                    left: calc(${d.left} - 4px);
                    animation-delay: ${d.delay};
                    --drop-distance: ${30 + 20}px;
                  ">
                    <div class="drop-inner" style="background: ${color};"></div>
                  </div>
                `) : nothing}
              </div>
            </div>

          </div>

          <div class="battery-info">
            <span class="battery-name">${this._config.name ?? entity.attributes?.friendly_name ?? this._config.entity}</span>
            ${this._config.show_percentage ? html`
              <span class="battery-percentage" style="color: ${color};">${Math.round(pct)}%</span>
            ` : nothing}
            ${this._config.show_status ? html`
              <span class="battery-status" style="color: ${color};">${this._getStatusLabel()}</span>
            ` : nothing}
            <div class="battery-details">
              ${this._config.show_voltage && voltage != null ? html`
                <span><span class="battery-detail-value">${voltage.toFixed(1)}</span> V</span>
              ` : nothing}
              ${this._config.show_power && power != null ? html`
                <span><span class="battery-detail-value">${power.toFixed(1)}</span> W</span>
              ` : nothing}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }

  private _wavePath(offset = 0): string {
    const pts: string[] = [];
    for (let x = 0; x <= 100; x += 2) {
      const y = 8 + Math.sin((x + offset * 50) * 0.08) * 4 + Math.sin((x + offset * 30) * 0.15) * 2;
      pts.push(`${x},${y.toFixed(1)}`);
    }
    return `M0,16 L${pts.join(' L')} L100,16 Z`;
  }

  getCardSize() {
    return 3;
  }
}
