import React, { useState, useRef, useCallback, useMemo } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background
} from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from './Sidebar';
import CircleNode from './nodes/CircleNode';

import './index.css';
import TextInputNode from './nodes/TextInputNode';
import SelectionBoxNode from './nodes/SelectionBoxNode';



const DnDFlow = () => {

  const initialNodes = [];

  const nodeTypes = useMemo(
    () => ({
    circle: CircleNode,
    textInput: TextInputNode,
    selectionBox: SelectionBoxNode
  }),
  []);

  let id = 0;
  const getId = () => `dndnode_${id++}`;
  const getHandleId = () => `handle_${id++}`;
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodeData, updateNodeData] = useState({});
  const [edgeData, updateEdgeData] = useState({});
  const [edgeUpdate, setEdgeUpdate] = useState(true)

  // const onConnect = (
  //   (params) => setEdges((eds) => {
  //     console.log("coming")
  //     params['type'] = "straight";
  //     console.log(params)
  //     console.log(nodes)
  //     return addEdge(params, eds)
  //   })
  // ); 
  
  const onConnect = (params) => {
    setEdges((eds) => {
      params['type'] = "straight";
      params['style'] = {strokeWidth: 2, stroke: "black"}
      return addEdge(params, eds);
    });
  };

  // useEffect(()=> {
  //   setEdges(edges);
  // }, [edgeUpdate])

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { id: getHandleId(), label: "some" },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  const editNode = (event, node)=> {
    updateEdgeData({})
    updateNodeData(node)
  }

  const editEdge = (event, edge) => {
    updateNodeData({})
    updateEdgeData(edge)
  }

  // const nodeCustomization = (data) => {
  //   const newNode = nodes.filter(item => item.id !== data.id);
  //   newNode.push(data);
  //   setNodes(newNode); 
  // }

  const edgeCustomization = (data) => {
    console.log(data)
    setEdges((prevEdges) => {
      return prevEdges.map((item) => (item.id === data.id ? data : item));
    });
    console.log(edges)
  }

  const nodeCustomization = (data) => {
    // setNodes((nds) =>
    //   nds.map((node) => {
    //     if (node.id === data.id) {
    //       node = data
    //     }
    //     return node;
    //   }))
    setNodes((prevNodes) => {
      return prevNodes.map((item) => (item.id === data.id ? data : item));
    });
  };

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <Sidebar nodeData={nodeData} edgeData={edgeData} callback={nodeCustomization} callback2={edgeCustomization}/>
        <div style={{ height: "100vh"}} className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            onNodeClick={editNode} 
            onEdgeClick={editEdge}
            fitView
            connectionMode="loose"
            >
              <Background color='red'/>
              <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;