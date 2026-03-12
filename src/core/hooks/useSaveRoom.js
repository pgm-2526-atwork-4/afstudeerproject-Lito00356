import { uploadProject } from "@core/modules/projects/api.projects";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSaveRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-room"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });
};
