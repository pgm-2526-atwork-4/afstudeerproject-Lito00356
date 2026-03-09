import { getOnboarding, saveOnboarding } from "@core/modules/onboarding/api.onboarding";
import useAuth from "@functional/auth/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useOnboarding = (page) => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  const { data: onboarding } = useQuery({
    queryKey: ["onboarding", auth.user?.id],
    queryFn: () => getOnboarding(auth.user?.id),
  });

  const progress = onboarding?.progress?.[page] ?? { seen: false, currentStep: 0 };
  const isVisible = !progress.complted && !onboarding?.skipped;
  const currentStep = progress.currentStep ?? 0;

  const updateStep = useMutation({
    mutationFn: (newProgress) => saveOnboarding(auth.user?.id, newProgress),
    onSuccess: () => queryClient.invalidateQueries(["onboarding"]),
  });

  const nextStep = (maxSteps) => {
    const next = currentStep + 1;
    const completed = next >= maxSteps;

    updateStep.mutate({
      ...onboarding?.progress,
      [page]: { seen: true, currentStep: next, completed },
    });
  };

  const skip = () => {
    updateStep.mutate({ skipped: true });
  };

  return { isVisible, currentStep, nextStep, skip };
};
