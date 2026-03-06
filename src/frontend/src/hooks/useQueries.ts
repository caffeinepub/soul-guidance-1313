import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useGetAllInquiries() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["inquiries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInquiries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      contact,
      serviceType,
      message,
    }: {
      name: string;
      contact: string;
      serviceType: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.submitInquiry(name, contact, serviceType, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });
}
