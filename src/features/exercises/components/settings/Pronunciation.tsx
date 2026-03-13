import Input from "@/shared/components/ui/Input";
import type { VoiceSettingsValues } from "@/features/exercises/types";

function Pronunciation({
  voiceSettings,
  setVoiceSettings,
}: VoiceSettingsValues) {
  return (
    <div className="border-2 border-green-800">
      <form className="flex gap-2">
        <Input
          id="female-pronounce"
          htmlFor="female-pronounce"
          name="female-pronounce"
          checked={voiceSettings.gender === "FEMALE"}
          labelText="Жіночий"
          type="radio"
          onChange={() => {
            setVoiceSettings({
              ...voiceSettings,
              voice: "en-US-Neural2-H",
              gender: "FEMALE",
            });
          }}
        />

        <Input
          id="male-pronounce"
          htmlFor="male-pronounce"
          name="male-pronounce"
          checked={voiceSettings.gender === "MALE"}
          labelText="Чоловічий"
          type="radio"
          onChange={() => {
            setVoiceSettings({
              ...voiceSettings,
              voice: "en-US-Neural2-D",
              gender: "MALE",
            });
          }}
        />
      </form>
    </div>
  );
}

export default Pronunciation;
