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
    div.id = 'cursorPoint';
    document.body.appendChild(div);
    return div;
}

function hideDiv() {
    try {
        document.getElementById('cursorPoint')!.style.display = 'none';
    } catch (err) {}
}

function showDiv(){
    try {
        document.getElementById('cursorPoint')!.style.display = 'block';
    } catch (err) {}
 }

const useDraggableArrow = (updateArrow: () => void) => {
    const [shouldShow, setShouldShow] = useState<boolean>(false);
    const [id, setId] = useState<string>('cursorPoint');

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
        document.getElementById('cursorPoint')!.style.top = e.clientY + 'px';
        document.getElementById('cursorPoint')!.style.left = e.clientX + 'px';
        updateArrow();
    }, [])

    const finishDragging = useCallback((_id: string) => {
      setShouldShow(false);
      setId(_id);
    }, [])

    const startDragging = useCallback(() => setShouldShow(true), []);

    useEffect(() => {
        document.addEventListener('mousemove', mouseMoveListener);

        return () => {
            document.removeEventListener('mousemove', mouseMoveListener);
        }
    }, [mouseMoveListener])

    return { id, finishDragging, startDragging, isDragging: shouldShow };
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
  const { id, startDragging, finishDragging } = useDraggableArrow(updateArrow);

  return (
    <div className="h-screen">
      <div className="flex  justify-evenly">
        <div>
          <div
            id="elem1"
            className="border-gray-500 border-2 rounded-sm"
          >hey
          </div>
          <div onClick={() => {
                setShowArrow(true);
                startDragging();
            }} className="w-2 rounded-full h-2 bg-blue-200 cursor-pointer"></div>
        </div>
        <AddArrow showArrow={showArrow} comesFrom={"elem1"} goesTo={id} />
        <Draggable onDrag={updateArrow} >
          <div id="elem2" onClick={()=>finishDragging("elem2")} className="border-gray-500 border-2 rounded-sm">
            hey2
          </div>
        </Draggable>
        <Draggable onDrag={updateArrow} >
          <div id="elem3" onClick={()=>finishDragging("elem3")} className="border-gray-500 border-2 rounded-sm">
            hey3
          </div>
        </Draggable>
        <Draggable onDrag={updateArrow} >
          <div id="elem4" onClick={()=>finishDragging("elem4")} className="border-gray-500 border-2 rounded-sm">
            hey4
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
