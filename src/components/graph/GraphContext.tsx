"use client";

import {
  createContext,
  useContext,
} from "react";

type GraphContextType = {
  updateNode: (
    id: string,
    data: any
  ) => void;

  deleteNode: (
    id: string
  ) => void;

  updateEdge: (
    id: string,
    data: any
  ) => void;

  deleteEdge: (
    id: string
  ) => void;
};

export const GraphContext =
  createContext<GraphContextType>({
    updateNode: () => {},
    deleteNode: () => {},
    updateEdge: () => {},
    deleteEdge: () => {},
  });

export const useGraph =
  () => useContext(GraphContext);