import {  createContext, useContext, useState } from "react";

export const Appcontext = createContext()

export const AppProvider =({ children })=>{
    const [showpostModel , setshowpostmodel] = useState(false)
    return <Appcontext.Provider value={{showpostModel,setshowpostmodel}}>
        {children}
    </Appcontext.Provider>
}

export const useGlobel=() =>{
    return useContext(Appcontext)
}


export default AppProvider;