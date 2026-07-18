/**
 * API Integration Layer
 * 
 * This file acts as the single API service layer for the GuestBook frontend.
 * It provides a reusable HTTP fetch helper with parsed JSON, structured error
 * propagation, and network failure handling, keeping component code clean
 * and avoiding duplicate fetch configurations.
 */

// Read backend URL from environment variables, defaulting to local FastAPI URL if not set
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

/**
 * Reusable helper for fetch requests to centralize headers, response parsing, and error checks.
 * 
 * @param {string} endpoint - The relative API path (e.g. '/api/reviews/')
 * @param {Object} [options={}] - Fetch configuration options (method, headers, body, etc.)
 * @returns {Promise<any>} Parsed JSON response from the server
 */
async function request(endpoint, options = {}) {
  // Ensure we don't duplicate slashes during string concatenation
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_URL}${normalizedEndpoint}`;

  // Default headers to application/json, and merge with any custom headers (e.g., Authorization)
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  // Automatically stringify JSON request bodies if passed as plain objects
  if (config.body && typeof config.body !== 'string') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);

    // Safely parse JSON responses or fallback to text if content type is different
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    // Check if the HTTP status indicates success (status 2xx)
    if (!response.ok) {
      // Build a descriptive, structured error message from FastAPI validation/details payload
      let errorMessage = `API request failed with status ${response.status}.`;

      if (data && typeof data === 'object') {
        if (data.detail) {
          if (typeof data.detail === 'string') {
            errorMessage = data.detail;
          } else if (Array.isArray(data.detail)) {
            // Format FastAPI Pydantic validation errors nicely
            errorMessage = data.detail.map((err) => err.msg || JSON.stringify(err)).join(', ');
          }
        } else if (data.message) {
          errorMessage = data.message;
        }
      } else if (typeof data === 'string' && data.trim()) {
        errorMessage = data;
      }

      const error = new Error(errorMessage);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    // If it's a structured HTTP error thrown by us above, rethrow it directly
    if (error.status) {
      throw error;
    }
    // Otherwise, wrap network failures or fetch aborts into a user-friendly message
    console.error(`Fetch error on endpoint [${config.method || 'GET'} ${endpoint}]:`, error);
    throw new Error(error.message || 'A network error occurred. Please verify your connection or backend server status.');
  }
}

/**
 * AI Endpoints
 */

/**
 * Send a guest review to the backend for AI-powered analysis.
 *
 * The backend returns:
 * - Sentiment
 * - Themes
 * - Summary
 * - Suggested response
 * - Sarcasm detection
 *
 * @param {string} reviewText - Raw guest review text.
 * @returns {Promise<Object>} Structured AI analysis.
 */
export async function analyzeReview(reviewText) {
  return request('/api/ai/analyze-review', {
    method: 'POST',
    body: {
      review: reviewText,
    },
  });
}

/**
 * Reviews Endpoints
 */

/**
 * Retrieve all reviews from the database.
 * 
 * @param {string} [token] - Optional JWT bearer token for authorization
 * @returns {Promise<Array>} Parsed list of review records
 */
export async function getReviews(token) {
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return request('/api/reviews/', {
    method: 'GET',
    headers,
  });
}

/**
 * Create/submit a new guest review to the database.
 * 
 * @param {Object} reviewData - The review payload (guest_name, rating, review, category, sentiment, etc.)
 * @param {string} [token] - Optional JWT bearer token for authorization
 * @returns {Promise<Object>} The created review database record
 */
export async function createReview(reviewData, token) {
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return request('/api/reviews/', {
    method: 'POST',
    headers,
    body: reviewData,
  });
}

/**
 * Fetch all reviews, determine the largest ID, and return the next available ID.
 * 
 * @param {string} [token] - Optional JWT bearer token for authorization
 * @returns {Promise<number>} Next available review ID
 */
export async function getNextReviewId(token) {
  const reviews = await getReviews(token);
  const maxId = reviews.reduce((max, r) => (r.id > max ? r.id : max), 0);
  return maxId + 1;
}
