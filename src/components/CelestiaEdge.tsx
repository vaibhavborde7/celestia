// "use client";

// import { useEffect, useState } from "react";

// import {
//   BaseEdge,
//   EdgeLabelRenderer,
//   getBezierPath,
// } from "reactflow";

// export default function CelestiaEdge(props: any) {
//   const {
//     id,
//     sourceX,
//     sourceY,
//     targetX,
//     targetY,
//     data,
//   } = props;

//   const [editing, setEditing] =
//     useState(false);

//   const [label, setLabel] =
//     useState("");

//   const [relationship, setRelationship] =
//     useState("");

//   const [notes, setNotes] =
//     useState("");

//   useEffect(() => {
//     setLabel(data?.label || "");
//     setRelationship(
//       data?.relationship || ""
//     );
//     setNotes(data?.notes || "");
//   }, [data]);

//   const saveEdge = () => {
//     data?.onUpdateEdge?.(id, {
//       label,
//       relationship,
//       notes,
//     });

//     setEditing(false);
//   };

//   const deleteEdge = () => {
//     data?.onDeleteEdge?.(id);
//   };

//   const [edgePath, labelX, labelY] =
//     getBezierPath({
//       sourceX,
//       sourceY,
//       targetX,
//       targetY,
//     });

//   return (
//     <>
//       <BaseEdge
//         path={edgePath}
//         style={{
//           stroke: "#3b82f6",
//           strokeWidth: 2,
//         }}
//       />

//       <EdgeLabelRenderer>
//         <div
//           style={{
//             position: "absolute",
//             transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
//             pointerEvents: "all",
//             zIndex: editing ? 1000 : 10,
//           }}
//           onClick={(e) => {
//             e.stopPropagation();
//             setEditing(true);
//           }}
//           className={`
//             rounded-lg
//             border
//             text-white
//             shadow-lg
//             p-3
//             cursor-pointer
//             transition-all
//             duration-200
//             ${
//               editing
//                 ? "min-w-[220px] bg-blue-950 border-blue-700"
//                 : "min-w-[160px] bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
//             }
//           `}
//         >
//           {!editing ? (
//             <div className="space-y-1">
//               <div className="font-semibold text-sm">
//                 {label || "Link"}
//               </div>

//               {relationship && (
//                 <div
//                   className="
//                     text-xs
//                     text-blue-300
//                   "
//                 >
//                   {relationship}
//                 </div>
//               )}

//               {notes && (
//                 <div
//                   className="
//                     text-xs
//                     text-zinc-400
//                     whitespace-pre-wrap
//                     max-h-16
//                     overflow-y-auto
//                   "
//                 >
//                   {notes}
//                 </div>
//               )}

//               <div
//                 className="
//                   text-[11px]
//                   text-zinc-500
//                   mt-2
//                 "
//               >
//                 Click to edit
//               </div>
//             </div>
//           ) : (
//             <div className="space-y-2">
//               <input
//                 value={label}
//                 onChange={(e) =>
//                   setLabel(
//                     e.target.value
//                   )
//                 }
//                 className="
//                   w-full
//                   p-2
//                   rounded
//                   bg-zinc-900
//                   border
//                   border-zinc-600
//                   text-sm
//                   text-white
//                   placeholder-zinc-500
//                 "
//                 placeholder="Duration"
//               />

//               <input
//                 value={relationship}
//                 onChange={(e) =>
//                   setRelationship(
//                     e.target.value
//                   )
//                 }
//                 className="
//                   w-full
//                   p-2
//                   rounded
//                   bg-zinc-900
//                   border
//                   border-zinc-600
//                   text-sm
//                   text-white
//                   placeholder-zinc-500
//                 "
//                 placeholder="Relationship"
//               />

//               <textarea
//                 rows={2}
//                 value={notes}
//                 onChange={(e) =>
//                   setNotes(
//                     e.target.value
//                   )
//                 }
//                 className="
//                   w-full
//                   p-2
//                   rounded
//                   bg-zinc-900
//                   border
//                   border-zinc-600
//                   text-sm
//                   text-white
//                   placeholder-zinc-500
//                   resize-none
//                 "
//                 placeholder="Notes"
//               />

//               <div className="flex gap-2">
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     saveEdge();
//                   }}
//                   className="
//                     flex-1
//                     bg-blue-600
//                     hover:bg-blue-500
//                     text-white
//                     py-1.5
//                     rounded
//                     text-sm
//                     font-medium
//                     transition-colors
//                   "
//                 >
//                   Save
//                 </button>

//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     deleteEdge();
//                   }}
//                   className="
//                     flex-1
//                     bg-red-600
//                     hover:bg-red-500
//                     text-white
//                     py-1.5
//                     rounded
//                     text-sm
//                     font-medium
//                     transition-colors
//                   "
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </EdgeLabelRenderer>
//     </>
//   );
// }

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
          }}
          onClick={(e) => {
            e.stopPropagation();
            setExpanded((prev) => !prev);
          }}
          className="
            px-3 py-2
            rounded-xl
            bg-zinc-900/90
            backdrop-blur-md
            text-white
            text-xs
            border border-zinc-700
            shadow-lg
            min-w-[110px]
            text-center
            cursor-pointer
          "
        >
          {!expanded ? (
            <>
              <div className="font-medium">
                {label || "Link"}
              </div>

              {relationship && (
                <div className="text-[10px] text-zinc-400">
                  {relationship}
                </div>
              )}
            </>
          ) : (
            <div
              className="space-y-2 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Label"
                className="w-full px-2 py-1 rounded bg-zinc-800 border border-zinc-700"
              />

              <input
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                placeholder="Relationship"
                className="w-full px-2 py-1 rounded bg-zinc-800 border border-zinc-700"
              />

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Notes"
                className="w-full px-2 py-1 rounded bg-zinc-800 border border-zinc-700"
              />

              <div className="flex gap-2">
                <button
                  onClick={save}
                  className="flex-1 bg-blue-500 rounded px-2 py-1"
                >
                  Save
                </button>

                <button
                  onClick={() => setExpanded(false)}
                  className="flex-1 bg-zinc-700 rounded px-2 py-1"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}