import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
export default function Navbar() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { data } = useSelector(state => state.articles)
    const [categories, seCategories] = useState([])
    const [state, setState] = useState({
        toggleDropDown: false,
        categorieActive: Number(localStorage.getItem("categoryActive")),
        toggleSideNav : false,
        toggleDropDownSideNv : false
    })
    useEffect(() => {
        seCategories(data.categoryList)
    }, [data])
    return (
        <div className="relative">
            <div className="fixed top-0 right-0 shadow" style={{ width: "100%", zIndex: 999 }}>
                <div className="flex justify-between bg-white px-5" style={{ minHeight: "70px" }}>
                    <div className="my-auto">
                        <h1 className="text-lg font-bold">New Today</h1>
                    </div>
                    <div className="hidden md:flex">
                        <div className="hidden md:block" onClick={() => {
                            history.push("/bookmark")
                        }}>
                            <h1 className="mx-5 py-5 hover:text-blue-400 cursor-pointer">Bookmark</h1>
                        </div>
                        <div className="flex py-5">
                            <h1 className="px-5">Kategori</h1>
                            <div className="border-l px-5 hover:text-blue-400 cursor-pointer" onClick={() => {
                                if (state.toggleDropDown) {
                                    setState({ ...state, toggleDropDown: false })
                                } else {
                                    setState({ ...state, toggleDropDown: true })
                                }
                            }}>
                                <span className="material-icons" style={{ transform: state.toggleDropDown ? "rotate(180deg)" : "rotate(0deg)", transition: "all ease-in-out .4s" }}>expand_more</span>
                            </div>
                        </div>
                    </div>
                    <div className="my-auto md:hidden">
                        <button className="material-icons text-black" onClick={() => {
                            if (state.toggleDropDown) {
                                setState({ ...state, toggleSideNav: false })
                            } else {
                                setState({ ...state, toggleSideNav: true })
                            }
                        }}>menu</button>
                    </div>
                </div>
            </div>
            {/* Dropdown */}
            <div className="hidden md:block bg-white border-t border-black py-5 fixed overflow-auto" style={{ width: "100%", zIndex: 99, top: state.toggleDropDown ? "70px" : "-120%", transition: "all ease-in-out .4s" }}>
                <div className="px-5 overflow-auto">
                    {categories.map((item, index) => {
                        return <button className={state.categorieActive === index ? "rounded-3xl my-auto mb-5 px-5 py-1 mr-5 font-bold border-black bg-black text-white" : "rounded-3xl my-auto mb-5 px-5 py-1 mr-5 font-bold border hover:text-white hover:bg-black"} style={{outline:"none"}} onClick={()=>{
                            localStorage.setItem("categoryActive", index)
                            history.push("/")
                            setState({...state, categorieActive:index})
                            dispatch({type:"CHOOSE_CATEGORY", payload:item.name})
                        }}>{item.name}</button>
                    })}
                </div>
            </div>
            {/* end Dropdown */}
            {/* sidenav mob */}
            <div className="bg-white fixed" style={{width:"60vw", height:"100vh", zIndex:9999, transition:"all ease-in-out .4s", top : 0, right : state.toggleSideNav ? 0 : "-100%"}}>
                <div className="flex justify-end px-5 py-5">
                    <span className="material-icons cursor-pointer" onClick={()=>{
                        setState({...state, toggleSideNav:false})
                    }}>close</span>
                </div>
                <div className="my-10">
                    <div className="hover:bg-gray-300" onClick={() => {
                        history.push("/bookmark")
                    }}>
                        <button className="py-3 px-5" style={{outline:"none"}}>Bookmark</button>
                    </div>
                    <div className="flex justify-between hover:bg-gray-300" onClick={() => {
                                if (state.toggleDropDownSideNv) {
                                    setState({ ...state, toggleDropDownSideNv: false })
                                } else {
                                    setState({ ...state, toggleDropDownSideNv: true })
                                }
                            }}>
                        <button className="py-3 px-5" style={{outline:"none"}}>Kategori</button>
                        <span className="material-icons py-3 px-3" style={{ transform: state.toggleDropDownSideNv ? "rotate(180deg)" : "rotate(0deg)", transition: "all ease-in-out .4s" }}>expand_more</span>
                    </div>
                    <div className="overflow-auto bg-gray-100" style={{height: state.toggleDropDownSideNv ? "320px" : "0", transition:"all ease-in-out .4s"}}>
                        {categories.map((item, index)  => {
                            return <div className={state.categorieActive === index ? "bg-gray-300" : "hover:bg-gray-300"}>
                            <button className="px-8 py-2 text-sm" style={{outline:"none"}} onClick={()=>{
                                localStorage.setItem("categoryActive", index)
                                history.push("/")
                                setState({...state, categorieActive:index})
                                dispatch({type:"CHOOSE_CATEGORY", payload:item.name})
                        }}>{item.name}</button>
                        </div>
                        })}
                    </div>
                </div>
            </div>
            {/* end slidenav mob */}
            {/* siluet */}
            <div className={`fixed top-0 right-0 ${state.toggleDropDown || state.toggleSideNav  ? 'fadein' : 'fadeout'}`} style={{ width: "100vw", height: "100vh", background: "rgba(0,0,0,.4)", transition: "all ease-in-out .4s" }}></div>
            {/* end siluet */}
        </div>
    )
}

