export interface TapAction {
  action: 'more-info' | 'toggle' | 'call-service' | 'navigate' | 'none';
  service?: string;
  service_data?: Record<string, unknown>;
  target?: { entity_id?: string; device_id?: string; area_id?: string };
  navigation_path?: string;
}

export interface AnimationConfig {
  float: boolean;
  liquid_movement: boolean;
}

export interface BatteryConfig {
  type: string;
  entity: string;
  name?: string;
  show_percentage: boolean;
  show_voltage: boolean;
  show_power: boolean;
  show_status: boolean;
  animations: AnimationConfig;
  charge_colors: {
    low: string;
    mid: string;
    high: string;
    full: string;
  };
  size: 'tiny' | 'small' | 'medium' | 'large';
  glow_intensity: number;
  tap_action: TapAction;
  language: 'auto' | 'it' | 'en';
  test_override: number | null;
  test_state: 'charging' | 'discharging' | 'idle' | null;
  voltage_entity: string;
  power_entity: string;
}
