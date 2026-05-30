import { create } from "zustand";
import { Node, Edge } from "reactflow";

interface GraphState {
  nodes: Node[];
  edges: Edge[];

  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
}

export const useGraphStore = create<GraphState>((set) => ({
  nodes: [
    {
      id: "1",
      type: "celestia",
      position: { x: 100, y: 100 },
      data: {
        title: "Start",
        status: "active",
      },
    },
  ],

  edges: [],

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
}));