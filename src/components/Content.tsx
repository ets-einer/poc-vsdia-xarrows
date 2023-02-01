import React, { useCallback, useEffect, useRef, useState } from "react";
import Xarrow, { useXarrow } from "react-xarrows";
import Draggable, { DraggableCore } from "react-draggable";

type AddArrowProps = {
  showArrow: boolean;
  comesFrom: string;
  goesTo: string;
};

function createDiv() {
    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.zIndex = '1000';            
    div.style.display = 'none';
    div.id = 'invisDiv';
    document.body.appendChild(div);
    return div;
}

function hideDiv() {
    try {
        document.getElementById('invisDiv')!.style.display = 'none';
    } catch (err) {}
}

function showDiv(){
    try {
        document.getElementById('invisDiv')!.style.display = 'block';
    } catch (err) {}
 }

const useDraggableArrow = (updateArrow: () => void) => {
    const [shouldShow, setShouldShow] = useState<boolean>(false);

    useEffect(() => {
        createDiv()
    }, [])

    useEffect(() => {
        if (shouldShow) {
            showDiv();
        } else {
            hideDiv();
        }
    }, [shouldShow])

    const mouseMoveListener = useCallback((e: MouseEvent) => {
        document.getElementById('invisDiv')!.style.top = e.pageY + 'px';
        document.getElementById('invisDiv')!.style.left = e.pageX + 'px';
        updateArrow();
    }, [])

    useEffect(() => {
        document.addEventListener('mousemove', mouseMoveListener);

        return () => {
            document.removeEventListener('mousemove', mouseMoveListener);
        }
    }, [mouseMoveListener])

    return { id: 'invisDiv', isShowing: shouldShow, setShouldShow };
}

const AddArrow = ({ comesFrom, goesTo, showArrow }: AddArrowProps) => {
  return (
    <div className={`${showArrow ? "visible" : "invisible"}`}>
      <Xarrow
        start={comesFrom} //can be react ref
        end={goesTo} //or an id
        headSize={3}
      />
    </div>
  );
};

export const Content = () => {
  const [showArrow, setShowArrow] = useState(false);
  const updateArrow = useXarrow();
  const { id, setShouldShow, isShowing } = useDraggableArrow(updateArrow);

  return (
    <div>
      <div className="flex  justify-evenly">
        <Draggable onDrag={updateArrow}>
          <div
            id="elem1"
            className="border-gray-500 border-2 rounded-sm"
          >
            <div onClick={() => {
                setShowArrow(true);
                setShouldShow(true);
            }} className="w-1/4 h-1/4 absolute right-0 rounded-full hover:bg-blue-200"></div>hey
          </div>
        </Draggable>
        <AddArrow showArrow={showArrow} comesFrom={"elem1"} goesTo={id} />
        <Draggable onDrag={updateArrow}>
          <div id="elem2" className="border-gray-500 border-2 rounded-sm">
            hey2
          </div>
        </Draggable>

        <button
          className="bg-red-500 px-10"
          onClick={() => setShowArrow(false)}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
