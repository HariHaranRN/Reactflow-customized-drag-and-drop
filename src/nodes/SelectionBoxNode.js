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

  function onChange(event){
    console.log(event)
  }

  return (
    <>
      <div className="custom-node__body">
        <div className="custom-node__select">
          <div>Select value</div>
          <select className="nodrag" onChange={onChange} style={{width: '140px'}}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Handle key={"1"} id={"1"} type="source" position={Position.Top} />
          <Handle key={"2"} id={"2"} type="source" position={Position.Right} />
          <Handle key={"3"} id={"3"} type="source" position={Position.Bottom} />
          <Handle key={"4"} id={"4"} type="source" position={Position.Left} />
        </div>
      </div>
    </>
  );
}

export default memo(SelectionBoxNode);
