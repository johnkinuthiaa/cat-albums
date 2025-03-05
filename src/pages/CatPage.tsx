import {useState} from "react";


const CatPage =()=>{
    const [albumImage,setAlbumImage] =useState<string>("https://i.scdn.co/image/ab67616d000048512719343298d0e4f1790e14cd")
    const [message,setMessage] =useState<string>("")
    const[catImage,setCatImage]=useState<string>("src/assets/cat2.png")
    const[searchTerm,setSearchTerm] =useState<string>("")
    const ENDPOINT =import.meta.env.VITE_LASTFM_KEY+`?method=album.search&album=${searchTerm}&api_key=848470c72614d61c6eb17b49a0d3e7a5&format=json&page=1&limit=1`
    const fetchAlbumImage =(async ()=>{
        const myHeaders =new Headers()
        myHeaders.append("Content-Type","application/json")
        if(searchTerm ==""){
            setMessage("Search term cannot be empty")
            return
        }
        try{
            const response =await fetch(ENDPOINT,{
                method:"GET",
                headers:myHeaders
            })
            if(response.ok){
                const data =await response.json()
                if(data?.results.albummatches !=0){
                    console.log()
                    setAlbumImage(data.results.albummatches.album[0].image[2]["#text"])
                }else{
                    setMessage("no album with the name"+ searchTerm+" found")
                }
            }
            else{
                setMessage("Error fetching your image")
            }

        }catch (e) {
            throw new Error("Error"+e)
        }

    })
    return(
        <div className={"cat__image__holder"}>
            <p className={"text-red-600"}>{message}</p>
            <div className={"flex align-center gap-1"}>
                <input className={"search"} type={"search"} placeholder={"search for an album"} required={true} onChange={(e)=>{
                    setSearchTerm(e.target.value)
                }}/>
                <button style={{backgroundColor:"rgb(255, 75, 145)",padding:"10px", borderRadius:"10px",color:"white",marginBottom:"10px",cursor:"pointer"}}
                        onClick={()=> {
                            fetchAlbumImage()
                            setSearchTerm("")
                        }}
                >
                    Search
                </button>
            </div>
            <img src={catImage} alt={"cat image"} className={"cat__image h-[350px] w-[350px]"} />
            <img src={albumImage} alt={"album image"} style={{
                position:"absolute",
                zIndex:"-9999",
                marginTop:"232px",
                height:"184px",
                width:"183px",
                objectFit:"fill",
                marginLeft:"7px"

            }} className={"album__image"}/>
            <div className={"choices"}>
                <div onClick={()=>{
                    setCatImage("src/assets/cat2.png")
                }}>
                    <img src={"src/assets/cat2.png"} alt={"with no shades"}/>
                    <p>No shades</p>
                </div>
                <div onClick={()=>{
                    setCatImage("src/assets/cat3.png")
                }}>
                    <img src={"src/assets/cat3.png"} alt={"with black shades"}/>
                    <p>Black shades</p>
                </div>
                <div onClick={()=>{
                    setCatImage("src/assets/cat4.png")
                }}>
                    <img src={"src/assets/cat4.png"} alt={"with rockstar shades"}/>
                    <p>Pink shades</p>
                </div>
            </div>

        </div>
    )
}
export default CatPage