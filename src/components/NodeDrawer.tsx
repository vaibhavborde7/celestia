"use client";

import { useState, useEffect } from "react";

interface Props {
  node: any;
  theme: string;
  onClose: () => void;
  onSave: (data: any) => void;
  onDelete: () => void;
}

export default function NodeDrawer({
  node,
  theme,
  onClose,
  onSave,
  onDelete,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] =
    useState("new");
    const [progress, setProgress] =
  useState(0);

  useEffect(() => {
    if (!node) return;

    setProgress(
  node.data.progress || 0
);
    setTitle(node.data.title || "");
    setDescription(
      node.data.description || ""
    );
    setDate(node.data.date || "");
    setStatus(node.data.status || "new");
  }, [node]);

  if (!node) return null;

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
      <div className="flex items-center justify-between mb-4">
        <h2
          className={`text-lg font-bold ${
            theme === "dark"
              ? "text-white"
              : "text-black"
          }`}
        >
          Node Details
        </h2>

        <button
          onClick={onClose}
          className="
            text-zinc-400
            hover:text-zinc-600
            text-xl
          "
        >
          ×
        </button>
      </div>

      <div className="space-y-4">

        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          placeholder="Title"
          className={`
            w-full
            p-2
            rounded
            ${
              theme === "dark"
                ? "bg-zinc-800 text-white"
                : "bg-zinc-100 text-black"
            }
          `}
        />

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          placeholder="Description"
          className={`
            w-full
            p-2
            rounded
            ${
              theme === "dark"
                ? "bg-zinc-800 text-white"
                : "bg-zinc-100 text-black"
            }
          `}
        />

        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
          className={`
            w-full
            p-2
            rounded
            ${
              theme === "dark"
                ? "bg-zinc-800 text-white"
                : "bg-zinc-100 text-black"
            }
          `}
        />

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className={`
            w-full
            p-2
            rounded
            ${
              theme === "dark"
                ? "bg-zinc-800 text-white"
                : "bg-zinc-100 text-black"
            }
          `}
        >
          <option value="new">
            New
          </option>

          <option value="explored">
            Explored
          </option>

          <option value="active">
            Active
          </option>

          <option value="complete">
            Complete
          </option>
        </select>
 <input
  type="range"
  min="0"
  max="100"
  value={progress}
  onChange={(e) =>
    setProgress(
      Number(e.target.value)
    )
  }
/>

<div>
  {progress}%
</div>
        <button
          onClick={() =>
            onSave({
              title,
              description,
              date,
              status,
            })
          }
          className="
            w-full
            bg-blue-500
            text-white
            rounded
            p-2
          "
        >
          Save
        </button>

        <button
          onClick={onDelete}
          className="
            w-full
            bg-red-600
            text-white
            rounded
            p-2
          "
        >
          Delete Node
        </button>

        <button
          onClick={onClose}
          className="
            w-full
            bg-zinc-700
            text-white
            rounded
            p-2
          "
        >
          Close
        </button>

      </div>
    </div>
  );
}