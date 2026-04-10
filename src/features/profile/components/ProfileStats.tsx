import type { ProfileStatsProps } from "@/features/profile/types";

function ProfileStats({ oxford3000, personalDictionary }: ProfileStatsProps) {
  const inProgress = personalDictionary.filter((word) => word.progress === "studied");

  return (
    <div>
      <h1>
        Oxford: {`${personalDictionary.length || 0} / ${oxford3000.length || 0} додано`}
      </h1>
      <h1>
        Personal: {`${inProgress.length || 0} / ${personalDictionary.length || 0} вивчено`}
      </h1>
    </div>
  );
}

export default ProfileStats;
