const sanitize = (value: string | undefined) => value?.trim() ?? '';

export const GEMINI_API_KEY = sanitize(import.meta.env.VITE_GEMINI_API_KEY);
export const GOOGLE_API_KEY = sanitize(import.meta.env.VITE_GOOGLE_API_KEY);
export const SEARCH_ENGINE_ID = sanitize(import.meta.env.VITE_SEARCH_ENGINE_ID);
