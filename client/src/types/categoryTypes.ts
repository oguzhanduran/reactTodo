export type Category = {
  id: string;
  name: string;
  openCategories: boolean;
};

export type SubCategory = {
  id: string;
  name: string;
  openCategories: boolean;
  parentId: string;
};

export type Todo = {
  name: string;
  id: string;
  completed: boolean;
  description?: string;
};

export type SubCategoriesState = {
  subCategories: SubCategory[];
  subStorageKey: string;
};

export type TodosState = {
  todos: Todo[];
  storageKey: string;
};

export type ProgressInfo = {
  progress: number;
  currentSubCategoryName?: string;
};

export type CategoryState = {
  categories: Category[];
  subCategories: SubCategory[];
  todos: Todo[];
  progressInfo: ProgressInfo;
};

export type OpenCategories = {
  [key: string]: boolean;
};

export type TodoParams = {
  todos: Todo[];
  storageKey: string;
};
