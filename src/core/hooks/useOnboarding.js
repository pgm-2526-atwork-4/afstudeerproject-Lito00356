import { getOnboarding, saveOnboarding } from "@core/modules/onboarding/api.onboarding";
import useAuth from "@functional/auth/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useOnboarding = (page) => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  const [isClosed, setIsClosed] = useState(false);

  const { data: onboarding, isPending } = useQuery({
    queryKey: ["onboarding", auth.user?.id],
    queryFn: () => getOnboarding(auth.user?.id),
  });

  const progress = onboarding?.progress?.[page] ?? { seen: false, currentStep: 0, completed: false };
  const currentStep = progress.currentStep ?? 0;

  const isVisible = !onboarding?.skipped && !progress.completed && !isPending && !isClosed;

  const updateProgress = useMutation({
    mutationFn: (newProgress) => saveOnboarding(auth.user?.id, newProgress),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["onboarding"] }),
  });

  const nextStep = (maxSteps) => {
    const next = currentStep + 1;
    const completed = next >= maxSteps;

    updateProgress.mutate({
      skipped: onboarding?.skipped ?? false,
      progress: {
        ...onboarding?.progress,
        [page]: { seen: true, currentStep: completed ? currentStep : next, completed },
      },
    });
  };

  const prevStep = () => {
    if (currentStep <= 0) return;

    updateProgress.mutate({
      skipped: onboarding?.skipped ?? false,
      progress: {
        ...onboarding?.progress,
        [page]: { ...progress, currentStep: currentStep - 1, completed: false },
      },
    });
  };

  const skip = (skipForever) => {
    updateProgress.mutate({
      skipped: skipForever,
      progress: onboarding?.progress ?? {},
    });

    close();
  };

  const close = () => setIsClosed(true);
  const reopen = () => {
    setIsClosed(false);

    updateProgress.mutate({
      skipped: false,
      progress: {
        ...onboarding?.progress,
        [page]: { seen: false, currentStep, completed: false },
      },
    });
  };

  const resetPage = () => {
    updateProgress.mutate({
      skipped: onboarding?.skipped ?? false,
      progress: {
        ...onboarding?.progress,
        [page]: { seen: false, currentStep: 0, completed: false },
      },
    });
  };

  return {
    isVisible,
    currentStep,
    nextStep,
    prevStep,
    skip,
    resetPage,
    isPending,
    reopen,
    close,
  };
};
