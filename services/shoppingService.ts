import type { ShoppingSuggestion } from '../types';
import { GOOGLE_API_KEY, SEARCH_ENGINE_ID } from '@/lib/env';

const API_ENDPOINT = 'https://www.googleapis.com/customsearch/v1';

export const findSimilarItems = async (query: string): Promise<ShoppingSuggestion[]> => {
  if (!GOOGLE_API_KEY || !SEARCH_ENGINE_ID) {
    const errorMessage = "Google API Key or Search Engine ID is not configured. Set VITE_GOOGLE_API_KEY and VITE_SEARCH_ENGINE_ID in your environment.";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  const params = new URLSearchParams({
    key: GOOGLE_API_KEY,
    cx: SEARCH_ENGINE_ID,
    q: query,
    searchType: "image",
    imgSize: "large",
    safe: "active",
    num: "10", // API expects a string for the 'num' parameter
  });

  try {
    const response = await fetch(`${API_ENDPOINT}?${params.toString()}`);
    
    if (!response.ok) {
      let errorMessage = `Google API responded with status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData?.error?.message) {
          errorMessage = errorData.error.message;
        }
      } catch (e) {
        // Response was not JSON, stick with the status code message.
      }
      throw new Error(errorMessage);
    }
    
    const data = await response.json();

    if (!data.items) {
      return []; // No results found
    }

    // Map the Google API response to our application's ShoppingSuggestion type
    const mappedItems: ShoppingSuggestion[] = data.items
      .map((item: any) => ({
        name: item.title,
        image_url: item.link, // For image search, item.link is the image URL
        product_page_url: item.image?.contextLink, // The page the image is on
      }))
      .filter((item: ShoppingSuggestion | null): item is ShoppingSuggestion => 
        item !== null && item.product_page_url != null && item.image_url != null
      );

    return mappedItems;

  } catch (error) {
    console.error('Failed to fetch similar items from Google API:', error);
    // Propagate the error to be handled by the UI component
    throw error;
  }
};
