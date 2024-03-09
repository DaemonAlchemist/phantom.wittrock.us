import { useCallback } from "react";
import ReactFlow, { Background, Controls, MiniMap, addEdge, useEdgesState, useNodesState } from "reactflow";
import 'reactflow/dist/style.css';
import { AppProps } from "./App.d";
import styles from "./App.module.scss";

const onInit = (reactFlowInstance:any) => console.log('flow loaded:', reactFlowInstance);

const nodeTypes = {
    // custom: CustomNode,
};
  
export const AppComponent = ({}:AppProps) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const onConnect = useCallback((params:any) => setEdges((eds) => addEdge(params, eds)), []);
  
    return <div className={styles.app}>
      <ReactFlow
        className={styles.container}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        fitView
        attributionPosition="top-right"
        nodeTypes={nodeTypes}
      >
        <MiniMap className={styles.minimap} zoomable pannable />
        <Controls />
        <Background color="#888" gap={16} />
      </ReactFlow>
    </div>; 
}