import { useContext, useEffect } from "react"
import { GlobalContext } from "../../helpers/GlobalContext"

export default function FileContextMenu(props) {

  const { rightClickData,updateIcon, setPath, path, rightClickMenuProp, setShowRightClickMenu} = useContext(GlobalContext)

  const deleteDesktopFile = (e) => {
    let temp = path
    temp[1].content = temp[1].content.filter((v,i) => {
      if (v.id == rightClickData.id) {
        v.closeState = "true"
      }
      return true
    })
    setPath(ps => [...temp])
    setShowRightClickMenu(false)
  }

  return <>
  <div id="ctxmenu" className="absolute bg-color2 p-1 opacity-90 rounded-md text-white" style={{
        width: 200,
        zIndex: 999999999,
        top: rightClickMenuProp.top,
        left: rightClickMenuProp.left
      }}
      >
        <div className="select-none px-2 rounded-md w-full hover:bg-color3" onClick={deleteDesktopFile}>Delete File</div>
      </div>
  </>
}