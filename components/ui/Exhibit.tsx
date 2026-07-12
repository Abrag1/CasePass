import type { BarListExhibitData, TableExhibitData } from "@/lib/supabase/types";

export function ExhibitCard({
  title,
  kind,
  data,
  dark = false,
}: {
  title: string;
  kind: "bar_list" | "table";
  data: unknown;
  dark?: boolean;
}) {
  return (
    <div
      className={
        dark
          ? "bg-[#262c28] rounded-lg p-4"
          : "border border-(--color-border-soft) rounded-lg p-4"
      }
    >
      <div
        className={`text-[11px] uppercase tracking-wide font-semibold mb-2.5 ${dark ? "text-[#8a958d]" : "text-(--color-muted)"}`}
      >
        {title}
      </div>
      {kind === "bar_list" ? (
        <div className="flex flex-col gap-2">
          {(data as BarListExhibitData).rows.map((r) => (
            <div key={r.label} className="flex items-center gap-3">
              <div className={`w-24 shrink-0 text-[12.5px] ${dark ? "text-[#dbe3dd]" : "text-[#3a3f3b]"}`}>
                {r.label}
              </div>
              <div className={`flex-1 h-2 rounded-full overflow-hidden ${dark ? "bg-[#333a35]" : "bg-(--color-border-soft)"}`}>
                <div
                  className={`h-full rounded-full ${dark ? "bg-[#7fd1a3]" : "bg-(--color-green)"}`}
                  style={{ width: `${r.pct}%` }}
                />
              </div>
              <div className={`w-9 shrink-0 text-right text-[12.5px] font-semibold ${dark ? "text-[#cfe3d7]" : "text-(--color-muted)"}`}>
                {r.pct}%
              </div>
            </div>
          ))}
        </div>
      ) : (
        <table className="w-full text-[13px]">
          <thead>
            <tr>
              {(data as TableExhibitData).columns.map((col) => (
                <th
                  key={col}
                  className={`text-left font-semibold pb-1.5 ${dark ? "text-[#8a958d]" : "text-(--color-muted)"}`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(data as TableExhibitData).rows.map((row, i) => (
              <tr key={i} className={`border-t ${dark ? "border-[#333a35]" : "border-(--color-border-soft)"}`}>
                {row.map((cell, j) => (
                  <td key={j} className={`py-1.5 ${dark ? "text-[#dbe3dd]" : ""}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
