import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRequest } from "./utils/request";


export const useGetCategories = (token) => {
  const request = useRequest();   

  return useQuery({
    queryKey: ["get_categories", token],
    enabled: !!token,
    queryFn: ({ signal }) =>
      request
        .get("/category")
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        }),
  });
};

export const useGetMemos = (categoryId, isOpen) => {
  const request = useRequest();   
  return useQuery({
    queryKey: ["get_memos", categoryId],
    enabled: !!categoryId && isOpen,
    queryFn: ({ signal }) =>
      request
        .get(`/memo?category_id=${categoryId}`)
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        }),
  });
};

export const useGetMemo = (memoId) => {
  const request = useRequest();   
  return useQuery({
    queryKey: ["get_memo", memoId],
    enabled: !!memoId,
    queryFn: ({ signal }) =>
      request
        .get(`/memo/${memoId}`)
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        }),
  });
};



export const useAddMemo = (categoryId) => {
  const request = useRequest();  
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) =>
      request
        .post(`/memo`, values)
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
              queryKey: ['get_memos', categoryId],
            });
          },
  });
};

export const useUpdateMemo = (memoId) => {
  const request = useRequest();  
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) =>
      request
        .put(`/memo/${memoId}`, values)
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
              queryKey: ['get_memo', memoId],
            });
          },
  });
};

export const useDeleteMemo = (categoryId, memoId) => {
  const request = useRequest();  
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) =>
      request
        .delete(`/memo/${memoId}`)
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
              queryKey: ['get_memos', categoryId],
            });
          },
  });
};