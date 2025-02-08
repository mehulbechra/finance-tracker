"use client";

import DateRangeSelect from "@/components/date-range-select";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function Range() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const range = searchParams.get("range") ?? "last30days";

  const handleChange = (e) => {
    const params = new URLSearchParams();
    params.set("range", e.target.value);
    replace(`${pathname}?${params.toString()}`);
  };

  return <DateRangeSelect value={range} onChange={handleChange} />;
}
