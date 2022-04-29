import { useContext, useEffect, useRef, useState } from "react"
import styles from "./Container.module.css"
import { GlobalContext } from "../../helpers/GlobalContext"

export default function Container(props) {

    const initialPos = {
        top: props.top ?? 50,
        left: props.left ?? 50
    }
    const initialSize = {
        width: props.width ?? 400,
        height: props.height ?? 200,
    }
    const [mouseDownPosition, setMouseDownPosition] = useState({
        left: 0,
        top: 0
    })
    const { zindex, setZindex, closeForm } = useContext(GlobalContext)
    const [zind, setZind] = useState(0)
    const [showMovePanel, setShowMovePanel] = useState(false)
    const [position, setPosition] = useState(initialPos)
    const [savedPosition, setSavedPosition] = useState(initialPos)
    const [showResizePanel, setShowResizePanel] = useState(false)
    const [size, setSize] = useState(initialSize)
    const [savedSize, setSavedSize] = useState(initialSize)
    const [transform, setTransform] = useState("rotateX(90deg)")

    const titleBar = useRef(null)

    useEffect(() => {
        setTransform("rotateX(90deg)")
        if (props.closeState) {
            setTimeout(() => {
                closeForm(props.id)
            }, 500)
        }
    }, [props.closeState])

    useEffect(() => {
        setTransform("rotateX(0deg)")
        setZind(zindex + 1)
        setZindex(ps => ps + 1)
    }, [])

    return <>
        <div onMouseDown={() => { setZind(zindex + 1); setZindex(ps => ps + 1); }} className={styles.container} style={{
            transform: transform,
            top: position.top + "px",
            left: position.left + "px",
            width: size.width,
            height: size.height,
            zIndex: zind
        }}
        >

            {/* # RESIZE BOX BOTTOM RIGHT */}
            <div onMouseDown={(e) => {
                setShowResizePanel(prevState => true)
                setMouseDownPosition(prevState => { return { top: e.clientY, left: e.clientX } })
                setSavedSize(prevState => size)
            }} className="absolute float-right cursor-se-resize opacity-0 left-full top-full bg-black w-[10px] h-[10px]" style={{ transform: "translate(-100%,-100%)" }} />
            <div ref={titleBar} className={styles.titlebar + ""}>
                <div className="float-right">
                    <button className={styles.button}>_</button>
                    <button aria-label="close" className={styles.button} onClick={() => {
                        setTransform("rotateX(90deg)")
                        setTimeout(() => {
                            closeForm(props.id)
                        }, 500)
                    }}><span className="bi-x"></span></button>
                </div>
                <div onMouseDown={(e) => {
                    setShowMovePanel(prevState => true);
                    setMouseDownPosition(prevState => { return { top: e.clientY, left: e.clientX } })
                    setSavedPosition(prevState => position)
                }} className="w-full p-1 pl-2">
                    <p>{props.title}</p>
                </div>
            </div>
            {props.helperbar}
            <div className={styles.body}>
                {props.children}
            </div>

        </div>
        {showMovePanel && <>
            <div onMouseUp={() => { setShowMovePanel(false); }} onMouseMove={(e) => {
                let newPos = {
                    left: savedPosition.left + (e.clientX - mouseDownPosition.left),
                    top: savedPosition.top + (e.clientY - mouseDownPosition.top)
                }
                setPosition(newPos)
            }} className="absolute top-0 left-0 bg-black opacity-0 w-screen h-screen" style={{ zIndex: zind }}></div>
        </>}

        {showResizePanel && <>
            <div onMouseUp={() => { setShowResizePanel(false) }} onMouseMove={(e) => {
                let newSize = {
                    width: savedSize.width + (e.clientX - mouseDownPosition.left),
                    height: savedSize.height + (e.clientY - mouseDownPosition.top),
                }
                if (newSize.width < 200) newSize.width = 200
                if (newSize.height < 100) newSize.height = 100
                setSize(newSize)
            }} className="absolute top-0 left-0 bg-black cursor-se-resize opacity-0 w-screen h-screen" style={{ zIndex: zind }}></div>
        </>}
    </>
}