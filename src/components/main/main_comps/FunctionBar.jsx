import { toast } from "react-hot-toast"

export default function FunctionBarComp(props) {
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
    function sortHandler() {
        let sort = document.getElementById('sort-menu').value
        if (sort === 'da') {
            props.setListData((prev) => {
                return [].concat(prev).sort((a, b) => {
                    return new Date(a.date_added) - new Date(b.date_added)
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
            <div className="flex flex-row justify-start align-middle gap-10 w-full -mt-[26px]">
                <div className="max-w-md">
                <div className="relative flex items-center w-full h-[50.4px] rounded-lg bg-gray-100 border-0 overflow-hidden">
                    <div className="grid place-items-center h-full w-12 text-gray-300">
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
                <div className="">
                    <select id="sort-menu" onChange={sortHandler} className="py-4 px-4 pe-20 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                        <option value="sb">Sort By</option>
                        <option value="da">Date Added</option>
                        <option value="na">Name</option>
                        <option value="dl">Deadline</option>
                    </select>
                </div>
                <div className="p-0 b-0 flex flex-row justify-center align-middle hover:text-white">
                    <button type="button" onClick={deleteHandler} className="text-red-600 ring-2 ring-red-600 bg-white border- hover:bg-red-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-[14.4px] text-center me-2 mb-2">Delete Selected</button>
                </div>
                <div className="p-0 b-0 -mx-7 flex flex-row justify-center align-middle hover:text-white">
                    <button type="button" onClick={editHandler} className="text-yellow-500 ring-2 ring-yellow-500 bg-white border- hover:bg-yellow-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-[14.4px] text-center me-2 mb-2">Edit Selected</button>
                </div>
                <div className="p-0 b-0 flex flex-row justify-center align-middle hover:text-white">
                    <button type="button" onClick={completedHandler} className="text-green-600 ring-2 ring-green-600 bg-white border- hover:bg-green-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-[14.4px] text-center me-2 mb-2">Mark Selected As Complete</button>
                </div>
            </div>
        </>
    )
}