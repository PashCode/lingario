import useExerciseWords from "@/features/exercises/hooks/useExerciseWords";
import { Settings as SettingsComponent } from "@/features/exercises/components/settings/Settings";

function Settings() {
  useExerciseWords();
  return <SettingsComponent />;
}

export default Settings;
