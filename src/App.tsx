import CatPage from "./pages/CatPage.tsx";
import Header from "./components/Header.tsx";

function App() {
    const appStyle ={
        margin:"50px auto",
        height:"100%",
    }

  return (
    <div className={"font-bold flex flex-col align-center justify-center w-[50%] h-[100px] overflow-none"} style={appStyle}>
        <Header/>
        <CatPage/>
        <footer className={"fixed top-220 text-center align-center flex items-center"}> made with by &cp& sli</footer>
    </div>
  )
}

export default App
