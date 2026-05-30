"use client";

import {
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";

import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow
} from "reactflow";

import "reactflow/dist/style.css";

import CelestiaNode from "./CelestiaNode";
import CelestiaEdge from "./CelestiaEdge";

const nodeTypes = {
  celestia: CelestiaNode,
};
const edgeTypes = {
  celestia: CelestiaEdge,
};

const defaultNodes = [
  {
    id: "1",
    type: "celestia",
    position: { x: 0, y: 0 },
   data: {
  title: "Start",
  description: "",
  date: "",
  progress: 0,
  status: "new",
  expanded: false,
  theme: "dark",
},
  },
];

function Flow() {
  const { screenToFlowPosition } =
  useReactFlow();
  const [contextMenu, setContextMenu] =
  useState<{
    x: number;
    y: number;
  } | null>(null);

  const [nodes, setNodes, onNodesChange] =
    useNodesState(defaultNodes);
const [edges, setEdges, onEdgesChange] =
  useEdgesState<any>([]);
const [theme, setTheme] =
  useState("dark");
  const [loaded, setLoaded] =
    useState(false);

  useEffect(() => {
  const savedTheme =
    localStorage.getItem(
      "celestia-theme"
    );

  if (savedTheme) {
    setTheme(savedTheme);
  }
}, []);
useEffect(() => {
  localStorage.setItem(
    "celestia-theme",
    theme
  );
}, [theme]);
  // Load saved graph
  useEffect(() => {
    const savedNodes =
      localStorage.getItem(
        "celestia-nodes"
      );

    const savedEdges =
      localStorage.getItem(
        "celestia-edges"
      );

    if (savedNodes) {
      setNodes(JSON.parse(savedNodes));
    }

    if (savedEdges) {
  setEdges(
    JSON.parse(savedEdges).map((edge: any) => ({
      ...edge,
      data: {
        ...edge.data,
        onUpdateEdge,
        onDeleteEdge,
      },
    }))
  );
}

    setLoaded(true);
  }, [setNodes, setEdges]);
  // ensure node status reflects progress whenever nodes change
 
  // Save nodes
  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(
      "celestia-nodes",
      JSON.stringify(nodes)
    );
  }, [nodes, loaded]);
//theme
  useEffect(() => {
  setNodes((nds) =>
    nds.map((node) => ({
      ...node,
      data: {
        ...node.data,
        theme,
      },
    }))
  );
}, [theme]);
  // Save edges
  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(
      "celestia-edges",
      JSON.stringify(edges)
    );
  }, [edges, loaded]);

  const fileInputRef =
  useRef<HTMLInputElement>(null);
 const createNodeAtPosition = (
  screenX: number,
  screenY: number
) => {
  const position =
    screenToFlowPosition({
      x: screenX,
      y: screenY,
    });

  const id = Date.now().toString();

  setNodes((nds) => [
    ...nds,
    {
      id,
      type: "celestia",
      position,
     data: {
  title: "Untitled",
  description: "",
  date: "",
  progress: 0,
  status: "new",
  expanded: false,
  theme,

  
}
    },
  ]);
};
const onConnect = useCallback((params: any) => {
  const id = `${params.source}-${params.target}-${Date.now()}`;

  setEdges((eds) =>
    addEdge(
      {
        ...params,
        id,
        type: "celestia",
        data: {
          label: "1 day",
          relationship: "",
          notes: "",
          expanded: false,
          onUpdateEdge,
          onDeleteEdge,
        },
      },
      eds
    )
  );
}, []);
 
  const createNode = () => {
    const id = Date.now().toString();

    const newNode = {
      id,
      type: "celestia",
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
    data: {
  title: "Untitled",
  description: "",
  date: "",
  progress: 0,
  status: "new",
  expanded: false,
  theme,


}
    };

    setNodes((nds) => [
      ...nds,
      newNode,
    ]);
  };
  const onUpdateNode = (
  id: string,
  updatedData: any
) => {
  setNodes((nds) =>
    nds.map((node) =>
      node.id === id
        ? {
            ...node,
            data: {
              ...node.data,
              ...updatedData,
            },
          }
        : node
    )
  );
};

const onDeleteNode = (
  id: string
) => {
  setNodes((nds) =>
    nds.filter(
      (node) => node.id !== id
    )
  );

  setEdges((eds) =>
    eds.filter(
      (edge) =>
        edge.source !== id &&
        edge.target !== id
    )
  );
};

const onUpdateEdge = (id: string, updated: any) => {
  setEdges((eds) =>
    eds.map((edge) =>
      edge.id === id
        ? {
            ...edge,
            data: {
              ...edge.data,
              ...updated,
            },
          }
        : edge
    )
  );
};

