import React, { useEffect, useState } from 'react'
import { Footer, Navbar } from '../../components'

export default function Bookmark() {
    const dataBookmark = JSON.parse(localStorage.getItem("bookmark"))
    const [state, setState] = useState({
        articles : []
    })
    useEffect(()=>{
        if(dataBookmark !== null){
            setState({...state, articles : dataBookmark.data})
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    function removeA(arr) {
        var what, a = arguments, L = a.length, ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax= arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
    }
    return (
        <>
            <Navbar />
            <div className="bg-gray-100 relative" style={{ minHeight: "70vh" }}>
                <div className="container mx-auto px-5 py-5">
                    <div className="pt-10 pb-5">
                        <h1 className="font-bold text-2xl py-5">Berita Tersimpan</h1>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {state.articles.map(article => {
                            return <div>
                            <div className="overflow-hidden rounded-md h-20 h-24 sm:h-32 lg:h-40">
                                <img className="w-full" src={`https://obs.line-scdn.net/${article.thumbnail.hash}/w280`} alt="/" />
                            </div>
                            <button className="rounded bg-red-400 text-white text-xs px-3 py-2 mt-2" onClick={()=>{
                                setState({...state, articles : removeA(state.articles, article)})
                                localStorage.setItem("bookmark", JSON.stringify({ data : removeA(state.articles, article)}))
                            }}>Delete</button>
                            <div className="overflow h-20">
                                <h2 className="font-bold mt-2 cursor-pointer hover:text-blue-400" onClick={()=>{
                                    window.open(article.url.url)
                                }}>{article.title}</h2>
                            </div>
                        <p className="text-sm mt-3 text-gray-300">{article.publisher}</p>
                        </div>
                        })}
                    </div>
                </div>
                <div className={`my-auto mx-auto absolute ${state.articles.length === 0 ? "" : "hidden"}`} style={{top:"50%", left:"50%", transform:"translate(-50%, -50%)"}}>
                    <div className="text-2xl text-center font-semibold"><span className="text-red-400">404</span><span className="text-gray-600"> Tidak ada Berita Tresimpan</span></div>
                </div>
            </div>
        <Footer />
        </>
    )
}

