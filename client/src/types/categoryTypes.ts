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
};

export type SubCategoriesState = {
  subCategories: SubCategory[];
  subStorageKey: string;
};

export type CategoryState = {
  categories: Category[];
  subCategories: SubCategory[];
  todos: Todo[];
};

export type OpenCategories = {
  [key: string]: boolean;
};
