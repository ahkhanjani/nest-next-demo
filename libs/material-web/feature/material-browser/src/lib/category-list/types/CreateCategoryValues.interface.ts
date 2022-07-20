export interface CreateCategoryFormikValues {
  title: string;
}

export interface CreateCategoryServiceValues
  extends CreateCategoryFormikValues {
  parentId: string;
}
