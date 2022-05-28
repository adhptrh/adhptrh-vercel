import React, { useContext, useEffect, useState } from "react"
import Container from "../components/Container/Container"
import { GlobalContext } from "../helpers/GlobalContext"
import bg from "../assets/img/bg.jpg"
import Folder from "../components/Folder/Folder"
import Txt from "../components/Txt/Txt"
import folderImage from "../assets/img/folder.png"
import txtImage from "../assets/img/txtfile.png"
import terminalImage from "../assets/img/terminal.png"
import DesktopIcon from "../components/DesktopIcon/DesktopIcon"
import Terminal from "../components/Terminal/Terminal"
import Head from "next/head"
import Image from "next/image"
import DesktopContextMenu from "../components/ContextMenu/DesktopContextMenu"
import FileContextMenu from "../components/ContextMenu/FileContextMenu"
import Video from "../components/Video/Video"
import Photo from "../components/Photo/Photo"
export default function Index() {

  /* const formsInit = [
    {
      ...pathInit[1].content[1],
      id: new Date().getTime() + Math.floor(Math.random() * 999),
      closeState: false,
      top: 75,
      left: 150
    }
  ] */

  const rightClickMenuPropInit = {
    top: 0,
    left: 0,
  }

  const [path, setPath] = useState([])
  const [zindex, setZindex] = useState(0)
  const [forms, setForms] = useState([])
  const [showRightClickMenu, setShowRightClickMenu] = useState(false)
  const [rightClickMenuProp, setRightClickMenuProp] = useState(rightClickMenuPropInit)
  const [rightClickDataType, setRightClickDataType] = useState("")
  const [rightClickData, setRightClickData] = useState({id:"", path:""})
  const [allowMobile, setAllowMobile] = useState(false)
  const [update, setUpdate] = useState(false)
  const [renderIcons, setRenderIcons] = useState([])
  const [maxHeight, setMaxHeight] = useState(1000)

  const closeForm = (id: number) => {
    setForms(ps => ps.filter((v, i) => { if (id == v.id) { return false } return true }))
  }

  const deleteDesktopFile = (id) => {
    let temp = path
    path[1].content = (path[1].content as any).filter((v,i) => {
      if (v.id == id) {
        return false
      }
      return true
    })
    setPath(ps=>temp)
    setUpdate(ps=>!ps)
    updateIcon()
  }

  const rightClickMenu = (e:React.MouseEvent) => {
    let target = e.target as HTMLElement
    if (e.button == 2) {
      if (target.id != "rightclickable") return
      setRightClickMenuProp(ps => {
        return {
          ...ps,
          top: e.clientY,
          left: e.clientX,
        }
      })
      setRightClickDataType("")
      setShowRightClickMenu(true)
    } else if (e.button == 0) {
      if (target.parentElement.id == "ctxmenu") return
      setShowRightClickMenu(false)
    }
  }

  const rightClickMenuCancelCheck = (e:React.MouseEvent) => {
    let target = e.target as HTMLElement
    if (target.parentElement.id == "ctxmenu") return
    if (target.id != "rightclickable") setShowRightClickMenu(false)
  }

  const RenderForms = forms.map((v, i) => {
    switch (v.type) {
      case "filemanager":
        return <Folder
          path={path}
          key={v.id}
          closeState={v.closeState}
          top={v.top ?? i * 30 + 30}
          left={v.left ?? i * 30 + 30}
          id={v.id}
          width={550}
          height={350} />
        break
      case "folder":
        return <Folder
          path={path}
          inspect={v.inspect}
          key={v.id}
          closeState={v.closeState}
          top={i * 30 + 30}
          left={i * 30 + 30}
          id={v.id}
          width={550}
          height={350} />
        break
      case "file":
        switch (v.ext) {
          case "txt":
            return <Txt
              key={v.id}
              id={v.id}
              title={v.name + "." + v.ext}
              content={v.content}
              closeState={v.closeState}
              width={550}
              height={350}
              top={v.top ?? i * 30 + 30} 
              left={v.left ?? i * 30 + 30} />
            break
          case "png":
            return <Photo
              key={v.id}
              id={v.id}
              title={v.name + "." + v.ext}
              content={v.content}
              closeState={v.closeState}
              width={550}
              height={350}
              top={v.top ?? i * 30 + 30} 
              left={v.left ?? i * 30 + 30} />
            break
          case "mp4":
            return <Video
              key={v.id}
              id={v.id}
              title={v.name + "." + v.ext}
              closeState={v.closeState}
              width={550}
              height={350}
              content={v.content}
              top={v.top ?? i * 30 + 30} 
              left={v.left ?? i * 30 + 30} />
            break
        }
        break

      case "terminal":
        return <Terminal
          key={v.id}
          id={v.id}
          title={v.name}
          closeState={v.closeState}
          width={550}
          height={350}
          top={i * 30 + 30} left={i * 30 + 30} />
        break
    }
  })

  const updateIcon = () => {
    if (!path[1]) return
    let top = -70
    let left = 30
    setRenderIcons(path[1].content.map((v, i) => {
      top += 100
      if (top+60 > maxHeight) {
        left += 130
        top = 30
      }

      let properties = {
        icon: "",
        title: ""
      }
  
      switch (v.type) {
        case "filemanager":
          properties.icon = folderImage.src
          properties.title = v.name
          break
        case "folder":
          properties.icon = folderImage.src
          properties.title = v.name
          break
  
        case "file":
          switch (v.ext) {
            case "txt":
              properties.icon = txtImage.src
              break
  
            case "exe":
              properties.icon = terminalImage.src
              break
          }
  
          properties.title = v.name + "." + v.ext
          break
  
        case "terminal":
          properties.title = v.name + "." + v.ext
          properties.icon = terminalImage.src
          break
  
      }

      

      return <DesktopIcon
        key={v.id}
        id={v.id}
        path={"root/desktop"}
        onTouchEnd={(e)=> {
          e.preventDefault()
          e.stopPropagation()
          setForms(ps => [...ps, {
            ...v,
            id: new Date().getTime() + Math.floor(Math.random() * 999),
            closeState: false,
          }])
        }}
        onDoubleClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setForms(ps => [...ps, {
            ...v,
            id: new Date().getTime() + Math.floor(Math.random() * 999),
            closeState: false,
          }])
        }}
        icon={properties.icon}
        title={properties.title}
        top={top}
        left={left} />
    }))
  }

  const fetchapi = async () => {
    fetch("/path").then((r)=>{
      r.json().then((v)=>{
        setPath(v)
        setForms([
          {
            ...v[1].content[0],
            id: new Date().getTime() + Math.floor(Math.random() * 999),
            closeState: false,
            top: 75,
            left: 150
          }
        ])

      })
    })
  }

  useEffect(() => {
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault()
    })
    setMaxHeight(window.innerHeight)
    updateIcon()
    window.addEventListener('resize', (e) => {
      setMaxHeight(window.innerHeight)
      updateIcon()
    })
    fetchapi()
  }, [])

  useEffect(()=>{
    updateIcon()
  },[path, maxHeight])
  return <>
    <Head>
      <title>adhptrh</title>
      <meta name="viewport" content="initial-scale=0.8, width=device-width" />
      <meta name="description" content="Hi, my name is Adhika and welcome to my website" />
    </Head>
    <p className="font-fixedsys opacity-0 absolute">load</p>
    <Image
      src={bg.src} alt="desktop-image" priority={true} layout="fill" objectFit="cover" />
    <div
      id="rightclickable"
      onMouseDown={rightClickMenuCancelCheck}
      onMouseUp={rightClickMenu}
      className={"absolute w-full transition-all h-full blur-sm md:blur-none overflow-hidden " + (allowMobile && "blur-none")}>

      <GlobalContext.Provider value={{
        zindex,setZindex,
        forms,setForms,
        closeForm,
        setShowRightClickMenu,showRightClickMenu,
        setRightClickMenuProp,rightClickMenuProp,
        setPath,path,
        setRightClickDataType, rightClickDataType,
        setRightClickData, rightClickData,
        deleteDesktopFile,
        updateIcon
      }}
      >
        {renderIcons}
        {RenderForms}
        {showRightClickMenu && ((rightClickDataType == "file") ? <FileContextMenu/> : <DesktopContextMenu/>)  }
      </GlobalContext.Provider>
    </div>

    <div className={"flex flex-col absolute md:hidden top-0 p-10 w-full h-full text-white z-[9999999] items-center justify-center " + (allowMobile && "hidden")}>
      <p className="text-center font-fixedsys">Message from Adhika:</p>
      <p className="text-center">Bad experience for mobile users, use pc for better experience.</p>
      <button onClick={()=>{setAllowMobile(ps=>!ps)}} className={"bg-white mt-4 rounded-md p-3 text-color2 shadow-xl"}>It&apos;s ok, let me in.</button>
    </div>
    {update && <p className="absolute"></p>}
  </>
}