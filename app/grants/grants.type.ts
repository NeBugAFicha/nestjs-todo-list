export type Type = {
  grant: {
    param: {
      task_list_id: number;
    };
    query: {
      grant: string;
      user_id: number;
      take_off: boolean;
    };
  };
};
