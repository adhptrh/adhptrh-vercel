import { createContext } from "react";

interface RightClickMenuProp {
    top?: number
    left?: number
}

interface RightClickData {
    id?: string
    path?: string
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
    rightClickMenuProp: RightClickMenuProp,
    setRightClickDataType: Function
    rightClickDataType: string
    setRightClickData: Function
    rightClickData: RightClickData
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
    setRightClickData: (e)=>{},
    rightClickData: {},
}

export const GlobalContext = createContext(ctx)