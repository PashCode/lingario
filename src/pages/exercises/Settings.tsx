import useExercisesWords from "@/features/exercises/hooks/useExercisesWords";
import { Settings as SettingsComponent } from "@/features/exercises/components/settings/Settings";
import GlobalLoading from "@/shared/components/ui/GlobalLoading";

function Settings() {
  const isPersonalDictLoading = useExercisesWords();

  if (isPersonalDictLoading) {
    return <GlobalLoading text="Завантаження слів" />;
  }

  return <SettingsComponent />;
}

export default Settings;
