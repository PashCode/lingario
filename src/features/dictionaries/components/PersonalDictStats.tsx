import useDictSnapshot from "@/shared/hooks/useDictSnapshot";
import TestLoader from "@/shared/components/ui/TestLoader";
import type { Oxford3000Values } from "@/features/dictionaries/types";

function PersonalDictStats() {
  const { personalDictionary } = useDictSnapshot<Oxford3000Values>();

  const personalDictionaryStats = {
    allWords: personalDictionary.length,
    newWords: 0,
    inProgress: 0,
    studied: 0,
  };

  if (personalDictionary.length > 0) {
    personalDictionary.forEach((word) => {
      if (word.progress === "new") personalDictionaryStats.newWords++;
      if (word.progress === "in progress") personalDictionaryStats.inProgress++;
      if (word.progress === "studied") personalDictionaryStats.studied++;
    });
  }

  return personalDictionary.length ? (
    <div className="border-2 border-orange-400">
      <h1>-- Усі слова: {personalDictionaryStats.allWords}</h1>
      <h1>-- Нові: {personalDictionaryStats.newWords}</h1>
      <h1>-- В процесі: {personalDictionaryStats.inProgress}</h1>
      <h1>-- Вивчені: {personalDictionaryStats.studied}</h1>
    </div>
  ) : (
    <TestLoader text="Завантаження статистики..." />
  );
}

export default PersonalDictStats;
