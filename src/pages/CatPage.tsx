import {useState} from "react";

const CatPage =()=>{
    const [albumImage,setAlbumImage] =useState<string>("https://i.pinimg.com/474x/50/f4/f2/50f4f2d561d1e60f462f47182ff5bba5.jpg")
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
                // @ts-expect-error
                if(data?.results.albummatches !=0){
                    // console.log(data.results.albummatches.album[0].image[0])
                    setAlbumImage(data.results.albummatches.album[0].image[0].text)
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
                <input className={"bg-[whitesmoke] rounded-2xl"} type={"search"} placeholder={"search for an album"} required={true} onChange={(e)=>{
                    setSearchTerm(e.target.value)
                }}/>
                <button style={{backgroundColor:"rgb(255, 75, 145)",padding:"10px", borderRadius:"10px",color:"white",marginBottom:"10px",cursor:"pointer"}}
                        onClick={()=>fetchAlbumImage()}
                >
                    Search
                </button>
            </div>
            <img src={catImage} alt={"cat image"} className={"flex align-center justify-center"}/>
            <img src={albumImage} alt={"album image"} className={"w-[200px] h-[200px] top-[400px] left-[320px] rounded-xl z-[-9999] fill"}/>
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
            <canvas></canvas>

        </div>
    )
}
export default CatPage