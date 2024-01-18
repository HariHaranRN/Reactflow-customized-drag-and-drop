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
          type={data?.[position] === "source" ? "source" : data?.[position] === "target" ? "target" : "source"}
          position={position}
          id={data.id + position}
          style={{
            backgroundColor: data?.[position] === "source" ? "green" : data?.[position] === "target" ? "red" : "green"
          }}
        />
      ))}
    </div>
  );
};

// const CircleNode = ({ data }) => {
//   console.log(data)
//   console.log(data?.left === "source" ? "source" : data?.left === "target" ? "target" : "source")
//   return (
//     <div >
//       <svg width="100" height="100">
//         <circle cx="50" cy="50" r="48" stroke="black" strokeWidth="1" fill={data?.backgroundColor ?? "white"} />
//         <text x="50" y="50" textAnchor="middle" dy=".3em" style={{ fontSize: '11px', fontWeight: "normal", color: "red"}}>{data?.name || "Circle"}</text>
//       </svg>
//       <Handle
//         type={data?.top === "source" ? "source" : data?.top === "target" ? "target" : "source"}
//         position={Position.Top}
//         id={data.id + "top"}
//         style={{
//           backgroundColor: data?.top === "source" ? "green" : data?.top === "target" ? "red" : "green"
//         }}
//       />
//       <Handle 
//         type={data?.top === "source" ? "source" : data?.top === "target" ? "target" : "source"}
//         position={Position.Right}
//         id={data.id + "right"}
//         style={{
//           backgroundColor: data?.right === "source" ? "green" : data?.right === "target" ? "red" : "green"
//         }}
//       />
//       <Handle 
//         type={data?.top === "source" ? "source" : data?.top === "target" ? "target" : "source"}
//         position={Position.Bottom} 
//         id={data.id + "bottom"}
//         style={{
//           backgroundColor: data?.bottom === "source" ? "green" : data?.bottom === "target" ? "red" : "green"
//         }}
//       />
//       <Handle 
//         type={data?.top === "source" ? "source" : data?.top === "target" ? "target" : "source"}
//         position={Position.Left}
//         id={data.id + "left"}
//         style={{
//           backgroundColor: data?.left === "source" ? "green" : data?.left === "target" ? "red" : "green"
//         }}
//       />
//     </div>
//   );
// };

export default CircleNode;
