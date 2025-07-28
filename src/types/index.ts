interface ErrorItem {
  code?: string;
  message?: string;
}

interface PayloadItem {
  id?: string;
  value?: string;
}

interface SecondaryCtaItem {
  name?: string;
  value?: string;
}

export interface Media {
  name: string;
  resource_type: string;
  resource_value: string;
  thumbnail_url?: string;
}

interface Checklist {
  color: string;
  icon: string;
  id: string;
  list_page_visibility: boolean;
  text: string;
}

interface Seo {
  defaultMeta: Meta[];
  description: string;
  keywords: string[];
  schema: Schema[];
  title: string;
}

interface Meta {
  content: string;
  type: string;
  value: string;
}

interface Schema {
  meta_name: string;
  meta_value: string;
  type: string;
}

export type AboutValue = {
  description: string;
  icon: string;
  id: string;
  title: string;
};
export type FeatureExplanationValue = {
  checklist: string[];
  file_type: string;
  file_url: string;
  id: string;
  title: string;
  video_thumbnail: string;
};
export type FeatureValue = {
  icon: string;
  id: string;
  subtitle: string;
  title: string;
};
export type PointerValue = {
  color: string;
  icon: string;
  id: string;
  text: string;
};

export type InstructorValue = {
  description: string;
  has_instructor_page: boolean;
  image: string;
  name: string;
  short_description: string;
  slug: string;
};

export interface Section {
  type: string;
  name: string;
  description: string;
  bg_color: string;
  order_idx: number;
  values:
    | AboutValue[]
    | PointerValue[]
    | PointerValue[]
    | FeatureValue[]
    | InstructorValue[]
    | FeatureExplanationValue[];
}

export interface CourseData {
  slug: string;
  id: number;
  title: string;
  description: string;
  platform: string;
  type: string;
  modality: string;
  old_info: {
    cat_id: number;
    course_id: number;
    platform: string;
    skills_cat_id: number;
    slug: string;
  };
  start_at: string;
  media: Media[];
  checklist: Checklist[];
  seo: Seo;
  cta_text: {
    name: string;
    value: string;
  };
  sections: Section[];
  is_cohort_based_course: boolean;
  secondary_cta_group: SecondaryCtaItem[];
  delivery_method: string;
}

export interface CourseResponse {
  code: number;
  data: CourseData;
  error: ErrorItem[];
  message: string;
  payload: PayloadItem[];
  status_code: number;
}
