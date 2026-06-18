import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { BatteryConfig } from '../types/config';
import type { HomeAssistant } from '../types/hass';

const DEFAULT_CONFIG: BatteryConfig = {
  type: 'custom:beautiful-battery',
  entity: '',
  theme: 'liquid-glass',
  orientation: 'vertical',
  show_percentage: true,
  show_voltage: false,
  show_power: false,
  show_status: true,
  charge_colors: {
    low: '#ff4444',
    mid: '#ffaa00',
    high: '#44cc44',
    full: '#00ddff',
  },
  size: 'medium',
  animation_speed: 1.2,
  glow_intensity: 0.8,
};

const SIZE_MAP = { small: 120, medium: 180, large: 240 };

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

@customElement('beautiful-battery-card')
class BeautifulBatteryCard extends LitElement {
  static styles = css`
    :host {
      display: block;
      --bb-accent: #00ddff;
      --bb-glow: rgba(0, 221, 255, 0.4);
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
      gap: 12px;
      padding: 20px;
      perspective: 800px;
    }

    .battery-container {
      position: relative;
      transform-style: preserve-3d;
      animation: bb-float 4s ease-in-out infinite;
    }

    @keyframes bb-float {
      0%, 100% { transform: translateY(0) rotateX(2deg) rotateY(0deg); }
      25% { transform: translateY(-6px) rotateX(0deg) rotateY(3deg); }
      50% { transform: translateY(-2px) rotateX(-2deg) rotateY(0deg); }
      75% { transform: translateY(-8px) rotateX(0deg) rotateY(-3deg); }
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

    .battery-cap {
      position: absolute;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.15) 0%,
        rgba(255, 255, 255, 0.05) 100%
      );
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow:
        0 2px 8px rgba(0, 0, 0, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.15);
      z-index: 2;
    }

    .battery-cap-top {
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 30%;
      height: 10px;
      border-radius: 6px 6px 0 0;
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
      border-radius: 0 0 14px 14px;
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

    .charge-glow {
      position: absolute;
      bottom: 0;
      left: -4px;
      right: -4px;
      border-radius: 0 0 18px 18px;
      filter: blur(12px);
      opacity: 0;
      transition: opacity 0.8s ease, height 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
      z-index: 0;
      pointer-events: none;
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

    .battery-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }

    .battery-name {
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 14px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.85);
      text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
      text-align: center;
    }

    .battery-percentage {
      font-family: 'SF Mono', 'JetBrains Mono', monospace;
      font-size: 28px;
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
      font-size: 11px;
      color: rgba(255, 255, 255, 0.5);
    }

    .battery-detail-value {
      font-weight: 600;
      color: rgba(255, 255, 255, 0.75);
    }

    /* Horizontal orientation */
    .battery-wrapper.horizontal {
      flex-direction: row;
    }

    .battery-wrapper.horizontal .battery-container {
      animation-name: bb-float-h;
    }

    @keyframes bb-float-h {
      0%, 100% { transform: translateX(0) rotateY(2deg) rotateX(0deg); }
      25% { transform: translateX(-4px) rotateY(0deg) rotateX(3deg); }
      50% { transform: translateX(0) rotateY(-2deg) rotateX(0deg); }
      75% { transform: translateX(4px) rotateY(0deg) rotateX(-3deg); }
    }

    /* Charging animation */
    .charging .charge-fill::before {
      animation: bb-shimmer 2s ease-in-out infinite;
    }

    @keyframes bb-shimmer {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }

    .charging .charge-glow {
      animation: bb-pulse-glow 2s ease-in-out infinite;
    }

    @keyframes bb-pulse-glow {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 0.7; }
    }

    /* Ripple effect on tap */
    .battery-body:active {
      transform: scale(0.97);
      transition: transform 0.1s ease;
    }
  `;

  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _config?: BatteryConfig;
  @state() private _chargePercent = 0;
  @state() private _isCharging = false;

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
  }

  private _syncState() {
    if (!this.hass || !this._config?.entity) return;
    const entity = this.hass.states[this._config.entity];
    if (!entity) return;

    const level = Number(entity.state);
    this._chargePercent = clamp(Number.isFinite(level) ? level : 0, 0, 100);
    this._isCharging = entity.state === 'charging' ||
      (typeof entity.attributes?.battery_charging === 'boolean' && entity.attributes.battery_charging);
  }

  private _getColor(): string {
    return chargeColor(this._chargePercent, this._config?.charge_colors ?? DEFAULT_CONFIG.charge_colors);
  }

  private _getStatusLabel(): string {
    if (this._isCharging) return 'Charging';
    if (this._chargePercent >= 100) return 'Full';
    if (this._chargePercent <= 0) return 'Empty';
    return 'Discharging';
  }

  render() {
    if (!this._config) return html``;
    const entity = this.hass?.states[this._config.entity];
    if (!entity) return html`<ha-card><div class="battery-wrapper"><p>Entity not found</p></div></ha-card>`;

    const pct = this._chargePercent;
    const color = this._getColor();
    const isHorizontal = this._config.orientation === 'horizontal';
    const size = SIZE_MAP[this._config.size];
    const bodyW = isHorizontal ? size : size * 0.45;
    const bodyH = isHorizontal ? size * 0.45 : size;
    const glowOpacity = (pct / 100) * this._config.glow_intensity;
    const voltage = entity.attributes?.voltage;
    const power = entity.attributes?.power;

    return html`
      <ha-card>
        <div class="battery-wrapper ${isHorizontal ? 'horizontal' : ''}">
          <div class="battery-container">
            <div class="battery-body ${this._isCharging ? 'charging' : ''}"
                 style="width:${bodyW}px; height:${bodyH}px;">
              <div class="battery-cap battery-cap-top"></div>

              <div class="charge-glow"
                   style="height: ${pct}%; background: ${color}; opacity: ${glowOpacity};">
              </div>

              <div class="charge-fill"
                   style="height: ${pct}%; background: linear-gradient(0deg, ${color}, ${color}ee);">
                <svg class="liquid-wave" viewBox="0 0 100 16" preserveAspectRatio="none"
                     style="fill: ${color};">
                  <path d="${this._wavePath()}">
                    <animate attributeName="d"
                             values="${this._wavePath()};${this._wavePath(1)};${this._wavePath()}"
                             dur="${3 / this._config.animation_speed}s"
                             repeatCount="indefinite" />
                  </path>
                </svg>
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
                <span><span class="battery-detail-value">${Number(voltage).toFixed(1)}</span>V</span>
              ` : nothing}
              ${this._config.show_power && power != null ? html`
                <span><span class="battery-detail-value">${Number(power).toFixed(1)}</span>W</span>
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
}