const onDeleteEdge = (id: string) => {
  setEdges((eds) =>
    eds.filter((edge) => edge.id !== id)
  );
};

  return (

   <div
  className={`w-full h-full relative ${
    theme === "dark"
      ? "bg-zinc-950"
      : "bg-zinc-100"
  }`}
  onClick={() => {
  setContextMenu(null);
}}
  onContextMenu={(e) => {
    e.preventDefault();

    setContextMenu({
      x: e.clientX,
      y: e.clientY,
    });
  }}
>

  <div
    className="
      absolute
      top-4
      left-4
      z-50
      flex
      gap-2
    "
  >
 

    <button
      onClick={() => {
        const graph = {
          nodes,
          edges,
        };

        const blob = new Blob(
          [JSON.stringify(graph, null, 2)],
          {
            type: "application/json",
          }
        );

        const url =
          URL.createObjectURL(blob);

        const a =
          document.createElement("a");

        a.href = url;
        a.download =
          "celestia-graph.json";

        a.click();

        URL.revokeObjectURL(url);
      }}
      className={`
    px-4
    py-2
    rounded-lg
    border
    ${theme === "dark"
      ? "bg-zinc-700 text-white border-transparent hover:border-white"
      : "bg-white text-black border-zinc-300 hover:border-black"
    }
    transition
  `}
    >
      Export
    </button>
    <button
  onClick={() => fileInputRef.current?.click()}
  className={`
    px-4
    py-2
    rounded-lg
    border
    ${theme === "dark"
      ? "bg-zinc-700 text-white border-transparent hover:border-white"
      : "bg-white text-black border-zinc-300 hover:border-black"
    }
    transition
  `}
>
  Import
</button>
    <button
  onClick={() =>
    setTheme((prev) =>
      prev === "dark"
        ? "light"
        : "dark"
    )
  }
 className={`
  px-4
  py-2
  rounded-lg
  ${
    theme === "dark"
      ? "bg-zinc-700 text-white"
      : "bg-white text-black border border-zinc-300"
  }
`}
>
  {theme === "dark"
    ? "☀️"
    : "🌙"}
</button>
  </div>
<input
  ref={fileInputRef}
  type="file"
  accept=".json"
  className="hidden"
  
  onChange={(event) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onload = (e) => {
      try {
        const graph =
          JSON.parse(
            e.target?.result as string
          );

       if (graph.nodes) {
  setNodes(
    graph.nodes.map((node: any) => ({
      ...node,
      data: {
        progress: 0,
        status: "new",
        expanded: false,
        theme,
        ...node.data,
      },
    }))
  );
}

   if (graph.edges) {
  setEdges(
    graph.edges.map((edge: any) => ({
      ...edge,
      data: {
        label: "1 day",
        relationship: "",
        notes: "",
        expanded: false,
        onUpdateEdge,
        onDeleteEdge,
        ...edge.data,
      },
    }))
  );
}
      } catch {
        alert(
          "Invalid graph file"
        );
      }
    };

    reader.readAsText(file);
  }}
/>
{contextMenu && (
  <div
    style={{
      left: contextMenu.x,
      top: contextMenu.y,
    }}
    className={`
  absolute
  z-[100]
  rounded-lg
  shadow-xl
  overflow-hidden
  ${
    theme === "dark"
      ? "bg-zinc-900 border border-zinc-700"
      : "bg-white border border-zinc-300"
  }
`}
  >
    <button
      onClick={() => {
        createNodeAtPosition(
          contextMenu.x,
          contextMenu.y
        );

        setContextMenu(null);
      }}
      className={`
  px-4
  py-2
  ${
    theme === "dark"
      ? "text-white hover:bg-zinc-800"
      : "text-black hover:bg-zinc-100"
  }
`}
    >
      Create Node
    </button>
  </div>
)}
      <ReactFlow
// <ReactFlow
  nodes={nodes}
  edges={edges}
  nodeTypes={nodeTypes}
  edgeTypes={edgeTypes}
  key={`flow-${theme}`}
  fitView
  onNodesChange={onNodesChange}
  onEdgesChange={onEdgesChange}
  onConnect={onConnect}
  deleteKeyCode={["Backspace", "Delete"]}
  defaultEdgeOptions={{
    type: "celestia",
  }}
        
      >
        <Background
  color={
    theme === "dark"
      ? "#444"
      : "#bbb"
  }
/>
        <Controls />
        <MiniMap
  pannable
  zoomable
  nodeColor={n =>
    theme === "dark"
      ? n.data?.status === "complete"
        ? "#22c55e" // green-500
        : n.data?.status === "active"
        ? "#eab308" // yellow-500
        : "#71717a" // zinc-500
      : n.data?.status === "complete"
        ? "#22c55e"
        : n.data?.status === "active"
        ? "#eab308"
        : "#a1a1aa"
  }
  nodeStrokeWidth={3}
  maskColor={theme === "dark" ? "rgba(24,24,27,0.85)" : "rgba(255,255,255,0.85)"}
  style={{
    background: theme === "dark" ? "#18181b" : "#f4f4f5",
    borderRadius: 12,
    boxShadow: "0 2px 12px 0 rgba(0,0,0,0.10)",
    border: theme === "dark" ? "1px solid #27272a" : "1px solid #e5e7eb",
    width: 180,
    height: 120,
    right: 16,
    bottom: 16,
  }}
/>
      </ReactFlow>

    </div>
  );
}

export default function GraphCanvas() {
  return (
    <div className="w-full h-full">
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </div>
  );
}
