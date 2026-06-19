import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { BatteryConfig } from '../types/config';
import type { HomeAssistant } from '../types/hass';

const DEFAULT_EDITOR_CONFIG: BatteryConfig = {
  type: 'custom:beautiful-battery',
  entity: '',
  theme: 'liquid-glass',
  show_percentage: true,
  show_voltage: false,
  show_power: false,
  show_status: true,
  show_particles: true,
  charge_colors: { low: '#ff4444', mid: '#ffaa00', high: '#44cc44', full: '#00ddff' },
  size: 'medium',
  glow_intensity: 0.8,
  tap_action: { action: 'more-info' },
  language: 'auto',
  test_override: null,
  voltage_entity: '',
  power_entity: '',
};

const STRINGS: Record<string, Record<string, string>> = {
  it: {
    entity: 'Entita',
    battery_sensor: 'Sensore batteria',
    display_name: 'Nome visualizzato',
    appearance: 'Aspetto',
    theme: 'Tema',
    theme_liquid: 'Vetro liquido',
    theme_solid: 'Solido',
    size: 'Dimensione',
    size_small: 'Piccolo (140px)',
    size_medium: 'Medio (200px)',
    size_large: 'Grande (260px)',
    glow: 'Intensita bagliore',
    display: 'Visualizzazione',
    show_pct: 'Mostra percentuale',
    show_status: 'Mostra stato',
    show_voltage: 'Mostra voltaggio',
    show_power: 'Mostra potenza',
    show_particles: 'Mostra particelle',
    voltage_entity: 'Entita voltaggio',
    power_entity: 'Entita potenza',
    language: 'Lingua',
    lang_auto: 'Automatica (da HA)',
    interaction: 'Interazione',
    tap_action: 'Azione al tocco',
    tap_more: 'Piu info',
    tap_toggle: 'Toggle',
    tap_none: 'Nessuna',
    test_override: 'Override test percentuale',
    test_off: 'Disabilitato (usa entita)',
    test_reset: 'Reset',
    colors: 'Colori',
    color_low: 'Basso 0%',
    color_mid: 'Medio 25%',
    color_high: 'Alto 50%',
    color_full: 'Pieno 85%',
  },
  en: {
    entity: 'Entity',
    battery_sensor: 'Battery sensor',
    display_name: 'Display name',
    appearance: 'Appearance',
    theme: 'Theme',
    theme_liquid: 'Liquid Glass',
    theme_solid: 'Solid',
    size: 'Size',
    size_small: 'Small (140px)',
    size_medium: 'Medium (200px)',
    size_large: 'Large (260px)',
    glow: 'Glow intensity',
    display: 'Display',
    show_pct: 'Show percentage',
    show_status: 'Show status',
    show_voltage: 'Show voltage',
    show_power: 'Show power',
    show_particles: 'Show particles',
    voltage_entity: 'Voltage entity',
    power_entity: 'Power entity',
    language: 'Language',
    lang_auto: 'Auto (from HA)',
    interaction: 'Interaction',
    tap_action: 'Tap action',
    tap_more: 'More Info',
    tap_toggle: 'Toggle',
    tap_none: 'None',
    test_override: 'Test percentage override',
    test_off: 'Disabled (using entity)',
    test_reset: 'Reset',
    colors: 'Colors',
    color_low: 'Low 0%',
    color_mid: 'Mid 25%',
    color_high: 'High 50%',
    color_full: 'Full 85%',
  },
};

@customElement('beautiful-battery-editor')
class BeautifulBatteryEditor extends LitElement {
  static styles = css`
    .editor {
      padding: 16px;
    }
    .section {
      margin-bottom: 20px;
    }
    .section-title {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 12px;
      color: var(--primary-text-color);
    }
    .field {
      display: flex;
      flex-direction: column;
      margin-bottom: 16px;
    }
    .field-label {
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color);
      margin-bottom: 4px;
    }
    select {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font-size: 14px;
      font-family: inherit;
    }
    select:focus {
      outline: none;
      border-color: var(--primary-color);
    }
    ha-switch {
      margin: 4px 0;
    }
    .toggle-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 0;
    }
    .toggle-label {
      font-size: 13px;
      color: var(--primary-text-color);
    }
    .color-row {
      display: flex;
      gap: 12px;
      align-items: center;
    }
    .color-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      flex: 1;
    }
    .color-item label {
      font-size: 10px;
      color: var(--secondary-text-color);
    }
    .color-item input[type="color"] {
      width: 40px;
      height: 32px;
      padding: 2px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      background: var(--card-background-color);
      cursor: pointer;
    }
    .test-override {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .test-override input[type="range"] {
      flex: 1;
    }
    .test-override .value {
      font-size: 12px;
      color: var(--secondary-text-color);
      min-width: 40px;
      text-align: right;
    }
  `;

  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _config: BatteryConfig = { ...DEFAULT_EDITOR_CONFIG };

