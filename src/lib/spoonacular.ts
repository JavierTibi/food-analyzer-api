import axios from "axios";

export async function analyzeImage(imageUrl: string) {
  try {
    const { data } = await axios.get('https://api.spoonacular.com/food/images/analyze', {
        params: {
          imageUrl: imageUrl,
          apiKey: process.env.SPOONACULAR_API_KEY,
          includeNutrition: true
        },
      });
    return data;
  } catch (error: any) {
    console.error("Spoonacular error:", error.response?.data || error.message);
    throw new Error("Failed to analyze image with Spoonacular");
  }
}
