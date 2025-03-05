import {useEffect, useState} from "react";


const CatPage =()=>{
    const [albumImage,setAlbumImage] =useState<string>("https://i.scdn.co/image/ab67616d000048512719343298d0e4f1790e14cd")
    const [message,setMessage] =useState<string>("")
    const[catImage,setCatImage]=useState<string>("src/assets/cat2.png")
    const[searchTerm,setSearchTerm] =useState<string>("")

    const[accessToken,setAccessToken]=useState<string>("")

    const ENDPOINT =`https://api.spotify.com/v1/search?q=${searchTerm}&type=album&limit=1`

    useEffect(()=>{
        const token =sessionStorage.getItem("token")
        if(token !==null){
            setAccessToken(token)
        }else{
            authenticate()
        }
    },[])

    const fetchAlbumImage =(async ()=>{
        const myHeaders =new Headers()
        myHeaders.append("Authorization",`Bearer ${accessToken}`)

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
                const image =data?.albums?.items[0].images[0].url
                console.log(image)
                setAlbumImage(image)
            }
            else{
                setMessage("Error fetching your image")
            }

        }catch (e) {
            throw new Error("Error"+e)
        }

    })
    const authenticate =(async ()=>{
    //
        const myHeaders =new Headers()
        myHeaders.append("Content-Type","application/x-www-form-urlencoded")
        const response =await fetch("https://accounts.spotify.com/api/token",{
            method:"POST",
            headers:myHeaders,
            body:"grant_type=client_credentials&client_id=6877a5de0c674752aa5c5487c24874bf&client_secret=fd40d9c4499b42489ec96a566203eb5c"
        })
        if(response.ok){
            const data =await response.json()
            if(data?.access_token !=null){
                console.log(data.access_token)
                setAccessToken(data?.access_token)
                sessionStorage.setItem("token",data?.access_token)
            }else{
                throw new Error("Access token not found")
            }
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
                        }}
                >
                    Search
                </button>
            </div>
            {/*<img src={catImage} alt={"cat image"} className={"cat__image h-[350px] w-[350px]"} />*/}
            {/*<img src={albumImage} alt={"album image"} style={{*/}
            {/*    position:"absolute",*/}
            {/*    zIndex:"-9999",*/}
            {/*    marginTop:"233px",*/}
            {/*    height:"184px",*/}
            {/*    width:"183px",*/}
            {/*    objectFit:"cover",*/}
            {/*    marginLeft:"7px"*/}

            {/*}} className={"album__image"}/>*/}
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