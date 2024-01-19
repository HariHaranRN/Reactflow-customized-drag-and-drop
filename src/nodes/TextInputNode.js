import { memo } from "react";
import { Handle, Position } from 'reactflow';

const TextInputNode = ({ data }) => {
    return (
      <>
        <div className="custom-node__body">
          <label>Enter input</label><br></br>
          <input type='text'></input>
          <Handle type="source" position={Position.Top} />
          <Handle type="source" position={Position.Right} />
          <Handle type="source" position={Position.Bottom} />
          <Handle type="source" position={Position.Left} />
        </div>
      </>
    );
  }

export default memo(TextInputNode)