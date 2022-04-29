import { useContext } from "react"
import { GlobalContext } from "../../helpers/GlobalContext"

export default function FileContextMenu(props) {

    const {setPath, path, rightClickMenuProp, setShowRightClickMenu} = useContext(GlobalContext)

    return <>
    <div id="ctxmenu" className="absolute bg-color2 p-1 opacity-90 rounded-md text-white" style={{
          width: 200,
          zIndex: 999999999,
          top: rightClickMenuProp.top,
          left: rightClickMenuProp.left
        }}
        >
          <div className="select-none px-2 rounded-md w-full hover:bg-color3">Delete File</div>
        </div>
    </>
}