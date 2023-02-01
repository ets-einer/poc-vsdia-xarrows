import React, {useRef} from "react";
import Xarrow from "react-xarrows";

export const Content = () => {

    const box1Ref = useRef(null);
    return(
        <div>
            <div className="flex  justify-evenly">
            <div ref={box1Ref} className="border-gray-500 border-2 rounded-sm p-1">hey</div>
            <p id="elem2" className="border-gray-500 border-2 rounded-sm p-1">hey2</p>
            <Xarrow
                start={box1Ref} //can be react ref
                end="elem2" //or an id
            />
        </div>
        </div>
    )
}