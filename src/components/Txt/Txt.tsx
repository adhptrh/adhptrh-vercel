import { useState } from "react"
import Container from "../Container/Container";

export default function Txt(props) {
    const [content, setContent] = useState(props.content)

    return <Container {...props}>
        <div className="h-full bg-color1 overflow-hidden">
            <textarea aria-label="notepad" className="w-full p-1 resize-none border-0 outline-none h-full bg-color4" onChange={(e)=>{setContent(e.target.value)}} value={content}/>
        </div>
    </Container>
}