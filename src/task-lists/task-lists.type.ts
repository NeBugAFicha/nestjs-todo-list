export type Type = {
  create: {
    body: {
      name: string;
    };
  };
  findById: {
    param: {
      id: number;
    };
  };
  findAll: {
    query: {
      my_list: boolean;
    };
  };
  delete: {
    param: {
      id: number;
    };
  };
  findAllByList: {
    query: {
      list_id?: number;
    };
  };
};
