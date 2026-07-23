import useExercisesWords from "@/features/exercises/hooks/useExercisesWords";
import { Settings as SettingsComponent } from "@/features/exercises/components/settings/Settings";

function Settings() {
  useExercisesWords();
  return <SettingsComponent />;
}

export default Settings;
