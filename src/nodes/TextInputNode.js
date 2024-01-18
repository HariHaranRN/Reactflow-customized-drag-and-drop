import { memo } from "react";
import { Handle, Position } from 'reactflow';

const TextInputNode = ({ data }) => {
    return (
      <>
        <div className="custom-node__body">
          <label>Enter input</label><br></br>
          <input type='text'></input>
          <Handle type={data?.top || "target"} position={Position.Top} />
          <Handle type={data?.right || "source"} position={Position.Right} />
          <Handle type={data?.bottom || "target" } position={Position.Bottom} />
          <Handle type={data?.left || "source" } position={Position.Left} />
        </div>
      </>
    );
  }

export default memo(TextInputNode)