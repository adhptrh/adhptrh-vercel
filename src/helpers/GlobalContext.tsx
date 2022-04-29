import { createContext } from "react";

interface rightClickMenuProp {
    top?: number
    left?: number
}

interface ContextData {
    zindex: number
    setZindex: Function
    forms: Array<any>,
    setForms: Function,
    closeForm: Function,
    setShowRightClickMenu: Function,
    showRightClickMenu: boolean,
    setRightClickMenuProp: Function,
    setPath: Function,
    path: Array<any>
    rightClickMenuProp: rightClickMenuProp,
    setRightClickDataType: Function
    rightClickDataType: string
}

const ctx:ContextData = {
    zindex:0,
    setZindex:(e)=>{},
    forms:[],
    setForms:(e)=>{},
    closeForm: (e)=>{},
    setShowRightClickMenu: (e)=>{},
    showRightClickMenu:false,
    setRightClickMenuProp:(e)=>{},
    setPath:(e)=>{},
    path:[],
    rightClickMenuProp:{},
    setRightClickDataType: (e)=>{},
    rightClickDataType: "",
}

export const GlobalContext = createContext(ctx)