import { Suspense } from "react"
import { getCourseDetailsData } from '@/actions/course-actions'
import CoursePageClient from '@/components/client-pages/course-page-client'
import { ICourseData } from '@/types'
import { Metadata } from 'next'

interface IProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { searchParams }: IProps
): Promise<Metadata> {
  const resolvedSearchParams = await searchParams
  const lang = (resolvedSearchParams.lang as string) || 'en'
  const slug = 'ielts-course'
  
  try {
    const courseData = await getCourseDetailsData(slug, lang)
    
    return {
      title: courseData.seo?.title || courseData.title,
      description: courseData.seo?.description || courseData.description.replace(/<[^>]*>/g, '').substring(0, 160),
      keywords: courseData.seo?.keywords?.join(', ') || 'IELTS, English, Course, 10 Minute School',
      openGraph: {
        title: courseData.title,
        description: courseData.description.replace(/<[^>]*>/g, '').substring(0, 160),
        images: [
          {
            url: courseData.media.find(m => m.name === 'thumbnail')?.resource_value || '',
            width: 1200,
            height: 630,
            alt: courseData.title,
          },
        ],
        type: 'website',
        locale: lang === 'bn' ? 'bn_BD' : 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        title: courseData.title,
        description: courseData.description.replace(/<[^>]*>/g, '').substring(0, 160),
        images: [courseData.media.find(m => m.name === 'thumbnail')?.resource_value || ''],
      },
      alternates: {
        canonical: `https://10minuteschool.com/product/${slug}`,
        languages: {
          'en': `https://10minuteschool.com/product/${slug}?lang=en`,
          'bn': `https://10minuteschool.com/product/${slug}?lang=bn`,
        },
      },
      other: {
        ...courseData.seo?.defaultMeta?.reduce((acc, meta) => {
          acc[meta.type] = meta.content
          return acc
        }, {} as Record<string, string>),
      },
    }
  } catch (error) {
    return {
      title: '10 Minute School - Course',
      description: 'Learn with the best online courses in Bangladesh',
    }
  }
}

export default async function CoursePage({ searchParams }: IProps) {
  const resolvedSearchParams = await searchParams
  const lang = (resolvedSearchParams.lang as string) || 'en'
  const slug = 'ielts-course'
  
  let initialData: ICourseData | null = null
  let error: string | null = null
  
  try {
    initialData = await getCourseDetailsData(slug, lang)
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load course data'
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h3 className="text-red-800 font-semibold mb-2">Error loading course</h3>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }
  
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <CoursePageClient initialData={initialData} lang={lang} />
    </Suspense>
  )
}