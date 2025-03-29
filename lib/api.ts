// This file contains utility functions for making API calls to the Flask service

/**
 * Submit a review for sentiment analysis
 * @param reviewData The review data to analyze
 * @returns The sentiment analysis result
 */
export async function analyzeSentiment(reviewData: {
    orderId: string
    farmId: string
    farmName: string
    customerName: string
    rating: number
    comment: string
  }) {
    try {
      // Replace with your Google Colab Flask service URL
      const response = await fetch("https://your-colab-flask-service-url/analyze-sentiment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: reviewData.rating,
          comment: reviewData.comment,
        }),
      })
  
      if (!response.ok) {
        throw new Error("Failed to analyze sentiment")
      }
  
      const data = await response.json()
      return data.sentiment // 'positive', 'neutral', or 'negative'
    } catch (error) {
      console.error("Error analyzing sentiment:", error)
  
      // Fallback to simple rating-based sentiment if API fails
      if (reviewData.rating >= 4) {
        return "positive"
      } else if (reviewData.rating >= 3) {
        return "neutral"
      } else {
        return "negative"
      }
    }
  }
  
  /**
   * Get sentiment summary for a farm's reviews
   * @param farmId The farm ID to get sentiment summary for
   * @param reviews The reviews to analyze
   * @returns The sentiment summary percentages
   */
  export async function getSentimentSummary(farmId: string, reviews: any[]) {
    try {
      // Replace with your Google Colab Flask service URL
      const response = await fetch("https://your-colab-flask-service-url/sentiment-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          farmId,
          reviews: reviews.map((review) => ({
            rating: review.rating,
            comment: review.comment,
          })),
        }),
      })
  
      if (!response.ok) {
        throw new Error("Failed to get sentiment summary")
      }
  
      const data = await response.json()
      return {
        positive: data.positive,
        neutral: data.neutral,
        negative: data.negative,
      }
    } catch (error) {
      console.error("Error getting sentiment summary:", error)
  
      // Fallback to simple calculation if API fails
      let positive = 0
      let neutral = 0
      let negative = 0
  
      reviews.forEach((review) => {
        if (review.rating >= 4) {
          positive++
        } else if (review.rating >= 3) {
          neutral++
        } else {
          negative++
        }
      })
  
      const total = reviews.length || 1 // Avoid division by zero
  
      return {
        positive: Math.round((positive / total) * 100),
        neutral: Math.round((neutral / total) * 100),
        negative: Math.round((negative / total) * 100),
      }
    }
  }
  
  