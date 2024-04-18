export default function FunctionBarComp() {
    return (
        <>
            <div className="flex flex-row justify-start align-middle gap-10 w-full -mt-[68px]">
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
                <select className="py-4 px-4 pe-20 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                    <option value="">Sort By</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
                </div>
            </div>
        </>
    )
}