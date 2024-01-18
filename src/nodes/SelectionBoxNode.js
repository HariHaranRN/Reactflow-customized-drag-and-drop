import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const options = [
  {
    value: 'option 1',
    label: 'option 1',
  },
  {
    value: 'option 2',
    label: 'option 2',
  },
  {
    value: 'option 3',
    label: 'option 3',
  },
  {
    value: 'option 4',
    label: 'option 4',
  },
];

const SelectionBoxNode = ({ data }) => {

  function onChange(){
    console.log("ok")
  }

  return (
    <>
      <div className="custom-node__body">
        <div className="custom-node__select">
          <div>Selection Box</div>
          <select className="nodrag" onChange={onChange}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Handle type={data?.top || "target"} position={Position.Top} />
          <Handle type={data?.right || "source"} position={Position.Right} />
          <Handle type={data?.bottom || "target" } position={Position.Bottom} />
          <Handle type={data?.left || "source" } position={Position.Left} />
        </div>
      </div>
    </>
  );
}

export default memo(SelectionBoxNode);
