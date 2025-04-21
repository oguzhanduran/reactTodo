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

export type TodosState = {
  todos: Todo[];
  storageKey: string;
};

export type CategoryState = {
  categories: Category[];
  subCategories: SubCategory[];
  todos: Todo[];
  progress: number;
};

export type OpenCategories = {
  [key: string]: boolean;
};

export type TodoParams = {
  todos: Todo[];
  storageKey: string;
};
