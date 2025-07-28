import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  getCourseDetailsData,
  getMultipleCoursesData,
} from "@/actions/course-actions";
import { ICourseData } from "@/types";

interface IUseCourseQueryOptions {
  courseSlug?: string;
  lang?: string;
  queryOptions?: Omit<UseQueryOptions<ICourseData>, "queryKey" | "queryFn">;
}

export const useCourseQuery = ({
  courseSlug = "ielts-course",
  lang = "en",
  queryOptions,
}: IUseCourseQueryOptions = {}) => {
  return useQuery({
    queryKey: ["course", courseSlug, lang],
    queryFn: () => getCourseDetailsData(courseSlug, lang),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    ...queryOptions,
  });
};

// Hook for multiple courses
export const useMultipleCoursesQuery = (
  courseSlugs: string[],
  lang: string = "en"
) => {
  return useQuery({
    queryKey: ["courses", courseSlugs, lang],
    queryFn: () => getMultipleCoursesData(courseSlugs, lang),
    enabled: courseSlugs.length > 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
