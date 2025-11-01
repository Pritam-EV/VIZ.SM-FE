
// ============================================
// frontend/src/utils/constants.js
// ============================================

/**
 * Application constants
 */

export const APP_NAME = 'Smart Meter';
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
export const MQTT_BROKER_URL = process.env.REACT_APP_MQTT_BROKER_URL || 'ws://localhost:8883';

export const USER_ROLES = {
  USER: 'user',
  PARTNER: 'partner',
  ADMIN: 'admin',
};

export const DEVICE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DISCONNECTED: 'disconnected',
  MAINTENANCE: 'maintenance',
};

export const BUTTON_VARIANTS = ['primary', 'secondary', 'danger', 'ghost', 'success', 'warning'];
export const BUTTON_SIZES = ['sm', 'md', 'lg'];

export const CARD_VARIANTS = ['default', 'outlined', 'elevated', 'flat'];
export const CARD_SIZES = ['sm', 'md', 'lg'];

export const TOAST_TYPES = ['success', 'error', 'warning', 'info'];
