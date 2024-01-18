import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
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
        data: { id: getHandleId(), top: "source", right: "source", bottom: "source", left: "source" },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  const editNode = (event, node)=> {
    updateNodeData(node)
  }

  // const nodeCustomization = (data) => {
  //   const newNode = nodes.filter(item => item.id !== data.id);
  //   newNode.push(data);
  //   setNodes(newNode); 
  // }

  const nodeCustomization = async (data) => {
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
  
 
  const testEdge = useCallback((event) => { 
    console.log(event)
  })

  const testEdge2 = (connection) => {
    console.log(edges)
  }

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <Sidebar nodeData={nodeData} callback={nodeCustomization}/>
        <div style={{ height: "100vh" }} className="reactflow-wrapper" ref={reactFlowWrapper}>
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
            // onEdgeMouseEnter={testEdge()}
            // isValidConnection={testEdge2}
            onConnectEnd={testEdge2} 
            fitView
            connectionMode="loose"
            >
              <Background />
              <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;