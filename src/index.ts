declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}

import './card/beautiful-battery-card';

const CARD_TYPE = 'beautiful-battery';

window.customCards = (window.customCards ?? []) as Array<Record<string, unknown>>;
(window.customCards as Array<Record<string, unknown>>).push({
  type: CARD_TYPE,
  name: 'Beautiful Battery',
  description: '3D liquid glass battery visualization with smooth animations',
  icon: 'mdi:battery',
  preview: true,
});
