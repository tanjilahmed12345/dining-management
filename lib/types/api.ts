export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
};

export type PaginatedResponse<T> = {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  pageSize: number;
};
