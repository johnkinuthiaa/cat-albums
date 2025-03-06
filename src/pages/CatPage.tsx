import {useEffect,useState} from "react";

import domtoimage from 'dom-to-image';
import DownloadIcon from '@mui/icons-material/Download';
const CatPage =()=>{
    const [albumImage,setAlbumImage] =useState<string>("https://i.scdn.co/image/ab67616d0000b2732719343298d0e4f1790e14cd")
    const [message,setMessage] =useState<string>("")
    const[catImage,setCatImage]=useState<string>("/cat2.png")
    const[searchTerm,setSearchTerm] =useState<string>("")

    const CLIENT_ID=import.meta.env.VITE_SPOTIFY_CLIENT
    const SECRET_ID=import.meta.env.VITE_SPOTIFY_SECRET
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
                await authenticate()

            }

        }catch (e) {
            setMessage("Error fetching your image")
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
            body:`grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${SECRET_ID}`
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
    const download =()=>{
        const image =document.getElementById('album_image')
        if(image !==null){
            domtoimage.toJpeg(image, { quality: 1 })
                .then(function (dataUrl:string) {
                    const link = document.createElement('a');
                    link.download = `cat-${searchTerm}.jpeg`;
                    link.href = dataUrl;
                    link.click();
                });
        }else{
            setMessage("Image not found")
        }

    }

    return(
        <div className={"cat__image__holder"}>
            <p className={"text-red-600"}>{message}</p>
            <div className={"flex align-center gap-1"}>
                <input className={"search"} type={"search"} placeholder={"search for an album or artist..."} required={true} onChange={(e)=>{
                    setSearchTerm(e.target.value)
                }}/>
                <button type={"submit"} style={{backgroundColor:"rgb(255, 75, 145)",padding:"10px", borderRadius:"10px",color:"white",marginBottom:"10px",cursor:"pointer"}}
                        onClick={()=> {
                            fetchAlbumImage()
                        }}
                >
                    Search
                </button>
            </div>
            <div className={"relative flex flex-col items-center"} id={"album_image"}>
                <img src={catImage} alt={"cat image"} className={"cat__image h-[350px] w-[350px]"} />
                <img src={albumImage} alt={"album image"} style={{
                    position:"absolute",
                    zIndex:"-9999",
                    marginTop:"179px",
                    height:"184px",
                    width:"183px",
                    objectFit:"cover",
                    marginLeft:"7px"
                }} className={"album__image"}/>
            </div>
            <h4>Download</h4>
            <button className={"download bg-yellow-500 rounded-xl cursor-pointer"} onClick={(e)=>{
                e.preventDefault()
                download()
            }}><DownloadIcon/></button>

            <div className={"choices"}>
                <div onClick={()=>{
                    setCatImage("/cat2.png")
                }}>
                    <img src={"cat2.png"} alt={"with no shades"}/>
                    <p>No shades</p>
                </div>
                <div onClick={()=>{
                    setCatImage("/cat3.png")
                }}>
                    <img src={"/cat3.png"} alt={"with black shades"}/>
                    <p>Black shades</p>
                </div>
                <div onClick={()=>{
                    setCatImage("/cat4.png")
                }}>
                    <img src={"/cat4.png"} alt={"with rockstar shades"}/>
                    <p>Pink shades</p>
                </div>
            </div>

        </div>
    )
}
export default CatPage