"use client"
import { useEffect, useState, useRef } from "react";
import { Handle, Position, useReactFlow } from "reactflow";

const statusStyles = {
  new: { label: "New", dot: "bg-zinc-500", ring: "" },
  active: { label: "Active", dot: "bg-yellow-500", ring: "ring-2 ring-yellow-500/40" },
  complete: { label: "Complete", dot: "bg-green-500", ring: "ring-2 ring-green-500/40" },
};

export default function CelestiaNode({ id, data }: any) {
  const { setNodes, setEdges } = useReactFlow();

  const [hovered, setHovered] = useState(false);
const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

const handleMouseEnter = () => {
  hoverTimeout.current = setTimeout(() => {
    setHovered(true);
  }, 1800); // delay hover
};

const handleMouseLeave = () => {
  if (hoverTimeout.current) {
    clearTimeout(hoverTimeout.current);
    hoverTimeout.current = null;
  }
  setHovered(false);
};
  const [editing, setEditing] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [progress, setProgress] = useState(0);

  // stable sync
  useEffect(() => {
    setTitle(data?.title ?? "");
    setDescription(data?.description ?? "");
    setDate(data?.date ?? "");
    setProgress(data?.progress ?? 0);
  }, [data]);

  const status =
    progress === 100 ? "complete" : progress > 0 ? "active" : "new";

  const style = statusStyles[status];

  const saveNode = () => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                title,
                description,
                date,
                progress,
                status,
              },
            }
          : node
      )
    );

    setEditing(false);
  };

  const deleteNode = () => {
    setNodes((nds) => nds.filter((n) => n.id !== id));

    setEdges((eds) =>
      eds.filter((e) => e.source !== id && e.target !== id)
    );
  };


  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          border: "1px solid white",
          marginTop: -10,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          boxShadow: "0 0 0 2px #3b82f6",
          transition: "width 0.2s, height 0.2s",
        }}
        className="transition-all duration-200 reactflow-handle-custom"
      />

      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => {
          e.stopPropagation();
          setEditing(true);
          setHovered(true);
        }}
        className={`
          min-w-[240px]
          max-w-[280px]
          rounded-2xl
          border
          backdrop-blur-md
          transition-all
          duration-300
          cursor-pointer
          shadow-xl

          ${
            data.theme === "dark"
              ? "bg-zinc-900 border-zinc-700 text-white"
              : "bg-white border-zinc-300 text-black"
          }

          ${style.ring}

          ${
            hovered
              ? "scale-[1.02]"
              : ""
          }
        `}
      >
        <div className="p-4 relative">
          {/* Collapse/close button */}
          {(hovered || editing) && (
            <button
              onClick={e => {
                e.stopPropagation();
                setHovered(false);
                setEditing(false);
              }}
              className={`
                absolute top-3 right-3 z-20
                w-7 h-7 flex items-center justify-center
                rounded-full
                text-lg
                ${data.theme === "dark"
                  ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                  : "bg-zinc-200 hover:bg-zinc-300 text-zinc-600"
                }
                transition
              `}
              tabIndex={-1}
              aria-label="Collapse"
            >
              ×
            </button>
          )}

          <div className="flex items-center justify-between">
            <div className="font-semibold truncate">
              {title}
            </div>

            <div
              className={`w-2 h-2 rounded-full ${style.dot}`}
            />
          </div>

          <div
            className={`
              text-xs mt-1
              ${
                data.theme === "dark"
                  ? "text-zinc-400"
                  : "text-zinc-500"
              }
            `}
          >
            {style.label}
          </div>

          <div className="mt-3">
            <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
              <div
                className={`
                  h-full
                  transition-all
                  duration-300
                  ${style.dot}
                `}
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <div className="text-xs mt-1">
              {progress}%
            </div>
          </div>

          {(hovered || editing) && (
            <div
              className="
                mt-4
                space-y-3
                animate-in
                fade-in
              "
            >
              {!editing ? (
                <>
                  {description && (
                    <p
                      className="
                        text-sm
                        text-zinc-400
                        whitespace-pre-wrap
                      "
                    >
                      {description}
                    </p>
                  )}

                  {date && (
                    <div className="text-xs text-zinc-500">
                      {date}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <input
                    value={title}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`
                      w-full
                      p-2
                      rounded-lg
                      border
                      ${data.theme === "dark"
                        ? "bg-zinc-800 text-white border-zinc-700"
                        : "bg-zinc-100 text-black border-zinc-300"
                      }
                    `}
                  />

                  <textarea
                    value={description}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className={`
                      w-full
                      p-2
                      rounded-lg
                      border
                      ${data.theme === "dark"
                        ? "bg-zinc-800 text-white border-zinc-700"
                        : "bg-zinc-100 text-black border-zinc-300"
                      }
                    `}
                  />

                  <input
                    type="date"
                    value={date}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => setDate(e.target.value)}
                    className={`
                      w-full
                      p-2
                      rounded-lg
                      border
                      ${data.theme === "dark"
                        ? "bg-zinc-800 text-white border-zinc-700"
                        : "bg-zinc-100 text-black border-zinc-300"
                      }
                    `}
                  />

                  <div>
                    <div className="text-xs mb-1">
                      Progress: {progress}%
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={progress}
                      onClick={(e) =>
                        e.stopPropagation()
                      }
                      onChange={(e) =>
                        setProgress(
                          Number(
                            e.target.value
                          )
                        )
                      }
                      className="
                        w-full
                        accent-blue-500
                      "
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        saveNode();
                      }}
                      className="
                        flex-1
                        bg-blue-500
                        hover:bg-blue-600
                        text-white
                        rounded-lg
                        py-2
                        transition
                      "
                    >
                      Save
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNode();
                      }}
                      className="
                        px-3
                        bg-red-600
                        hover:bg-red-700
                        text-white
                        rounded-lg
                        transition
                      "
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          border: "1px solid white",
          marginBottom: -10,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          boxShadow: "0 0 0 2px #3b82f6",
          transition: "width 0.2s, height 0.2s",
        }}
        className="transition-all duration-200 reactflow-handle-custom"
      />
    </>
  );
}
