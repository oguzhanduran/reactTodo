export const apiRoutes = {
    todos: {
      base: "/api/todos",
    },
  } as const;

//  We created separate route file because routes may change, you may need a more dynamic structure.