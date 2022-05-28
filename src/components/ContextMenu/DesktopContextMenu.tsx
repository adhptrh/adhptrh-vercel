import { useContext, useEffect } from "react"
import { GlobalContext } from "../../helpers/GlobalContext"

export default function DesktopContextMenu(props) {

  const { setPath, updateIcon, path, rightClickMenuProp, setShowRightClickMenu } = useContext(GlobalContext)

  const newSampleFile = () => {
    let temp = path
    temp[1].content.push({
      name: "samplefile_" + Math.floor(Math.random() * 99),
      type: "file",
      ext: "txt",
      content: "this is a sample file",
      id: new Date().getTime() + Math.floor(Math.random() * 999), 
      closeState: false
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
      <div className="select-none px-2 rounded-md w-full hover:bg-color3" onClick={newSampleFile}>New file</div>
      <div className="select-none px-2 rounded-md w-full text-slate-600">New folder</div>
    </div>
  </>
}