import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navbar } from '../../components'
export default function Main() {
    const dataBookmark = JSON.parse(localStorage.getItem("bookmark"))
    const { data, loading, categoryActive } = useSelector(state => state.articles)
    const [articles, setArticles] = useState({
        data: [],
        tersimpan: []
    })
    useEffect(() => {
        data.categories.forEach(item => {
            if (item.name === categoryActive) {
                setArticles({ ...articles, data: item.templates })
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, categoryActive])
    useEffect(() => {
        if (dataBookmark !== null) {
            const tersimpan = dataBookmark.data.map(item => {
                return item.id
            })
            setArticles({ ...articles, tersimpan: tersimpan })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="bg-gray-100" style={{ minHeight: "70vh" }}>
            <Navbar />
            <div className="container mx-auto px-5" style={{ marginTop: "70px" }}>
                {articles.data.filter(templates => templates.title !== undefined).map(templates => {
                    return <div className="pt-10">
                        <h1 className="font-bold text-lg mb-5">{templates.title}</h1>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {templates.sections[0].articles.filter(article => article.id !== -1).map(article => {
                                return <div>
                                    <div className="overflow-hidden rounded-md h-24 sm:h-32 lg:h-40">
                                        <img className="w-full" src={`https://obs.line-scdn.net/${article.thumbnail.hash}/w280`} alt="/" />
                                    </div>
                                    <button className="rounded bg-blue-400 text-white text-xs px-3 py-2 mt-2" disabled={articles.tersimpan.indexOf(article.id) === -1 ? false : true} onClick={() => {
                                        if (localStorage.getItem("bookmark") === null) {
                                            localStorage.setItem("bookmark", JSON.stringify({ data: [article] }))
                                            setArticles({ ...articles, tersimpan: [article.id] })
                                        } else {
                                            const bookmark = JSON.parse(localStorage.getItem("bookmark"))
                                            bookmark.data.push(article)
                                            localStorage.setItem("bookmark", JSON.stringify(bookmark))
                                            setArticles({ ...articles, tersimpan: [...articles.tersimpan, article.id] })
                                        }
                                    }}>{articles.tersimpan.indexOf(article.id) === -1 ? "Tambah ke Bookmark" : "Tersimpan"}</button>
                                    <div className="overflow h-20">
                                        <h2 className="font-bold mt-2 cursor-pointer hover:text-blue-400" onClick={() => {
                                            window.open(article.url.url)
                                        }}>{article.title}</h2>
                                    </div>
                                    <p className="text-sm mt-3 text-gray-300">{article.publisher}</p>
                                </div>
                            })}
                        </div>
                    </div>
                })}
            </div>
            {/* loading */}
            <div className={`fixed h-screen w-screen top-0 right-0 ${loading ? 'fadein' : 'fadeout'}`} style={{ zIndex: 99999, background: "rgba(0,0,0,0.4)" }}>
                <div className="absolute" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <div className="w-10 h-10 rounded-full border-t-4 border-blue-400 animate-spin " ></div>
                </div>
            </div>
            {/* ennd loading */}
        </div>
    )
}
