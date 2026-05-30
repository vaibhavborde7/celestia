"use client";

import { useEffect, useState } from "react";

interface Props {
  edge: any;
  theme: string;
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function EdgeDrawer({ edge, theme, onClose, onSave }: Props) {
  const [label, setLabel] = useState("");
  const [relationship, setRelationship] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!edge) return;

    setLabel(edge.data?.label || "");
    setRelationship(edge.data?.relationship || "");
    setNotes(edge.data?.notes || "");
  }, [edge]);

  if (!edge) return null;

  return (
    <div
      className={`
  absolute
  top-0
  right-0
  h-full
  w-[350px]
  border-l
  p-4
  z-50
  ${
    theme === "dark"
      ? "bg-zinc-900 border-zinc-800"
      : "bg-white border-zinc-300"
  }
`}
    >
      <div className="flex justify-between mb-4">
        <h2 className="text-white text-lg font-bold">Edge Details</h2>

        <button onClick={onClose} className="text-xl text-zinc-400">
          ×
        </button>
      </div>

      <div className="space-y-4">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Time (3 days)"
          className={`
  w-full
  p-2
  rounded
  ${theme === "dark" ? "bg-zinc-800 text-white" : "bg-zinc-100 text-black"}
`}
        />

        <input
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
          placeholder="Relationship"
          className={`
  w-full
  p-2
  rounded
  ${theme === "dark" ? "bg-zinc-800 text-white" : "bg-zinc-100 text-black"}
`}
        />

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes"
          className={`
  w-full
  p-2
  rounded
  ${theme === "dark" ? "bg-zinc-800 text-white" : "bg-zinc-100 text-black"}
`}
        />

        <button
          onClick={() =>
            onSave({
              label,
              relationship,
              notes,
            })
          }
          className="
            w-full
            bg-blue-500
            text-white
            p-2
            rounded
          "
        >
          Save
        </button>
      </div>
    </div>
  );
}
