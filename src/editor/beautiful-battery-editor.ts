import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { BatteryConfig } from '../types/config';
import type { HomeAssistant } from '../types/hass';

@customElement('beautiful-battery-editor')
class BeautifulBatteryEditor extends LitElement {
  static styles = css`
    .editor {
      padding: 16px;
    }
    .section {
      margin-bottom: 16px;
    }
    .section-title {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 8px;
      color: var(--primary-text-color);
    }
    .field {
      display: flex;
      flex-direction: column;
      margin-bottom: 12px;
    }
    .field-label {
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color);
      margin-bottom: 4px;
    }
    input, select {
      padding: 8px 12px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font-size: 14px;
    }
    input:focus, select:focus {
      outline: none;
      border-color: var(--primary-color);
    }
    .toggle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 0;
    }
    .toggle-label {
      font-size: 13px;
      color: var(--primary-text-color);
    }
  `;

  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _config: BatteryConfig = {
    type: 'custom:beautiful-battery',
    entity: '',
    theme: 'liquid-glass',
    orientation: 'vertical',
    show_percentage: true,
    show_voltage: false,
    show_power: false,
    show_status: true,
    charge_colors: { low: '#ff4444', mid: '#ffaa00', high: '#44cc44', full: '#00ddff' },
    size: 'medium',
    animation_speed: 1.2,
    glow_intensity: 0.8,
  };

  setConfig(config: Record<string, unknown>) {
    this._config = { ...this._config, ...config } as BatteryConfig;
  }

  render() {
    if (!this.hass) return html``;
    const entities = Object.keys(this.hass.states)
      .filter(id => id.startsWith('sensor.') || id.startsWith('battery.'))
      .sort();

    return html`
      <div class="editor">
        <section class="section">
          <div class="section-title">Entity</div>
          <div class="field">
            <label class="field-label">Battery sensor</label>
            <select .value=${this._config.entity} @change=${(e: Event) => this._update('entity', (e.target as HTMLSelectElement).value)}>
              <option value="">Select entity...</option>
              ${entities.map(id => html`<option value=${id} ?selected=${id === this._config.entity}>${id}</option>`)}
            </select>
          </div>
          <div class="field">
            <label class="field-label">Display name</label>
            <input type="text" .value=${this._config.name ?? ''} placeholder="Optional name"
                   @input=${(e: Event) => this._update('name', (e.target as HTMLInputElement).value)} />
          </div>
        </section>

        <section class="section">
          <div class="section-title">Appearance</div>
          <div class="field">
            <label class="field-label">Orientation</label>
            <select .value=${this._config.orientation} @change=${(e: Event) => this._update('orientation', (e.target as HTMLSelectElement).value)}>
              <option value="vertical">Vertical</option>
              <option value="horizontal">Horizontal</option>
            </select>
          </div>
          <div class="field">
            <label class="field-label">Size</label>
            <select .value=${this._config.size} @change=${(e: Event) => this._update('size', (e.target as HTMLSelectElement).value)}>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div class="field">
            <label class="field-label">Animation speed</label>
            <input type="range" min="0" max="3" step="0.1" .value=${String(this._config.animation_speed)}
                   @input=${(e: Event) => this._update('animation_speed', Number((e.target as HTMLInputElement).value))} />
          </div>
          <div class="field">
            <label class="field-label">Glow intensity</label>
            <input type="range" min="0" max="1" step="0.05" .value=${String(this._config.glow_intensity)}
                   @input=${(e: Event) => this._update('glow_intensity', Number((e.target as HTMLInputElement).value))} />
          </div>
        </section>

        <section class="section">
          <div class="section-title">Display</div>
          <div class="toggle">
            <span class="toggle-label">Show percentage</span>
            <input type="checkbox" .checked=${this._config.show_percentage}
                   @change=${(e: Event) => this._update('show_percentage', (e.target as HTMLInputElement).checked)} />
          </div>
          <div class="toggle">
            <span class="toggle-label">Show status</span>
            <input type="checkbox" .checked=${this._config.show_status}
                   @change=${(e: Event) => this._update('show_status', (e.target as HTMLInputElement).checked)} />
          </div>
          <div class="toggle">
            <span class="toggle-label">Show voltage</span>
            <input type="checkbox" .checked=${this._config.show_voltage}
                   @change=${(e: Event) => this._update('show_voltage', (e.target as HTMLInputElement).checked)} />
          </div>
          <div class="toggle">
            <span class="toggle-label">Show power</span>
            <input type="checkbox" .checked=${this._config.show_power}
                   @change=${(e: Event) => this._update('show_power', (e.target as HTMLInputElement).checked)} />
          </div>
        </section>

        <section class="section">
          <div class="section-title">Colors</div>
          <div class="field">
            <label class="field-label">Low (0-25%)</label>
            <input type="color" .value=${this._config.charge_colors.low}
                   @input=${(e: Event) => this._updateColor('low', (e.target as HTMLInputElement).value)} />
          </div>
          <div class="field">
            <label class="field-label">Mid (25-50%)</label>
            <input type="color" .value=${this._config.charge_colors.mid}
                   @input=${(e: Event) => this._updateColor('mid', (e.target as HTMLInputElement).value)} />
          </div>
          <div class="field">
            <label class="field-label">High (50-85%)</label>
            <input type="color" .value=${this._config.charge_colors.high}
                   @input=${(e: Event) => this._updateColor('high', (e.target as HTMLInputElement).value)} />
          </div>
          <div class="field">
            <label class="field-label">Full (85-100%)</label>
            <input type="color" .value=${this._config.charge_colors.full}
                   @input=${(e: Event) => this._updateColor('full', (e.target as HTMLInputElement).value)} />
          </div>
        </section>
      </div>
    `;
  }

  private _update(key: string, value: unknown) {
    this._config = { ...this._config, [key]: value };
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config }, bubbles: true, composed: true }));
  }

  private _updateColor(key: string, value: string) {
    this._config = { ...this._config, charge_colors: { ...this._config.charge_colors, [key]: value } };
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config }, bubbles: true, composed: true }));
  }
}
