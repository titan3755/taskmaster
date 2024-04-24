export default function FunctionBarComp() {
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
                    type="text"
                    id="search"
                    placeholder="Search task"
                    />
                </div>
                </div>
                <div className="">
                    <select id="sort-menu" className="py-4 px-4 pe-20 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                        <option value="">Sort By</option>
                        <option>Date Added</option>
                        <option>Name</option>
                        <option>Deadline</option>
                    </select>
                </div>
                <div className="p-0 b-0 flex flex-row justify-center align-middle hover:text-white">
                    <button type="button" className="text-red-600 ring-2 ring-red-600 bg-white border- hover:bg-red-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-[14.4px] text-center me-2 mb-2">Delete Selected</button>
                </div>
                <div className="p-0 b-0 -mx-7 flex flex-row justify-center align-middle hover:text-white">
                    <button type="button" className="text-green-600 ring-2 ring-green-600 bg-white border- hover:bg-green-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-[14.4px] text-center me-2 mb-2">Mark Selected As Complete</button>
                </div>
            </div>
        </>
    )
}