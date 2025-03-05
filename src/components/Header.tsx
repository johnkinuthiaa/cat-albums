import {useState} from "react";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const root =document.getElementById("root")

const Header =()=>{
    const [theme,setTheme] =useState("dark")
    if(root !=null){
        root.style.backgroundColor= theme==="light"?"white":"black"
        root.style.color= theme==="light"?"black":"white"
        root.style.position="relative"
        root.style.width="100%"
        root.style.zIndex="1"
        root.style.height="110vh"
        root.style.marginTop="-50px"
    }
    const heading={
        color:theme==="light"?"black":"white"
    }
    return (
        <div className={"flex justify-between align-center mt-2 "} style={{marginTop:"50px"}}>
            <h1 className={"text-black text-2xl"} style={heading}>Cat <span className={"text-pink-400"}>albums</span></h1>
            <button className={`${theme==="light"?"text-gold-900":"text-gold-900"} cursor-pointer p-2 rounded-2xl`}
                    onClick={()=>setTheme(theme==="light"?"dark":"light")}
            >
                {theme==="light"?<LightModeIcon/>:<DarkModeIcon/>}
            </button>
        </div>
    )
}
export default Header