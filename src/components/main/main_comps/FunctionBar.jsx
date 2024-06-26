'use client'
import { faCheckCircle, faTasks, faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { toast } from "react-hot-toast"
import { useState, useEffect } from "react"

export default function FunctionBarComp(props) {
    const [screenSize, setScreenSize] = useState({
        width: 0,
        height: 0,
      });
      useEffect(() => {
        setScreenSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
      }, [])
      useEffect(() => {
        const handleResize = () => {
          setScreenSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        };
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);
    function deleteHandler() {
        let selected = props.listData.filter((objMapped) => {
            return objMapped.selected
        })
        if (selected.length === 0) {
            toast.error('Please select a task to delete')
        } else {
            props.setListData((prev) => {
                return prev.filter((objMapped) => {
                    return !objMapped.selected
                })
            })
            toast.success('Selected tasks deleted successfully')
        }
    }
    function editHandler() {
        let selected = props.listData.filter((objMapped) => {
            return objMapped.selected
        })
        if (selected.length > 1) {
            toast.error('Please select only one task to edit')
        } else if (selected.length === 0) {
            toast.error('Please select a task to edit')
        } else {
            props.setEditorMode([true, selected[0]])
            props.setModalState(true)
        }
    }
    function completedHandler() {
        let selected = props.listData.filter((objMapped) => {
            return objMapped.selected
        } )
        if (selected.length === 0) {
            toast.error('Please select a task to mark as complete')
        } else {
            props.setListData((prev) => {
                return prev.map((objMapped) => {
                    if (objMapped.selected) {
                        return {...objMapped, completed: true}
                    } else {
                        return objMapped
                    }
                })
            })
            toast.success('Selected tasks marked as completed')
        }
    }
    function searchHandler() {
        let search = document.getElementById('search').value
        let searchResults = props.listData.filter((objMapped) => {
            return objMapped.title.toLowerCase().includes(search.toLowerCase())
        })
        props.setListData((prev) => {
            return [].concat(prev).sort((a, b) => {
                return searchResults.includes(a) ? -1 : searchResults.includes(b) ? 1 : 0
            })
        })
        if (search !== '') {
            let sort = document.getElementById('sort-menu')
            sort.disabled = true
            sort.selectedIndex = 0
        } else {
            document.getElementById('sort-menu').disabled = false
        }
    }
    function mobileSortHandler() {
        let sort = document.getElementById('sort-menu-mobile').value
        if (sort === 'lt') {
            props.setListData((prev) => {
                return [].concat(prev).sort((a, b) => {
                    return new Date(b.date_added) - new Date(a.date_added)
                })
            })
        } else if (sort === 'na') {
            props.setListData((prev) => {
                return [].concat(prev).sort((a, b) => {
                    return a.title.localeCompare(b.title)
                })
            })
        } else if (sort === 'dl') {
            props.setListData((prev) => {
                return [].concat(prev).sort((a, b) => {
                    return new Date(a.deadline) - new Date(b.deadline)
                })
            })
        }
    }
    function mobileSearchHandler() {
        let search = document.getElementById('search-mobile').value
        let searchResults = props.listData.filter((objMapped) => {
            return objMapped.title.toLowerCase().includes(search.toLowerCase())
        })
        props.setListData((prev) => {
            return [].concat(prev).sort((a, b) => {
                return searchResults.includes(a) ? -1 : searchResults.includes(b) ? 1 : 0
            })
        })
        if (search !== '') {
            let sort = document.getElementById('sort-menu-mobile')
            sort.disabled = true
            sort.selectedIndex = 0
        } else {
            document.getElementById('sort-menu-mobile').disabled = false
        }
    }
    function sortHandler() {
        let sort = document.getElementById('sort-menu').value
        if (sort === 'lt') {
            props.setListData((prev) => {
                return [].concat(prev).sort((a, b) => {
                    return new Date(b.date_added) - new Date(a.date_added)
                })
            })
        } else if (sort === 'na') {
            props.setListData((prev) => {
                return [].concat(prev).sort((a, b) => {
                    return a.title.localeCompare(b.title)
                })
            })
        } else if (sort === 'dl') {
            props.setListData((prev) => {
                return [].concat(prev).sort((a, b) => {
                    return new Date(a.deadline) - new Date(b.deadline)
                })
            })
        }
    }
    return (
        <>  
            <div className="lg:hidden flex flex-col p-4 shadow-md rounded-md bg-white justify-center items-center align-middle gap-5 w-full -mt-[26px]">
            <div className="max-w-md lg:hidden w-full block">
                <div className="relative flex items-center w-full h-[50.4px] rounded-lg bg-gray-100 border-0 overflow-hidden">
                    <input
                    className="peer h-full w-full outline-none px-5 text-sm bg-gray-100 text-gray-900 pr-2"
                    onChange={mobileSearchHandler}
                    type="text"
                    id="search-mobile"
                    placeholder="Search task"
                    />
                </div>
                </div>
                <div className="lg:hidden block w-full">
                    <select id="sort-menu-mobile" onChange={mobileSortHandler} className="py-4 px-4 pe-20 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                        <option value="sb">Sort By</option>
                        <option value="lt">Latest</option>
                        <option value="na">Name</option>
                        <option value="dl">Deadline</option>
                    </select>
                </div>
            </div>
            <div className={props.modalState ? "flex flex-row p-5 shadow-md rounded-md bg-white justify-center items-center align-middle gap-10 w-full -mt-[26px]" : "flex flex-row p-5 shadow-md opacity-100 rounded-md top-0 z-[1] sticky bg-white justify-center align-middle gap-10 w-full -mt-[26px]"}>
                {
                    screenSize.width > 1024 ? (
                        <>
                                            <div className="max-w-md lg:block hidden">
                <div className="relative flex items-center w-full h-[40.4px] lg:h-[50.4px] rounded-lg bg-gray-100 border-0 overflow-hidden">
                    <div className="grid place-items-center h-full w-full lg:w-12 text-gray-300">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="{2}"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    </div>
                    <input
                    className="peer h-full w-full outline-none text-sm bg-gray-100 text-gray-900 pr-2"
                    onChange={searchHandler}
                    type="text"
                    id="search"
                    placeholder="Search task"
                    />
                </div>
                </div>
                <div className="lg:block hidden">
                    <select id="sort-menu" onChange={sortHandler} className="py-4 px-4 pe-20 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                        <option value="sb">Sort By</option>
                        <option value="lt">Latest</option>
                        <option value="na">Name</option>
                        <option value="dl">Deadline</option>
                    </select>
                </div>
                        </>
                    ) : <></>
                }
                <div className="p-0 b-0 flex flex-row justify-center align-middle hover:text-white">
                    <button type="button" onClick={deleteHandler} className="text-red-600 ring-2 ring-red-600 bg-white lg:aspect-auto aspect-square lg:w-auto w-12 flex flex-row align-middle justify-center items-center border- hover:bg-red-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full lg:rounded-lg p-2 text-sm lg:px-5 lg:py-[14.4px] text-center lg:me-2 lg:mb-2">
                        <FontAwesomeIcon icon={faX} className="m-0 p-0 lg:me-2 text-lg" />
                        <p className="lg:block hidden">
                            Delete Task
                        </p>
                    </button>
                </div>
                <div className="p-0 b-0 -mx-7 flex flex-row justify-center align-middle hover:text-white">
                    <button type="button" onClick={editHandler} className="text-yellow-500 ring-2 ring-yellow-500 lg:aspect-auto aspect-square flex flex-row lg:w-auto w-12 align-middle justify-center items-center bg-white hover:bg-yellow-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full lg:rounded-lg p-2 text-sm lg:px-5 lg:py-[14.4px] text-center lg:me-2 lg:mb-2">
                        <FontAwesomeIcon icon={faTasks} className="m-0 p-0 b-0 lg:me-2 text-lg" />
                        <p className="lg:block hidden">
                            Edit Task
                        </p>
                    </button>
                </div>
                <div className="p-0 b-0 flex flex-row justify-center align-middle hover:text-white">
                    <button type="button" onClick={completedHandler} className="text-green-600 ring-2 ring-green-600 lg:aspect-auto aspect-square flex flex-row lg:w-auto w-12 align-middle justify-center items-center bg-white border- hover:bg-green-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full lg:rounded-lg p-2 text-sm lg:px-5 lg:py-[14.4px] text-center lg:me-2 lg:mb-2">
                        <FontAwesomeIcon icon={faCheckCircle} className="m-0 p-0 lg:me-2 text-lg" />
                        <p className="lg:block hidden">
                            Mark As Complete
                        </p>
                    </button>
                </div>
            </div>
        </>
    )
}