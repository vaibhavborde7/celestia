"use client";

import { useState, useEffect } from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
} from "reactflow";

export default function CelestiaEdge(props: any) {
  const { id, sourceX, sourceY, targetX, targetY, data } = props;

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const [expanded, setExpanded] = useState(false);

  const [label, setLabel] = useState(data?.label || "");
  const [relationship, setRelationship] = useState(data?.relationship || "");
  const [notes, setNotes] = useState(data?.notes || "");

  useEffect(() => {
    setLabel(data?.label || "");
    setRelationship(data?.relationship || "");
    setNotes(data?.notes || "");
  }, [data]);

  const save = () => {
    // optional: emit upward later if needed
    data?.onUpdateEdge?.(id, {
      label,
      relationship,
      notes,
    });

    setExpanded(false);
  };

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: "#3b82f6",
          strokeWidth: 2,
        }}
      />

      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
            minWidth: 0,
          }}
          onClick={(e) => {
            e.stopPropagation();
            setExpanded((prev) => !prev);
          }}
          className={`
            ${!expanded ? "min-w-[110px] max-w-[180px]" : "min-w-[240px] max-w-[280px]"}
            rounded-2xl
            border
            backdrop-blur-md
            transition-all
            duration-300
            shadow-xl
            bg-zinc-900/90
            border-zinc-700
            text-white
            text-xs
            text-center
            cursor-pointer
            relative
            px-3 py-2
            ${expanded ? "z-50" : "z-10"}
          `}
        >
          {!expanded ? (
            <>
              <div className="font-medium truncate">
                {label || "Link"}
              </div>
              {relationship && (
                <div className="text-[10px] text-zinc-400 truncate">
                  {relationship}
                </div>
              )}
            </>
          ) : (
            <div
              className="space-y-3 text-left pt-14"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Collapse/close button */}
              <button
                onClick={() => setExpanded(false)}
                className="
                  absolute top-2 right-3 z-20
                  w-8 h-8 flex items-center justify-center
                  rounded-full
                  text-lg
                  bg-zinc-800 hover:bg-zinc-700 text-zinc-300
                  transition
                  shadow
                "
                tabIndex={-1}
                aria-label="Collapse"
              >
                ×
              </button>

              {/* Delete button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  data?.onDeleteEdge?.(id);
                }}
                className="
                  absolute top-3 left-3 z-20
                  w-7 h-7 flex items-center justify-center
                  rounded-full
                  text-lg
                  bg-red-600 hover:bg-red-700 text-white
                  transition
                  shadow
                "
                tabIndex={-1}
                aria-label="Delete"
              >
                🗑
              </button>

              <input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Label"
                className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />

              <input
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                placeholder="Relationship"
                className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Notes"
                className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />

              <div className="flex gap-2 pt-1">
                <button
                  onClick={save}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 transition shadow"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}