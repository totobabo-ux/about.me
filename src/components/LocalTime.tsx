"use client";

import { useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => {
  const id = setInterval(callback, 10_000);
  return () => clearInterval(id);
};

export function LocalTime({ timeZone }: { timeZone: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () =>
      new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit" }).format(
        Date.now(),
      ),
    () => "--:--",
  );
  return (
    <span suppressHydrationWarning>
      {time} GMT+9
    </span>
  );
}
