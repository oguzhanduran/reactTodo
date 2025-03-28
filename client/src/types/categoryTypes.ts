export type Category = {
    id: string;
    name: string;
    open: boolean;
  };

  export type CategoryState = {
    categories: Category[];
  };