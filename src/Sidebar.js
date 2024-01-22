import React, { useEffect, useState } from 'react';
import { NodeTypes } from './constants';

const SideBar = ({ nodeData, edgeData, callback, callback2 }) => {

    const [cdnObject, updateCdnObject] = useState({
        name: "",
        backgroundColor: "",
        // borderColor: "",
        fontColor: "",
    });
    const [isnObject, updateIsnObject] = useState({
        label: "",
        id: "",
        value: ""
    });

    const [edgeObject, updateEdgeObject] = useState({
        strokeWidth: 2,
        stroke: 'black',
        strokeDasharray: 0,
        animated: false
    })
    const [isCDN, updateIsCDN] = useState(false);
    const [isISN, updateIsISN] = useState(false);
    const [isEdge, updateIsEdge] = useState(false);

    const handleOptions = [
        { value: 'source', label: 'Source' },
        { value: 'target', label: 'Target' },
      ];
    const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    };

    useEffect(()=> {
        console.log(edgeData)
        if(nodeData?.type === "circle" || nodeData?.type === "rectangle"|| nodeData?.type === "input"|| nodeData?.type === "output"){
            updateIsCDN(true);
            updateIsISN(false);
            updateIsEdge(false);
            updateCdnObject(nodeData)
        }else if(nodeData?.type === "textInput" || nodeData?.type === "selectionBox") {
            updateIsISN(true);
            updateIsCDN(false);
            updateIsEdge(false);
            updateIsnObject(nodeData)
        }else if(edgeData?.type === "straight") {
            updateIsISN(false);
            updateIsCDN(false);
            updateIsEdge(true);
            updateEdgeObject(edgeData)
        } else {
            updateIsISN(false);
            updateIsCDN(false);
            updateIsEdge(false);
        }
    }, [nodeData, edgeData])

    const handleSubmitCDN = () => {
        callback(cdnObject)
    }

    const handleCdnInputChange = (event) => {
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

    const handleEdgeChange = (event) => {
        const { name, value } = event.target;
        const style = {
            ...edgeObject.style,
        };
        let animation = false;
        if(name === "strokeWidth") {
            style.strokeWidth = value
        }
        // if(name === "stoke") {
        //     style.stroke = value
        // }
        if(name === "strokeDasharray") {
            style.strokeDasharray = value
        }
        if(name === "animated"){
            animation = Boolean(value)
        }
        const newState = {
        ...edgeObject,
        animated: animation,
        style: style,
        };
        updateEdgeObject(newState);
    }

    const handleEdgeSubmit = (event) => {
        callback2(edgeObject)
    }

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
                Name<br/>
                <input
                    type="text"
                    name="name"
                    value={cdnObject?.name}
                    onChange={handleCdnInputChange}
                />
                </label>
                <br /><br />
                <label>
                BG Color<br />
                <input
                    type="text"
                    name="backgroundColor"
                    value={cdnObject.backgroundColor}
                    onChange={handleCdnInputChange}
                />
                </label>
                <br /><br />
                {/* <label>
                Border Color:
                <input
                    type="text"
                    name='borderColor'
                    value={cdnObject?.borderColor}
                    onChange={handleCdnInputChange}
                />
                </label>
                <br /> */}
                <label>
                Font Color<br />
                <input
                    type="text"
                    name='fontColor'
                    value={cdnObject.fontColor}
                    onChange={handleCdnInputChange}
                />
                </label>
                <br /><br />
                <button type='button' onClick={handleSubmitCDN}>Update</button>
          </form>
        )}
        {isISN && (
            <form>
                <h1>Node Attributes</h1>
                <label>
                Label<br />
                <input
                    type="text"
                    name='label'
                    value={isnObject?.label}
                    onChange={handleCdnInputChange}
                />
                </label>
                <br />
                <label>
                ID<br />
                <input
                    type="text"
                    name='id'
                    value={isnObject.id}
                    onChange={handleCdnInputChange}
                />
                </label>
                <br></br>
                <button type='button'>Update</button>
          </form>
        )}
        {isEdge && (
            <div>
                <form>
                    <h1>Edge Attributes</h1>
                    <label>
                    Line Width:
                    <input
                        type="number"
                        name="strokeWidth"
                        value={edgeObject?.strokeWidth}
                        onChange={handleEdgeChange}
                    />
                    </label>
                    <br />
                    {/* <label>
                    Line Color:
                    <input
                        type="text"
                        name="stroke"
                        value={edgeObject?.stroke}
                        onChange={handleEdgeChange}
                    />
                    </label>
                    <br /> */}
                    <label>
                    line Dash size:
                    <input
                        type="numer"
                        name="strokeDasharray"
                        value={edgeObject?.strokeDasharray}
                        onChange={handleEdgeChange}
                    />
                    </label>
                    <br />
                    <label>
                        Animation:
                            <select
                            name="animated"
                            value={edgeObject.animated}
                            onChange={handleEdgeChange}
                            >
                                <option value={false}>No</option>
                                <option value={true}>Yes</option>
                            </select>
                    </label>
                    <br />
                    <button type='button' onClick={handleEdgeSubmit}>Submit</button>
                </form>
            </div>
        )}
    </aside>
    );
};

export default SideBar;
