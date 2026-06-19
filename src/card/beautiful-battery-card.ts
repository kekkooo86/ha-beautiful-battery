import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { BatteryConfig, AnimationConfig } from '../types/config';
import type { HomeAssistant } from '../types/hass';

const DEFAULT_ANIMATIONS: AnimationConfig = {
  float: true,
  liquid_movement: true,
};

const DEFAULT_CONFIG: BatteryConfig = {
  type: 'custom:beautiful-battery',
  entity: '',
  show_percentage: true,
  show_voltage: false,
  show_power: false,
  show_status: true,
  animations: { ...DEFAULT_ANIMATIONS },
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
  test_state: null,
  voltage_entity: '',
  power_entity: '',
};

const SIZE_MAP = { small: 140, medium: 200, large: 260 };

const STRINGS: Record<string, { charging: string; discharging: string; idle: string; full: string; empty: string }> = {
  it: { charging: 'In carica', discharging: 'In scarica', idle: 'Inattiva', full: 'Piena', empty: 'Vuota' },
  en: { charging: 'Charging', discharging: 'Discharging', idle: 'Idle', full: 'Full', empty: 'Empty' },
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
  if (pct < 25) return colors.low;
  if (pct < 50) return lerpColor(colors.low, colors.mid, (pct - 25) / 25);
  if (pct < 75) return lerpColor(colors.mid, colors.high, (pct - 50) / 25);
  return lerpColor(colors.high, colors.full, (pct - 75) / 25);
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

    .battery-wrapper.no-float:not(.mouse-active) .battery-outer {
      animation: none;
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
      position: relative;
      z-index: 3;
    }

    .battery-shell {
      position: relative;
      overflow: hidden;
      border-radius: 6px 6px 16px 16px;
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

    .battery-shell::before {
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
      border-radius: 6px 6px 0 0;
      pointer-events: none;
      z-index: 3;
    }

    .battery-shell::after {
      content: '';
      position: absolute;
      top: 16px;
      left: 8px;
      right: 60%;
      height: 6px;
      background: rgba(255, 255, 255, 0.25);
      border-radius: 100px;
      filter: blur(3px);
      pointer-events: none;
      z-index: 4;
    }

    .battery-body {
      position: relative;
    }

    .charge-glow {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100%;
      border-radius: 0 0 16px 16px;
      pointer-events: none;
      z-index: 0;
    }

    .charge-fill {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100%;
      border-radius: 0 0 14px 14px;
      transform-origin: bottom center;
      transition: transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1),
      background 0.8s ease;
      z-index: 1;
      will-change: transform;
    }

    .charge-fill.no-transition {
      transition: none;
    }

    .charge-fill.animating {
      transition: transform 2s cubic-bezier(0.34, 1.56, 0.64, 1),
      background 0.8s ease;
    }

    .charge-fill.breathing {
      animation: bb-breathe 4s ease-in-out infinite;
    }

    .charge-fill.gradient-wave {
      background-size: 100% 200%;
      animation: bb-gradient-flow 6s ease-in-out infinite;
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

    .charging.shimmer-on .charge-fill::before {
      animation: bb-shimmer 2s ease-in-out infinite;
    }

    @keyframes bb-shimmer {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }

    @keyframes bb-breathe {
      0%, 100% { filter: brightness(1); }
      50% { filter: brightness(1.08); }
    }

    @keyframes bb-gradient-flow {
      0%, 100% { background-position: 0% 0%; }
      50% { background-position: 0% 100%; }
    }

    .convection-line {
      position: absolute;
      pointer-events: none;
      z-index: 2;
      opacity: 0.15;
    }

    .convection-line path {
      fill: none;
      stroke: rgba(255, 255, 255, 0.5);
      stroke-width: 0.8;
      stroke-dasharray: 8 12;
      animation: bb-convection-flow 4s linear infinite;
    }

    @keyframes bb-convection-flow {
      0% { stroke-dashoffset: 0; }
      100% { stroke-dashoffset: -40; }
    }

    .caustics-layer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      pointer-events: none;
      z-index: 1;
      opacity: 0.12;
      mix-blend-mode: overlay;
    }

    .electrolysis-spark {
      position: absolute;
      border-radius: 50%;
      background: white;
      pointer-events: none;
      z-index: 3;
      animation: bb-spark 0.8s ease-out infinite;
    }

    @keyframes bb-spark {
      0% { transform: scale(0); opacity: 1; }
      50% { transform: scale(1.5); opacity: 0.8; }
      100% { transform: scale(0); opacity: 0; }
    }

    .battery-body:active {
      transform: scale(0.97);
      transition: transform 0.1s ease;
    }

    :host(.light-theme) .battery-shell {
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

    :host(.light-theme) .battery-shell::before {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, transparent 100%);
    }

    :host(.light-theme) .battery-shell::after {
      background: rgba(255, 255, 255, 0.4);
    }
  `;

  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _config?: BatteryConfig;
  @state() private _chargePercent = 0;
  @state() private _displayPercent = 0;
  @state() private _isCharging = false;
  @state() private _batteryState: 'charging' | 'discharging' | 'idle' = 'idle';
  @state() private _mouseX = 0;
  @state() private _mouseY = 0;
  @state() private _mouseActive = false;
  @state() private _isDark = true;
  @state() private _initialized = false;
  private _particles: Array<{ x: number; y: number; size: number; dur: number; delay: number }> = [];
  private _sparks: Array<{ x: number; y: number; size: number; delay: number }> = [];
  private _convectionPaths: Array<{ d: string; delay: number }> = [];

  static async getConfigElement() {
    await import('../editor/beautiful-battery-editor');
    return document.createElement('beautiful-battery-editor');
  }

  static getStubConfig() {
    return { type: 'custom:beautiful-battery', entity: '' };
  }

  setConfig(config: Record<string, unknown>) {
    const merged = { ...DEFAULT_CONFIG, ...config } as BatteryConfig;
    merged.animations = { ...DEFAULT_ANIMATIONS, ...(config.animations as Partial<AnimationConfig> ?? {}) };
    this._config = merged;
    this._syncState();
  }

  private _anim(key: keyof AnimationConfig): boolean {
    return this._config?.animations?.[key] ?? DEFAULT_ANIMATIONS[key];
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('hass')) {
      this._syncState();
    }
    if (changed.has('_chargePercent') && this._anim('liquid_movement')) {
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

    if (this._config.test_state) {
      this._batteryState = this._config.test_state;
      this._isCharging = this._config.test_state === 'charging';
    } else {
      const power = this._getEntityState(this._config.power_entity);
      if (power !== null) {
        const absPower = Math.abs(power);
        if (absPower < 5) {
          this._batteryState = 'idle';
          this._isCharging = false;
        } else if (power < 0) {
          this._batteryState = 'charging';
          this._isCharging = true;
        } else {
          this._batteryState = 'discharging';
          this._isCharging = false;
        }
      } else {
        this._isCharging = entity.state === 'charging' ||
            (typeof entity.attributes?.battery_charging === 'boolean' && entity.attributes.battery_charging) ||
            entity.attributes?.charging === true;
        this._batteryState = this._isCharging ? 'charging' : 'discharging';
      }
    }

    this._isDark = this.hass.themes?.darkMode !== false;

    if (!this._initialized) {
      this._initialized = true;
      setTimeout(() => { this._displayPercent = this._chargePercent; }, 50);
    } else {
      this._displayPercent = this._chargePercent;
    }

    this._generateParticles();
    this._generateSparks();
    this._generateConvection();
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

  private _generateSparks() {
    this._sparks = Array.from({ length: 6 }, () => ({
      x: 15 + Math.random() * 70,
      y: 10 + Math.random() * 60,
      size: 1 + Math.random() * 2.5,
      delay: Math.random() * 1.5,
    }));
  }

  private _generateConvection() {
    this._convectionPaths = Array.from({ length: 3 }, (_, i) => {
      const x1 = 20 + i * 25;
      const x2 = x1 + 10 + Math.random() * 15;
      const cp1x = x1 + 5 + Math.random() * 10;
      const cp2x = x2 - 5 + Math.random() * 10;
      return {
        d: `M${x1},90 C${cp1x},60 ${cp2x},40 ${x2},10 C${cp2x + 5},40 ${cp1x + 5},60 ${x1 + 3},90`,
        delay: i * 1.2,
      };
    });
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
    if (this._batteryState === 'charging') return t.charging;
    if (this._batteryState === 'idle') return t.idle;
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
    if (!this._anim('liquid_movement')) return;
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

  private _renderPlaceholder() {
    const size = SIZE_MAP[this._config?.size ?? 'medium'];
    const bodyW = size * 0.45;
    const bodyH = size;
    const capW = bodyW * 0.35;
    const capH = 12;
    const color = this._getColor();
    const glowIntensity = clamp(this._config?.glow_intensity ?? 0.8, 0, 1);

    const totalH = bodyH + capH;

    return html`
      <ha-card>
        <div class="battery-wrapper ${!this._anim('float') ? 'no-float' : ''}">
          <div class="battery-outer" style="transform: rotateX(2deg) rotateY(0deg);">
            <div class="drops-area">
              <div class="drops-above"></div>
              <div>
                <div class="battery-shell" style="width:${bodyW}px; height:${totalH}px;">
                  <div class="charge-glow"
                       style="transform: translateY(50%); background: ${color}; opacity: ${glowIntensity}; filter: blur(${12 + glowIntensity * 20}px); box-shadow: 0 0 ${20 + glowIntensity * 30}px ${color};">
                  </div>
                  <div class="charge-fill"
                       style="transform: translateY(50%); background: linear-gradient(0deg, ${color}, ${color}ee);">
                    ${this._anim('liquid_movement') ? html`
                      <svg class="liquid-wave" viewBox="0 0 100 16" preserveAspectRatio="none"
                           style="fill: ${color};">
                        <path d="${this._wavePath()}">
                          <animate attributeName="d"
                                   values="${this._wavePath()};${this._wavePath(1)};${this._wavePath()}"
                                   dur="3s"
                                   repeatCount="indefinite" />
                        </path>
                      </svg>
                    ` : html`
                      <svg class="liquid-wave" viewBox="0 0 100 16" preserveAspectRatio="none"
                           style="fill: ${color};">
                        <path d="${this._wavePath()}" />
                      </svg>
                    `}
                  </div>
                  <div class="battery-cap"
                       style="width:${capW}px; height:${capH}px;">
                    <div class="battery-cap-inner"></div>
                  </div>
                  <div class="battery-body"
                       style="width:${bodyW}px; height:${bodyH}px;">
                  </div>
                </div>
              </div>
              <div class="drops-below"></div>
            </div>
          </div>
          <div class="battery-info">
            <span class="battery-name">Select an entity</span>
            ${this._config?.show_percentage !== false ? html`
              <span class="battery-percentage" style="color: ${color};">50%</span>
            ` : nothing}
          </div>
        </div>
      </ha-card>
    `;
  }

  render() {
    if (!this._config) return html``;
    const entity = this.hass?.states[this._config.entity];
    if (!entity) {
      if (!this._config.entity) {
        return this._renderPlaceholder();
      }
      return html`<ha-card><div class="battery-wrapper"><p>Entity not found</p></div></ha-card>`;
    }

    const pct = this._displayPercent;
    const color = this._getColor();
    const size = SIZE_MAP[this._config.size];
    const bodyW = size * 0.45;
    const bodyH = size;
    const capW = bodyW * 0.35;
    const capH = 12;
    const glowIntensity = clamp(this._config.glow_intensity, 0, 1);

    const voltage = this._getEntityState(this._config.voltage_entity);
    const power = this._getEntityState(this._config.power_entity);

    const liquidOn = this._anim('liquid_movement');
    const rotateX = liquidOn && this._mouseActive ? clamp(this._mouseY * -15, -12, 12) : 0;
    const rotateY = liquidOn && this._mouseActive ? clamp(this._mouseX * 15, -12, 12) : 0;

    const sloshAmplitude = liquidOn && this._mouseActive
        ? 1 + Math.abs(this._mouseX) * 2 + Math.abs(this._mouseY) * 1.5
        : 1;

    const liquidTopPx = bodyH * (1 - pct / 100);

    const dropPositions = [
      { left: '20%', delay: '0s' },
      { left: '45%', delay: '0.6s' },
      { left: '70%', delay: '1.2s' },
    ];

    const fillClasses = [
      'charge-fill',
      !this._initialized && liquidOn ? 'animating' : '',
      !liquidOn ? 'no-transition' : '',
      liquidOn ? 'breathing' : '',
      liquidOn ? 'gradient-wave' : '',
    ].filter(Boolean).join(' ');

    const fillBg = liquidOn
        ? `linear-gradient(180deg, ${color}, ${color}cc, ${color}, ${color}ee)`
        : `linear-gradient(0deg, ${color}, ${color}ee)`;

    const bodyClasses = [
      'battery-body',
      this._batteryState === 'charging' ? 'charging' : '',
      liquidOn && this._batteryState === 'charging' ? 'shimmer-on' : '',
    ].filter(Boolean).join(' ');

    const totalH = bodyH + capH;
    const capLeft = ((bodyW - capW) / 2 / bodyW * 100).toFixed(1);
    const capRight = ((bodyW + capW) / 2 / bodyW * 100).toFixed(1);
    const capBottom = (capH / totalH * 100).toFixed(1);
    const shellClip = `polygon(${capLeft}% 0%, ${capRight}% 0%, ${capRight}% ${capBottom}%, 100% ${capBottom}%, 100% 100%, 0% 100%, 0% ${capBottom}%, ${capLeft}% ${capBottom}%)`;

    return html`
      <ha-card>
        <div class="battery-wrapper ${this._mouseActive ? 'mouse-active' : ''} ${!this._anim('float') ? 'no-float' : ''}"
             @pointermove=${this._onPointerMove}
             @pointerleave=${this._onPointerLeave}
             @click=${this._handleTap}>
          <div class="battery-outer" style="transform: rotateX(${rotateX}deg) rotateY(${rotateY}deg);">

            <div class="drops-area">
              <div class="drops-above">
                ${liquidOn && this._batteryState === 'charging' ? dropPositions.map(d => html`
                  <div class="drop falling-in" style="
                    left: calc(${d.left} - 4px);
                    animation-delay: ${d.delay};
                    --drop-distance: ${totalH + 10}px;
                  ">
                    <div class="drop-inner" style="background: ${color};"></div>
                  </div>
                `) : nothing}
              </div>

              <div>
                <div class="battery-shell" style="width:${bodyW}px; height:${totalH}px;">
                  <div class="charge-glow"
                       style="transform: translateY(${100 - pct}%); background: ${color}; opacity: ${glowIntensity}; filter: blur(${12 + glowIntensity * 20}px); box-shadow: 0 0 ${20 + glowIntensity * 30}px ${color}; clip-path: ${shellClip};">
                  </div>

                  <div class="${fillClasses}"
                       style="transform: translateY(${100 - pct}%); background: ${fillBg}; clip-path: ${shellClip};">
                    ${liquidOn ? html`
                      <svg class="liquid-wave" viewBox="0 0 100 16" preserveAspectRatio="none"
                           style="fill: ${color};">
                        <path d="${this._wavePath(0, sloshAmplitude)}">
                          <animate attributeName="d"
                                   values="${this._wavePath(0, sloshAmplitude)};${this._wavePath(1, sloshAmplitude)};${this._wavePath(0, sloshAmplitude)}"
                                   dur="3s"
                                   repeatCount="indefinite" />
                        </path>
                      </svg>
                    ` : html`
                      <svg class="liquid-wave" viewBox="0 0 100 16" preserveAspectRatio="none"
                           style="fill: ${color};">
                        <path d="${this._wavePath(0, sloshAmplitude)}" />
                      </svg>
                    `}

                    ${liquidOn && pct > 5 ? html`
                      <svg class="convection-line" viewBox="0 0 100 100" preserveAspectRatio="none"
                           style="width:100%;height:100%;left:0;top:0;">
                        ${this._convectionPaths.map(c => html`
                          <path d="${c.d}" style="animation-delay:${c.delay}s;" />
                        `)}
                      </svg>
                    ` : nothing}

                    ${liquidOn && pct > 5 ? html`
                      <svg class="caustics-layer" viewBox="0 0 100 100" preserveAspectRatio="none"
                           style="width:100%;height:${pct}%;left:0;bottom:0;position:absolute;">
                        <filter id="caustics-filter">
                          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="2">
                            <animate attributeName="baseFrequency" values="0.03;0.05;0.03" dur="8s" repeatCount="indefinite" />
                          </feTurbulence>
                          <feDisplacementMap in="SourceGraphic" scale="8" />
                        </filter>
                        <rect width="100" height="100" fill="rgba(255,255,255,0.3)" filter="url(#caustics-filter)" />
                      </svg>
                    ` : nothing}

                    ${liquidOn ? this._particles.map(p => html`
                      <div class="particle" style="
                        left: ${p.x}%;
                        bottom: ${p.y}%;
                        width: ${p.size}px;
                        height: ${p.size}px;
                        animation-duration: ${p.dur}s;
                        animation-delay: ${p.delay}s;
                      "></div>
                    `) : nothing}

                    ${liquidOn && this._batteryState === 'charging' ? this._sparks.map(s => html`
                      <div class="electrolysis-spark" style="
                        left: ${s.x}%;
                        bottom: ${s.y}%;
                        width: ${s.size}px;
                        height: ${s.size}px;
                        animation-delay: ${s.delay}s;
                      "></div>
                    `) : nothing}
                  </div>

                  <div class="battery-cap"
                       style="width:${capW}px; height:${capH}px;">
                    <div class="battery-cap-inner"></div>
                  </div>

                  <div class="${bodyClasses}"
                       style="width:${bodyW}px; height:${bodyH}px;">
                  </div>
                </div>
              </div>

              <div class="drops-below">
                ${liquidOn && this._batteryState === 'discharging' && pct > 5 ? dropPositions.map(d => html`
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
        </div>
      </ha-card>
    `;
  }

  private _wavePath(offset = 0, amplitude = 1): string {
    const pts: string[] = [];
    for (let x = 0; x <= 100; x += 2) {
      const y = 8 + (Math.sin((x + offset * 50) * 0.08) * 4 + Math.sin((x + offset * 30) * 0.15) * 2) * amplitude;
      pts.push(`${x},${y.toFixed(1)}`);
    }
    return `M0,16 L${pts.join(' L')} L100,16 Z`;
  }

  getCardSize() {
    return 3;
  }
}