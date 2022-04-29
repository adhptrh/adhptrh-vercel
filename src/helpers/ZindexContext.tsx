import { createContext } from "react";

export const ZindexContext = createContext({
    zindex:0,
    setZindex:(e)=>{},
    forms:[],
    setForms:(e)=>{},
    closeForm: (e)=>{},
    setShowRightClickMenu: (e)=>{},
    showRightClickMenu:false,
    setRightClickMenuProp:(e)=>{},
})