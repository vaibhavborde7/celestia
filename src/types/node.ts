export type NodeStatus =
  | "new"
  | "explored"
  | "active"
  | "complete";

export interface CelestiaNodeData {
  title: string;
  description: string;
  date: string;
  status: NodeStatus;
}