"use client";

import { useEffect, useState } from "react";

import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
} from "reactflow";

export default function CelestiaEdge(props: any) {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    data,
  } = props;

  const [editing, setEditing] =
    useState(false);

  const [label, setLabel] =
    useState("");

  const [relationship, setRelationship] =
    useState("");

  const [notes, setNotes] =
    useState("");

  useEffect(() => {
    setLabel(data?.label || "");
    setRelationship(
      data?.relationship || ""
    );
    setNotes(data?.notes || "");
  }, [data]);

  const saveEdge = () => {
    data?.onUpdateEdge?.(id, {
      label,
      relationship,
      notes,
    });

    setEditing(false);
  };

  const deleteEdge = () => {
    data?.onDeleteEdge?.(id);
  };

  const [edgePath, labelX, labelY] =
    getBezierPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });

  return (
    <>
      <BaseEdge
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
          }}
          onClick={(e) => {
            e.stopPropagation();
            setEditing(true);
          }}
          className="
            min-w-[180px]
            rounded-xl
            bg-zinc-900
            border
            border-zinc-700
            text-white
            shadow-xl
            p-3
            cursor-pointer
            transition-all
            duration-200
            hover:scale-105
          "
        >
          {!editing ? (
            <>
              <div className="font-medium text-center">
                {label || "Link"}
              </div>

              {relationship && (
                <div
                  className="
                    text-xs
                    text-zinc-400
                    mt-1
                    text-center
                  "
                >
                  {relationship}
                </div>
              )}

              {notes && (
                <div
                  className="
                    text-[10px]
                    text-zinc-500
                    mt-2
                    whitespace-pre-wrap
                  "
                >
                  {notes}
                </div>
              )}

              <div
                className="
                  text-[10px]
                  text-zinc-600
                  mt-2
                  text-center
                "
              >
                Click to edit
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <input
                value={label}
                onChange={(e) =>
                  setLabel(
                    e.target.value
                  )
                }
                className="
                  w-full
                  p-2
                  rounded-lg
                  bg-zinc-800
                  border
                  border-zinc-700
                  text-sm
                "
                placeholder="Duration"
              />

              <input
                value={relationship}
                onChange={(e) =>
                  setRelationship(
                    e.target.value
                  )
                }
                className="
                  w-full
                  p-2
                  rounded-lg
                  bg-zinc-800
                  border
                  border-zinc-700
                  text-sm
                "
                placeholder="Relationship"
              />

              <textarea
                rows={3}
                value={notes}
                onChange={(e) =>
                  setNotes(
                    e.target.value
                  )
                }
                className="
                  w-full
                  p-2
                  rounded-lg
                  bg-zinc-800
                  border
                  border-zinc-700
                  text-sm
                "
                placeholder="Notes"
              />

              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    saveEdge();
                  }}
                  className="
                    flex-1
                    bg-blue-500
                    hover:bg-blue-600
                    text-white
                    py-2
                    rounded-lg
                  "
                >
                  Save
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteEdge();
                  }}
                  className="
                    px-3
                    bg-red-600
                    hover:bg-red-700
                    text-white
                    rounded-lg
                  "
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}