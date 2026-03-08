// Centralized configuration — reads from environment variables
// Production defaults are in .env, local overrides in .env.local

export const API_BASE_URL =
    process.env.API_BASE_URL || "https://api.bettacool.com/api";

export const SITE_URL =
    process.env.SITE_URL || "https://bettacool.com";

export const DEEP_LINK_SCHEME =
    process.env.DEEP_LINK_SCHEME || "bettacool://";

export const APP_STORE_URL =
    process.env.APP_STORE_URL || "https://apps.apple.com/app/bettacool/id6741442231";

export const PLAY_STORE_URL =
    process.env.PLAY_STORE_URL || "https://play.google.com/store/apps/details?id=com.bettacool.app";
