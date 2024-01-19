import React, { useEffect, useState } from 'react';
import { NodeTypes } from './constants';

const SideBar = ({ nodeData, callback }) => {

    const [cdnObject, updateCdnObject] = useState({
        name: "",
        backgroundColor: "",
        // borderColor: "",
        fontColor: "",
        top: "source",
        right: "source",
        bottom: "source",
        left: "source"
    });
    const [isnObject, updateIsnObject] = useState({
        label: "",
        id: "",
        value: ""
    });
    const [isCDN, updateIsCDN] = useState(false);
    const [isISN, updateIsISN] = useState(false);

    const handleOptions = [
        { value: 'source', label: 'Source' },
        { value: 'target', label: 'Target' },
      ];
    const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    };

    useEffect(()=> {
        if(nodeData?.type === "circle" || nodeData?.type === "default"){
            updateIsCDN(true);
            updateIsISN(false);
            updateCdnObject(nodeData)
        }else if(nodeData?.type === "textInput" || nodeData?.type === "selectionBox") {
            updateIsISN(true);
            updateIsCDN(false);
            updateIsnObject(nodeData)
        }else {
            updateIsISN(false);
            updateIsCDN(false);
        }
    }, [nodeData])

    const handleSubmitCDN = () => {
        callback(cdnObject)
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const newData = {
            ...cdnObject.data,
            [name]: value
          };
          const newState = {
            ...cdnObject,
            data: newData,
          };
      
        updateCdnObject(newState);
    };

    return (
    <aside>
        <div className="description">Darg the node you want</div>
        { NodeTypes.map((type, index) => (
            <div key={type+index} style={{marginTop: 20, marginLeft: 80, textAlign: 'center', cursor: 'grab' }}className={type.className} onDragStart={(event) => onDragStart(event, type.key)} draggable>
                {type.name}
            </div>
        ))}
        {isCDN && (
            <form>
                <h1>Node Attributes</h1>
                <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={cdnObject?.name}
                    onChange={handleInputChange}
                />
                </label>
                <br />
                <label>
                BG Color:
                <input
                    type="text"
                    name="backgroundColor"
                    value={cdnObject.backgroundColor}
                    onChange={handleInputChange}
                />
                </label>
                <br />
                {/* <label>
                Border Color:
                <input
                    type="text"
                    name='borderColor'
                    value={cdnObject?.borderColor}
                    onChange={handleInputChange}
                />
                </label>
                <br /> */}
                <label>
                Font Color:
                <input
                    type="text"
                    name='fontColor'
                    value={cdnObject.fontColor}
                    onChange={handleInputChange}
                />
                </label>
                <br />
                <h3>Handles</h3>
                <label>
                Top Handle:
                    <select
                    name="top"
                    value={cdnObject.role}
                    onChange={handleInputChange}
                    >
                    {handleOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                        </option>
                    ))}
                    </select>
                </label>
                <br />
                <label>
                Right Handle:
                    <select
                    name="right"
                    value={cdnObject.role}
                    onChange={handleInputChange}
                    >
                    {handleOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                        </option>
                    ))}
                    </select>
                </label>
                <br />
                <label>
                Bottom Handle:
                    <select
                    name="bottom"
                    value={cdnObject.role}
                    onChange={handleInputChange}
                    >
                    {handleOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                        </option>
                    ))}
                    </select>
                </label>
                <br />
                <label>
                Left Handle:
                    <select
                    name="left"
                    value={cdnObject.role}
                    onChange={handleInputChange}
                    >
                    {handleOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                        </option>
                    ))}
                    </select>
                </label>
                <br />
                <button type='button' onClick={handleSubmitCDN}>Update</button>
          </form>
        )}
        {isISN && (
            <form>
                <h1>Node Attributes</h1>
                <label>
                Label:
                <input
                    type="text"
                    name='label'
                    value={isnObject?.label}
                    onChange={handleInputChange}
                />
                </label>
                <br />
                <label>
                ID:
                <input
                    type="text"
                    name='id'
                    value={isnObject.id}
                    onChange={handleInputChange}
                />
                </label>
                <br></br>
                <h3>Handles</h3>
                <label>
                Top Handle:
                    <select
                    name="value"
                    value={isnObject.role}
                    onChange={handleInputChange}
                    >
                    {handleOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                        </option>
                    ))}
                    </select>
                </label>
                <br />
                <label>
                Right Handle:
                    <select
                    name="role"
                    value={isnObject.role}
                    onChange={handleInputChange}
                    >
                    {handleOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                        </option>
                    ))}
                    </select>
                </label>
                <br />
                <label>
                Bottom Handle:
                    <select
                    name="role"
                    value={isnObject.role}
                    onChange={handleInputChange}
                    >
                    {handleOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                        </option>
                    ))}
                    </select>
                </label>
                <br />
                <label>
                Left Handle:
                    <select
                    name="role"
                    value={isnObject.role}
                    onChange={handleInputChange}
                    >
                    {handleOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                        </option>
                    ))}
                    </select>
                </label>
                <br />
                <button type='button'>Update</button>
          </form>
        )}
    </aside>
    );
};

export default SideBar;
