"use client";

import { Handle, Position } from "reactflow";

const statusStyles = {
  new: {
    label: "New",
    dot: "bg-zinc-500",
  },
  explored: {
    label: "Explored",
    dot: "bg-blue-500",
  },
  active: {
    label: "Active",
    dot: "bg-yellow-500",
  },
  complete: {
    label: "Complete",
    dot: "bg-green-500",
  },
};

export default function CelestiaNode({ data }: any) {
  const status =
    statusStyles[data.status as keyof typeof statusStyles] ??
    statusStyles.new;
    {
  data.progress !== undefined && (
    <div className="mt-2">
      <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500"
          style={{
            width: `${data.progress}%`,
          }}
        />
      </div>

      <div className="text-xs mt-1">
        {data.progress}%
      </div>
    </div>
  )
}

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
      />

      <div
        className={`
          min-w-[180px]
          rounded-xl
          border
          px-4
          py-3
          shadow-lg
          transition-all
          duration-300

          ${
            data.theme === "dark"
              ? "bg-zinc-900 border-zinc-700 text-white"
              : "bg-white border-zinc-300 text-black"
          }

          ${
            data.status === "complete"
              ? "ring-2 ring-green-500 shadow-green-500/30"
              : ""
          }
        `}
      >
        <div className="font-semibold">
          {data.title}
        </div>

        <div
          className={`
            mt-2
            flex
            items-center
            gap-2
            text-xs
            ${
              data.theme === "dark"
                ? "text-zinc-300"
                : "text-zinc-600"
            }
          `}
        >
          <div
            className={`w-2 h-2 rounded-full ${status.dot}`}
          />

          {status.label}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
      />
    </>
  );
}