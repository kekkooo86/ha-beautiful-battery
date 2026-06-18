export interface BatteryConfig {
  type: string;
  entity: string;
  name?: string;
  icon?: string;
  theme: 'liquid-glass' | 'solid';
  orientation: 'vertical' | 'horizontal';
  show_percentage: boolean;
  show_voltage: boolean;
  show_power: boolean;
  show_status: boolean;
  charge_colors: {
    low: string;
    mid: string;
    high: string;
    full: string;
  };
  size: 'small' | 'medium' | 'large';
  animation_speed: number;
  glow_intensity: number;
}
