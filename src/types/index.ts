interface IErrorItem {
  code?: string;
  message?: string;
}

interface IPayloadItem {
  id?: string;
  value?: string;
}

interface ISecondaryCtaItem {
  name?: string;
  value?: string;
}

export interface IMedia {
  name: string;
  resource_type: string;
  resource_value: string;
  thumbnail_url?: string;
}

interface IChecklist {
  color: string;
  icon: string;
  id: string;
  list_page_visibility: boolean;
  text: string;
}

interface IMeta {
  content: string;
  type: string;
  value: string;
}

interface ISchema {
  meta_name: string;
  meta_value: string;
  type: string;
}

interface ISeo {
  defaultMeta: IMeta[];
  description: string;
  keywords: string[];
  schema: ISchema[];
  title: string;
}

export type IAboutValue = {
  description: string;
  icon: string;
  id: string;
  title: string;
};

export type IFeatureExplanationValue = {
  checklist: string[];
  file_type: string;
  file_url: string;
  id: string;
  title: string;
  video_thumbnail: string;
};

export type IFeatureValue = {
  icon: string;
  id: string;
  subtitle: string;
  title: string;
};

export type IPointerValue = {
  color: string;
  icon: string;
  id: string;
  text: string;
};

export type IInstructorValue = {
  description: string;
  has_instructor_page: boolean;
  image: string;
  name: string;
  short_description: string;
  slug: string;
};

export interface ISection {
  type: string;
  name: string;
  description: string;
  bg_color: string;
  order_idx: number;
  values:
    | IAboutValue[]
    | IPointerValue[]
    | IFeatureValue[]
    | IInstructorValue[]
    | IFeatureExplanationValue[];
}

export interface ICourseData {
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
  media: IMedia[];
  checklist: IChecklist[];
  seo: ISeo;
  cta_text: {
    name: string;
    value: string;
  };
  sections: ISection[];
  is_cohort_based_course: boolean;
  secondary_cta_group: ISecondaryCtaItem[];
  delivery_method: string;
}

export interface ICourseResponse {
  code: number;
  data: ICourseData;
  error: IErrorItem[];
  message: string;
  payload: IPayloadItem[];
  status_code: number;
}

// Language types
export type ILanguage = "en" | "bn";

export interface ILanguageContextType {
  language: ILanguage;
  setLanguage: (lang: ILanguage) => void;
  t: (key: string) => string;
}
