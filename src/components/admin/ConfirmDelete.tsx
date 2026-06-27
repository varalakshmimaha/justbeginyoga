"use client";

import { useState } from "react";

export default function ConfirmDelete({
  id,
  action,
  label = "Delete",
}: {
  id: number;
  action: (data: FormData) => void;
  label?: string;
}) {
  const [confirming, setConfirming] = useState(false);
  if (!confirming) {
    return (
      <button type="button" onClick={() => setConfirming(true)} className="text-[13px] text-muted hover:text-red-600">
        {label}
      </button>
    );
  }
  return (
    <form action={action} className="inline-flex items-center gap-2">
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="rounded-lg bg-red-600 px-3 py-1.5 text-[12px] font-medium text-white hover:bg-red-700">Confirm</button>
      <button type="button" onClick={() => setConfirming(false)} className="text-[12px] text-muted">Cancel</button>
    </form>
  );
}
