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
} from "reactflow";

import "reactflow/dist/style.css";

import CelestiaNode from "./CelestiaNode";
import NodeDrawer from "./NodeDrawer";
import CelestiaEdge from "./CelestiaEdge";
import EdgeDrawer from "./EdgeDrawer";

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
      status: "active",
    },
  },
];

function Flow() {
  const [contextMenu, setContextMenu] =
  useState<{
    x: number;
    y: number;
  } | null>(null);
  const [selectedNode, setSelectedNode] =
    useState<any>(null);

  const [nodes, setNodes, onNodesChange] =
    useNodesState(defaultNodes);

  const [edges, setEdges, onEdgesChange] =
    useEdgesState([]);
const [theme, setTheme] =
  useState("dark");
  const [loaded, setLoaded] =
    useState(false);

  const [selectedEdge, setSelectedEdge] =
  useState<any>(null);

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
      setEdges(JSON.parse(savedEdges));
    }

    setLoaded(true);
  }, [setNodes, setEdges]);

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
  x: number,
  y: number
) => {
  const id = Date.now().toString();

  setNodes((nds) => [
    ...nds,
    {
      id,
      type: "celestia",
      position: {
        x,
        y,
      },
      data: {
        title: "Untitled",
        description: "",
        date: "",
        status: "new",
        theme,
      },
    },
  ]);
};
 const onConnect = useCallback(
  (params: any) => {
    setEdges((eds) =>
      addEdge(
        {
          ...params,
          type: "celestia",
          data: {
            label: "1 day",
          },
        },
        eds
      )
    );
  },
  [setEdges]
);
 
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
        status: "new",
        theme,
      },
    };

    setNodes((nds) => [
      ...nds,
      newNode,
    ]);
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
      onClick={createNode}
      className="
        px-4
        py-2
        bg-blue-500
        text-white
        rounded-lg
      "
    >
      Add Node
    </button>

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
  ${
    theme === "dark"
      ? "bg-zinc-700 text-white"
      : "bg-white text-black border border-zinc-300"
  }
`}
    >
      Export
    </button>
    <button
  onClick={() =>
    fileInputRef.current?.click()
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
          setNodes(graph.nodes);
        }

        if (graph.edges) {
          setEdges(graph.edges);
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
//       colorMode={
//   theme === "dark"
//     ? "dark"
//     : "light"
// }
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_, node) => {
        setSelectedNode(node);
        setSelectedEdge(null);
        }}
        onEdgeClick={(_, edge) => {
        setSelectedEdge(edge);
        setSelectedNode(null);
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
  style={{
    background:
      theme === "dark"
        ? "#111"
        : "#fff",
  }}
/>
      </ReactFlow>

      <NodeDrawer
        theme={theme}
        node={selectedNode}
        onClose={() =>
          setSelectedNode(null)
        }
        onSave={(updatedData) => {
          setNodes((nds) =>
            nds.map((node) =>
              node.id ===
              selectedNode?.id
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
          
          setSelectedNode((prev: any) =>
            prev
              ? {
                  ...prev,
                  data: {
                    ...prev.data,
                    ...updatedData,
                  },
                }
              : null
          );
        }}
        onDelete={() => {
  if (!selectedNode) return;

  setNodes((nds) =>
    nds.filter(
      (n) => n.id !== selectedNode.id
    )
  );

  setEdges((eds) =>
    eds.filter(
      (e) =>
        e.source !== selectedNode.id &&
        e.target !== selectedNode.id
    )
  );

  setSelectedNode(null);
}}
      />
      <EdgeDrawer
      theme={theme}
      edge={selectedEdge}
  onClose={() =>
    setSelectedEdge(null)
  }
  onSave={(updatedData) => {
    setEdges((eds) =>
      eds.map((edge) =>
        edge.id === selectedEdge.id
          ? {
              ...edge,
              data: {
                ...edge.data,
                ...updatedData,
              },
            }
          : edge
      )
    );
  }}
/>

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
