import React from 'react';
import { Handle, Position } from 'reactflow';

const RectangleNode = ({ data }) => {
  return (
    <div>
      <svg width="150" height="35">
        <rect width="150" height="35" rx="5" ry="5" stroke="black" strokeWidth="3" fill="white" />
        <text x="75" y="21" textAnchor="middle" style={{ fontSize: '11px', fontWeight: 'normal' }}>
          {data.label}
        </text>
      </svg>
        <Handle key={"1"} id={"1"} type="source" position={Position.Top} />
        <Handle key={"2"} id={"2"} type="source" position={Position.Right} />
        <Handle key={"3"} id={"3"} type="source" position={Position.Bottom} />
        <Handle key={"4"} id={"4"} type="source" position={Position.Left} />
      {/* {data?.position &&
        data.position.map((item, index) => (
          <div key={index}>
            <Handle
              id={index + '-' + item.placement}
              type={item.type}
              position={item.placement}
            />
          </div>
        ))} */}
    </div>
  );
};

export default RectangleNode;