  setConfig(config: Record<string, unknown>) {
    this._config = { ...DEFAULT_EDITOR_CONFIG, ...config } as BatteryConfig;
  }

  private _t(key: string): string {
    const lang = this._config.language === 'auto'
      ? (this.hass?.locale?.language ?? this.hass?.language ?? 'en')
      : this._config.language;
    return STRINGS[lang]?.[key] ?? STRINGS.en[key] ?? key;
  }

  render() {
    if (!this.hass) return html``;

    return html`
      <div class="editor">
        <section class="section">
          <div class="section-title">${this._t('entity')}</div>
          <div class="field">
            <ha-selector
              .hass=${this.hass}
              .value=${this._config.entity}
              .selector=${{ entity: { device_class: 'battery' } }}
              .label=${this._t('battery_sensor')}
              .required=${false}
              @value-changed=${(e: Event) => this._update('entity', (e as CustomEvent).detail?.value ?? '')}
            ></ha-selector>
          </div>
          <div class="field">
            <label class="field-label">${this._t('display_name')}</label>
            <input type="text" .value=${this._config.name ?? ''}
                   @input=${(e: Event) => this._update('name', (e.target as HTMLInputElement).value || undefined)} />
          </div>
        </section>

        <section class="section">
          <div class="section-title">${this._t('appearance')}</div>
          <div class="field">
            <label class="field-label">${this._t('theme')}</label>
            <select .value=${this._config.theme}
                    @change=${(e: Event) => this._update('theme', (e.target as HTMLSelectElement).value)}>
              <option value="liquid-glass">${this._t('theme_liquid')}</option>
              <option value="solid">${this._t('theme_solid')}</option>
            </select>
          </div>
          <div class="field">
            <label class="field-label">${this._t('size')}</label>
            <select .value=${this._config.size}
                    @change=${(e: Event) => this._update('size', (e.target as HTMLSelectElement).value)}>
              <option value="small">${this._t('size_small')}</option>
              <option value="medium">${this._t('size_medium')}</option>
              <option value="large">${this._t('size_large')}</option>
            </select>
          </div>
          <div class="field">
            <label class="field-label">${this._t('glow')}: ${this._config.glow_intensity.toFixed(2)}</label>
            <input type="range" min="0" max="1" step="0.05" .value=${String(this._config.glow_intensity)}
                   @input=${(e: Event) => this._update('glow_intensity', Number((e.target as HTMLInputElement).value))} />
          </div>
        </section>

        <section class="section">
          <div class="section-title">${this._t('display')}</div>
          <div class="toggle-row">
            <div><div class="toggle-label">${this._t('show_pct')}</div></div>
            <ha-switch .checked=${this._config.show_percentage}
              @change=${(e: Event) => this._update('show_percentage', (e.target as HTMLInputElement).checked)}
            ></ha-switch>
          </div>
          <div class="toggle-row">
            <div><div class="toggle-label">${this._t('show_status')}</div></div>
            <ha-switch .checked=${this._config.show_status}
              @change=${(e: Event) => this._update('show_status', (e.target as HTMLInputElement).checked)}
            ></ha-switch>
          </div>
          <div class="toggle-row">
            <div><div class="toggle-label">${this._t('show_voltage')}</div></div>
            <ha-switch .checked=${this._config.show_voltage}
              @change=${(e: Event) => this._update('show_voltage', (e.target as HTMLInputElement).checked)}
            ></ha-switch>
          </div>
          ${this._config.show_voltage ? html`
            <div class="field">
              <ha-selector
                .hass=${this.hass}
                .value=${this._config.voltage_entity}
                .selector=${{ entity: { device_class: 'voltage' } }}
                .label=${this._t('voltage_entity')}
                .required=${false}
                @value-changed=${(e: Event) => this._update('voltage_entity', (e as CustomEvent).detail?.value ?? '')}
              ></ha-selector>
            </div>
          ` : ''}
          <div class="toggle-row">
            <div><div class="toggle-label">${this._t('show_power')}</div></div>
            <ha-switch .checked=${this._config.show_power}
              @change=${(e: Event) => this._update('show_power', (e.target as HTMLInputElement).checked)}
            ></ha-switch>
          </div>
          ${this._config.show_power ? html`
            <div class="field">
              <ha-selector
                .hass=${this.hass}
                .value=${this._config.power_entity}
                .selector=${{ entity: { device_class: 'power' } }}
                .label=${this._t('power_entity')}
                .required=${false}
                @value-changed=${(e: Event) => this._update('power_entity', (e as CustomEvent).detail?.value ?? '')}
              ></ha-selector>
            </div>
          ` : ''}
          <div class="toggle-row">
            <div><div class="toggle-label">${this._t('show_particles')}</div></div>
            <ha-switch .checked=${this._config.show_particles}
              @change=${(e: Event) => this._update('show_particles', (e.target as HTMLInputElement).checked)}
            ></ha-switch>
          </div>
        </section>

        <section class="section">
          <div class="section-title">${this._t('language')}</div>
          <div class="field">
            <select .value=${this._config.language}
                    @change=${(e: Event) => this._update('language', (e.target as HTMLSelectElement).value)}>
              <option value="auto">${this._t('lang_auto')}</option>
              <option value="it">Italiano</option>
              <option value="en">English</option>
            </select>
          </div>
        </section>

        <section class="section">
          <div class="section-title">${this._t('interaction')}</div>
          <div class="field">
            <label class="field-label">${this._t('tap_action')}</label>
            <select .value=${this._config.tap_action.action}
                    @change=${(e: Event) => this._updateTapAction((e.target as HTMLSelectElement).value)}>
              <option value="more-info">${this._t('tap_more')}</option>
              <option value="toggle">${this._t('tap_toggle')}</option>
              <option value="none">${this._t('tap_none')}</option>
            </select>
          </div>
        </section>

        <section class="section">
          <div class="section-title">${this._t('test_override')}</div>
          <div class="field">
            <label class="field-label">
              ${this._config.test_override != null ? `${this._config.test_override}%` : this._t('test_off')}
            </label>
            <div class="test-override">
              <button style="background:none;border:none;color:var(--primary-color);cursor:pointer;font-size:12px;padding:4px 0;"
                      @click=${() => this._update('test_override', null)}>
                ${this._t('test_reset')}
              </button>
              <input type="range" min="0" max="100" step="1"
                     .value=${String(this._config.test_override ?? 50)}
                     @input=${(e: Event) => this._update('test_override', Number((e.target as HTMLInputElement).value))} />
              <span class="value">${this._config.test_override != null ? this._config.test_override + '%' : 'Off'}</span>
            </div>
          </div>
        </section>

        <section class="section">
          <div class="section-title">${this._t('colors')}</div>
          <div class="color-row">
            <div class="color-item">
              <label>${this._t('color_low')}</label>
              <input type="color" .value=${this._config.charge_colors.low}
                     @input=${(e: Event) => this._updateColor('low', (e.target as HTMLInputElement).value)} />
            </div>
            <div class="color-item">
              <label>${this._t('color_mid')}</label>
              <input type="color" .value=${this._config.charge_colors.mid}
                     @input=${(e: Event) => this._updateColor('mid', (e.target as HTMLInputElement).value)} />
            </div>
            <div class="color-item">
              <label>${this._t('color_high')}</label>
              <input type="color" .value=${this._config.charge_colors.high}
                     @input=${(e: Event) => this._updateColor('high', (e.target as HTMLInputElement).value)} />
            </div>
            <div class="color-item">
              <label>${this._t('color_full')}</label>
              <input type="color" .value=${this._config.charge_colors.full}
                     @input=${(e: Event) => this._updateColor('full', (e.target as HTMLInputElement).value)} />
            </div>
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

  private _updateTapAction(action: string) {
    this._config = { ...this._config, tap_action: { action: action as BatteryConfig['tap_action']['action'] } };
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config }, bubbles: true, composed: true }));
  }
}
