import React from 'react';
import { Handle, Position } from 'reactflow';

const CircleNode = ({ data }) => {
  const positions = [Position.Top, Position.Right, Position.Bottom, Position.Left];
  return (
    <div>
      <svg width="100" height="100">
        <circle cx="50" cy="50" r="48" stroke="black" strokeWidth="1" fill={data?.backgroundColor ?? "white"} />
        <text x="50" y="50" textAnchor="middle" dy=".3em" style={{ fontSize: '11px', fontWeight: "normal", color: "red" }}>{data?.name || "Circle"}</text>
      </svg>

      {positions.map(position => (
        <Handle
          key={data.id + position}
          type="source"
          position={position}
          id={data.id + position}
        />
      ))}
    </div>
  );
};

export default CircleNode;
