import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../helpers/GlobalContext";
import Container from "../Container/Container";

export default function Folder(props) {

    const inspectPath = (path, index, cont) => {
        let content = cont
        for (let ii = 0; ii < content.length; ii++) {
            if (content[ii].name == path[index]) {
                return inspectPath(path, index + 1, content[ii].content)
            }
        }
        return content
    }

    const { setForms } = useContext(GlobalContext)
    const [currentPath, setCurrentPath] = useState("")
    const [items, setItems] = useState(inspectPath(currentPath.split("/"), 0, props.path))

    const gotoPath = (path) => {
        setCurrentPath(ps => path)
        setItems(ps => inspectPath((path).split("/"), 0, props.path))
    }

    const clickFolder = (v) => {
        let newp = currentPath + (currentPath.length < 1 ? "" : "/") + v.name
        setCurrentPath(newp)
        setItems(ps => inspectPath((newp).split("/"), 0, props.path))
    }

    const helper = <>
        <div className="flex pb-1">
            <div onClick={() => {
                let newp = currentPath.split("/");
                newp.length = newp.length - 1
                gotoPath(newp.join().replaceAll(",", "/"))
            }} className="mr-1 px-1 select-none theme-color-1 rounded-md"><span className="bi-arrow-left"></span></div>
            <p className="px-1 bg-color1 w-full rounded-md">/{currentPath}</p>
        </div>
    </>

    return <>
        <Container {...props} title={'File Manager'} helperbar={helper}>
            <div className="p-1">
                {items.map((v, i) => {
                    switch (v.type) {
                        case "folder":
                            return <div 
                            key={i} 
                            className="select-none px-2 rounded-md hover:bg-color3" 
                            onDoubleClick={(e) => { e.preventDefault(); clickFolder(v) }}
                            >{v.name}</div>
                        break

                        case "file":
                            return <div 
                            key={i} 
                            className="select-none px-2 rounded-md hover:bg-color3" 
                            onDoubleClick={(e) => {
                                setForms(ps => [...ps, {
                                    ...v,
                                    id: new Date().getTime() + Math.floor(Math.random() * 100),
                                    closeState: false,
                                }])
                            }}>{v.name}.{v.ext}</div>
                        break

                        case "filemanager":
                            return <div 
                            key={i} 
                            className="select-none px-2 rounded-md hover:bg-color3" 
                            onDoubleClick={(e) => {
                                setForms(ps => [...ps, {
                                    ...v,
                                    id: new Date().getTime() + Math.floor(Math.random() * 100),
                                    closeState: false,
                                }])
                            }}>{v.name}</div>
                        break

                        case "terminal":
                            return <div 
                            key={i} 
                            className="select-none px-2 rounded-md hover:bg-color3" 
                            onDoubleClick={(e) => {
                                setForms(ps => [...ps, {
                                    ...v,
                                    id: new Date().getTime() + Math.floor(Math.random() * 100),
                                    closeState: false,
                                }])
                            }}>{v.name}.{v.ext}</div>
                        break

                        default:
                            return <div 
                            key={i} 
                            className="select-none px-2 rounded-md hover:bg-color3"
                            >{v.name}</div>
                        break
                    }
                })}
            </div>
        </Container>
    </>
}