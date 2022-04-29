import Image from "next/image"
import React, { useContext, useEffect, useState } from "react"
import { ZindexContext } from "../../helpers/ZindexContext"

export default function DesktopIcon(props) {

  const { setShowRightClickMenu, showRightClickMenu,setRightClickMenuProp } = useContext(ZindexContext)
  const onRightClick = (e: React.MouseEvent) => {
    if (e.button == 2) {
      setRightClickMenuProp(ps => {
        return {
          ...ps,
          top: e.clientY,
          left: e.clientX,
        }
      })
      setShowRightClickMenu(true)
    }
  }

  return <div id="rightclickable">
    <div {...props} onMouseUp={onRightClick} className="absolute group cursor-pointer overflow-hidden select-none flex flex-col items-center desktop-icon-appear" style={{ top: props.top, left: props.left, width: 100 }}>
      <div className="bg-color5 opacity-0 group-hover:opacity-30 w-full h-full absolute" style={{ zIndex: 0 }} ></div>
      <Image src={props.icon} alt="dekstop-icon" width={45} height={45} className="shadow-2xl mt-1" style={{ zIndex: 1, imageRendering: "pixelated" }}></Image>
      {/* <img alt={"dekstop-icon"} src={props.icon} className="shadow-2xl mt-1" style={{ zIndex: 1, imageRendering: "pixelated", width: 45, height: 45 }}></img> */}
      <p className="mt-1 text-white text-center" style={{ zIndex: 1 }} >{(props.title.length > 13) ? props.title.substring(0, 11) + "..." : props.title}</p>
    </div>
  </div>
}