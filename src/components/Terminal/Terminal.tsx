import { MutableRefObject, useContext, useEffect, useRef, useState } from "react";
import Container from "../Container/Container";
import { GlobalContext } from "../../helpers/GlobalContext";

export default function Terminal(props) {

    const [output, setOutput] = useState([
        `APH OS [Version 1.0.0]`,
        `(c) Adhika P.H, All right reserved`,
        `type "help" to show list of commands`,
    ])

    const [command, setCommand] = useState("")
    const console = useRef(null)
    const inputbox = useRef(null)
    const {forms, setForms} = useContext(GlobalContext)

    const submitInput = (event) => {
        let e = event as KeyboardEvent
        if (e.key == "Enter") {
            setOutput(ps=>[...ps,
                "/>"+command,
            ])
            let cmd = command.split(" ")
            switch (cmd[0]) {
                case "help":
                    setOutput(ps=>[...ps,
                        "help: show list of commands",
                        "killforms: close all opened form included this terminal",
                    ])
                break
                case "killforms":
                    setForms(ps=>forms.map((v,i)=>{
                        v.closeState = true
                        return v
                    }))
                break
                default:
                    setOutput(ps=>[...ps,
                        "Unknown command \""+command+"\"",
                    ])
                break
            }
            setCommand("");
        }
    }

    useEffect(()=>{
        (console.current as HTMLElement).scrollTop = (console.current as HTMLElement).scrollHeight
    },[output])

    return <Container {...props}>
        <div ref={console} onClick={()=>{inputbox.current.focus()}} className="h-full overflow-auto p-1 px-2 text-slate-300 font-fixedsys leading-4">
            {output.map((v,i)=>{
                return <p key={i}>{v}</p>
            })}
            <div className="flex">
                <p>/&gt;</p>
                <input 
                ref={inputbox}
                onKeyDown={submitInput}
                onChange={(e)=>{setCommand(e.target.value)}} 
                value={command} 
                className="bg-color4 w-full outline-none"
                />
            </div>
        </div>
    </Container>
}