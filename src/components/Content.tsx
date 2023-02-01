import React, {useRef, useState} from "react";
import Xarrow, { useXarrow } from "react-xarrows";
import Draggable, { DraggableCore } from "react-draggable";

const AddArrow =(showArrow:any, box1Id:string)=>{
    return(
        <div className={`${showArrow? 'visible': 'invisible'}`}>
        <Xarrow
                start="fodase" //can be react ref
                end="elem2" //or an id
                headSize={3}
            />
            </div>
    )
}

export const Content = () => {

    const [showArrow, setShowArrow] = useState(false)

    const box1Id = "fodase";
    const updateArrow = useXarrow()

    return(
        <div>
            <div className="flex  justify-evenly">

            <Draggable onDrag={updateArrow}>
                <div id={box1Id} className="border-gray-500 border-2 rounded-sm p-1" onClick={()=>setShowArrow(true)}>hey</div>
                </Draggable>
                <AddArrow showArrow={showArrow} box1Id={box1Id} />
            <p id="elem2" className="border-gray-500 border-2 rounded-sm p-1">hey2</p>
            
           
       
        </div>
        </div>
    )
}