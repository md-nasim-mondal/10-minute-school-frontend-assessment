'use server'

import axios from 'axios'
import { ICourseData, ICourseResponse } from '@/types'

// Axios instance with default configuration
const apiClient = axios.create({
  baseURL: 'https://api.10minuteschool.com',
  timeout: 10000,
  headers: {
    'X-TENMS-SOURCE-PLATFORM': 'web',
    'accept': 'application/json',
    'Content-Type': 'application/json',
  },
})

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

/**
 * Get course details data using axios
 * @param courseSlug - Course slug (default: 'ielts-course')
 * @param lang - Language (default: 'en')
 * @returns Promise<ICourseData>
 */
export async function getCourseDetailsData(
  courseSlug: string = 'ielts-course',
  lang: string = 'en'
): Promise<ICourseData> {
  try {
    const response = await apiClient.get<ICourseResponse>(
      `/discovery-service/api/v1/products/${courseSlug}`,
      {
        params: { lang },
      }
    )

    if (response.data.code !== 200) {
      throw new Error(`API Error: ${response.data.message || 'Failed to fetch course data'}`)
    }

    return response.data.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || error.message
      throw new Error(`Failed to fetch course data: ${errorMessage}`)
    }
    throw new Error('An unexpected error occurred while fetching course data')
  }
}

/**
 * Get multiple courses data
 * @param courseSlugs - Array of course slugs
 * @param lang - Language (default: 'en')
 * @returns Promise<ICourseData[]>
 */
export async function getMultipleCoursesData(
  courseSlugs: string[],
  lang: string = 'en'
): Promise<ICourseData[]> {
  try {
    const promises = courseSlugs.map(slug => getCourseDetailsData(slug, lang))
    const results = await Promise.allSettled(promises)
    
    return results
      .filter((result): result is PromiseFulfilledResult<ICourseData> => result.status === 'fulfilled')
      .map(result => result.value)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || error.message
      throw new Error(`Failed to fetch multiple courses: ${errorMessage}`)
    }
    throw new Error('An unexpected error occurred while fetching multiple courses')
  }
}

/**
 * Search courses by query
 * @param query - Search query
 * @param lang - Language (default: 'en')
 * @returns Promise<ICourseResponse>
 */
export async function searchCourses(
  query: string,
  lang: string = 'en'
): Promise<ICourseResponse> {
  try {
    const response = await apiClient.get(
      '/discovery-service/api/v1/search',
      {
        params: { q: query, lang },
      }
    )

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || error.message
      throw new Error(`Search failed: ${errorMessage}`)
    }
    throw new Error('An unexpected error occurred during search')
  }
}