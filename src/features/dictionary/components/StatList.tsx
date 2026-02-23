import type { StatListProps } from "@/features/dictionary/types";

function StatList({ oxford3000Total, oxford3000Added }: StatListProps) {
  const levels = ["A1", "A2", "B1", "B2"] as const;

  return levels.map((level) => {
    return (
      <h1 key={level}>
        {level}: {oxford3000Added[level]} / {oxford3000Total[level]} <br />
        -- Завершено на:{" "}
        {((oxford3000Added[level] / oxford3000Total[level]) * 100).toFixed(1)}%
      </h1>
    );
  });
}

export default StatList;
