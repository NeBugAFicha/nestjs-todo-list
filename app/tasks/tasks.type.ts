export type Type = {
  create: {
    param: {
      task_list_id: number;
    };
    body: {
      name: string;
    };
  };
  findById: {
    param: {
      task_list_id: number;
      id: number;
    };
  };
  delete: {
    param: {
      task_list_id: number;
      id: number;
    };
  };
  update: {
    param: {
      task_list_id: number;
      id: number;
    };
    body: {
      name: string;
    };
  };
};
