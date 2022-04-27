import { useEffect, useState } from "react"
import Container from "../src/components/Container/Container"
import { ZindexContext } from "../src/helpers/ZindexContext"
import bg from "../src/assets/img/bg.jpg"
import Folder from "../src/components/Folder/Folder"
import Txt from "../src/components/Txt/Txt"
import folderImage from "../src/assets/img/folder.png"
import txtImage from "../src/assets/img/txtfile.png"
import terminalImage from "../src/assets/img/terminal.png"
import DesktopIcon from "../src/components/DesktopIcon/DesktopIcon"
import Terminal from "../src/components/Terminal/Terminal"
import Head from 'next/head'

export default function Index() {
  let pathInit = [
    {
      name: "home", type: "folder", content: [
      ]
    },
    {
      name: "desktop", type: "folder", content: [
        { name: "File Manager", type: "filemanager" },
        {
          name: "welcome",
          type: "file",
          ext: "txt",
          content:
            `hello there,\n` +
            `my name is Adhika and welcome to my website\n\n` +
            `Tips:\n` +
            `- To open folder or file, double click it.\n` +
            `- You can resize the window by dragging right bottom edge of the window.\n` +
            `- Right click the wallpaper to show context menu.\n` +
            ``
        },
        {
          name: "aboutme",
          type: "file",
          ext: "txt",
          content:
            `Hello my full name is Adhika Putra Hermanda,\n` +
            `I was born on 28th August 2003 at a city called Pekanbaru in Indonesia.\n\n` +
            `Programming language that i ever used:\n` +
            `Javascript/Typescript, Go, PHP, Python, Lua, C#, C++\n\n` +
            `Technologies that i ever used:\n` +
            `Laravel, NextJS, ReactJS, VueJS, Svelte, CodeIgniter, Docker, Git,\n\n` +
            `I started programming at the age of 13, that time i created my own tools for game hacking\n` +
            `To be continued...\n` +
            ``
        },
        {
          name: "Terminal",
          type: "terminal",
          ext: "exe",
        },
      ]
    },
    {
      name: "documents", type: "folder", content: [
        { name: "hello", type: "file", ext: "txt", content: "hello" },
        { name: "lmao", type: "file", ext: "txt", content: "what are u lookin at" },
        { name: "important", type: "folder", content: [] },
      ]
    },
    {
      name: "gallery", type: "folder", content: [
      ]
    },
  ]

  const formsInit = [
    {
      ...pathInit[1].content[1],
      id: new Date().getTime() + Math.floor(Math.random() * 999),
      closeState: false,
    }
  ]

  const rightClickMenuPropInit = {
    top: 0,
    left: 0,
  }

  const [path, setPath] = useState(pathInit)
  const [zindex, setZindex] = useState(0)
  const [forms, setForms] = useState(formsInit)
  const [showRightClickMenu, setShowRightClickMenu] = useState(false)
  const [rightClickMenuProp, setRightClickMenuProp] = useState(rightClickMenuPropInit)

  const closeForm = (id: number) => {
    setForms(ps => ps.filter((v, i) => { if (id == v.id) { return false } return true }))
  }

  const rightClickMenu = (event) => {
    let e = event as MouseEvent
    let target = e.target as HTMLElement
    if (e.button == 2) {
      if (target.id != "desktop") return
      setRightClickMenuProp(ps => {
        return {
          ...ps,
          top: e.clientY,
          left: e.clientX,
        }
      })
      setShowRightClickMenu(true)
    } else if (e.button == 0) {
      if (target.parentElement.id == "ctxmenu") return
      setShowRightClickMenu(false)
    }
  }

  const rightClickMenuCancelCheck = (e) => {
    let target = e.target as HTMLElement
    if (target.parentElement.id == "ctxmenu") return
    if (target.id != "desktop") setShowRightClickMenu(false)
  }

  const RenderIcons = path[1].content.map((v, i) => {
    let properties = {
      icon: "",
      title: ""
    }

    switch (v.type) {
      case "filemanager":
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
      key={i}
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
      top={30 + (i * 100)}
      left={30} />
  })

  const RenderForms = forms.map((v, i) => {
    switch (v.type) {
      case "filemanager":
        return <Folder
          path={path}
          key={v.id}
          closeState={v.closeState}
          top={i * 30 + 30}
          width={550}
          height={350}
          left={i * 30 + 30} id={v.id} />
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
              top={i * 30 + 30} left={i * 30 + 30} />
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

  const newSampleFile = () => {
    let temp = path
    temp[1].content.push({
      name: "samplefile_" + Math.floor(Math.random() * 99),
      type: "file",
      ext: "txt",
      content: "this is a sample file",
    })
    setPath(ps => [...temp])
    setShowRightClickMenu(false)
  }

  useEffect(() => {
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault()
    })
  }, [])

  return <>
    <Head>
      <title>adhptrh</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div
      id="desktop"
      className="w-full h-full hidden md:block"
      onMouseDown={rightClickMenuCancelCheck}
      onMouseUp={rightClickMenu} style={{ background: "url(" + bg.src + ")", backgroundSize: "cover" }}>

      {RenderIcons}
      <ZindexContext.Provider value={{
        zindex: zindex,
        setZindex: setZindex,
        forms: forms,
        setForms: setForms,
        closeForm: closeForm
      }}
      >
        {RenderForms}
      </ZindexContext.Provider>

      {showRightClickMenu && <>
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
      </>}
    </div>

    <div className="flex absolute md:hidden top-0 w-screen h-screen text-white bg-color2 z-[9999999] items-center justify-center">
      Not ready for mobile
    </div>
  </>
}