"use client";

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
      />

      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
          className="
            px-2
            py-1
            rounded
            bg-zinc-800
            text-white
            text-xs
            border
            border-zinc-700
          "
        >
          <div className="text-center">
  <div>
    {data?.label}
  </div>

  {data?.relationship && (
    <div className="text-[10px] text-zinc-400">
      {data.relationship}
    </div>
  )}
</div>
        </div>
        
      </EdgeLabelRenderer>
    </>
  );
}