const requireEnv = (value: string | undefined, key: string) => {
  if (!value) {
    throw new Error(`${key} environment variable is not set. Please define it in your .env file.`);
  }
  return value;
};

export const GEMINI_API_KEY = requireEnv(import.meta.env.VITE_GEMINI_API_KEY, 'VITE_GEMINI_API_KEY');
export const GOOGLE_API_KEY = requireEnv(import.meta.env.VITE_GOOGLE_API_KEY, 'VITE_GOOGLE_API_KEY');
export const SEARCH_ENGINE_ID = requireEnv(import.meta.env.VITE_SEARCH_ENGINE_ID, 'VITE_SEARCH_ENGINE_ID');
