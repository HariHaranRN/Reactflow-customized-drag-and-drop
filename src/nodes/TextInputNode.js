import { memo } from "react";
import { Handle, Position } from 'reactflow';

const TextInputNode = ({ data }) => {
    return (
      <>
        <div className="custom-node__body">
          <label>Enter input</label><br></br>
          <input type='text'></input>
          <Handle key={"1"} id={"1"} type="source" position={Position.Top} />
          <Handle key={"2"} id={"2"} type="source" position={Position.Right} />
          <Handle key={"3"} id={"3"} type="source" position={Position.Bottom} />
          <Handle key={"4"} id={"4"} type="source" position={Position.Left} />
        </div>
      </>
    );
  }

export default memo(TextInputNode)