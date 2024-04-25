export default function ItemListComp(props) {
    return (
        <>
            <div className="flex flex-col gap-8">
                {(props.loading) ? (
                    <>
                        <div className="flex flex-row justify-center items-center align-middle shadow-md rounded-md w-full p-10">
                            <div className="flex flex-col justify-center w-11/12 gap-3">
                                <h1 className="text-3xl font-bold text-blue-600 text-center">Loading...</h1>
                                <p className="text-center text-sm font-light text-blue-300">Please wait</p>
                            </div>
                        </div>
                    </>
                ) : (props.listData.length === 0 && props.listData.constructor === Array) ? (            
                    <>
                        <div className="flex flex-row justify-center items-center align-middle shadow-md rounded-md w-full p-10">
                            <div className="flex flex-col justify-center w-11/12 gap-3">
                                <h1 className="text-3xl font-bold text-blue-600 text-center">No tasks added yet</h1>
                                <p className="text-center text-sm font-light text-blue-300">Add a task to get started</p>
                            </div>
                        </div>
                    </>
                    ) : (
                        props.listData.map((objMapped, index) => {
                            return (
                                <ItemComp key={index} idv={index} {...objMapped} />
                            )
                        })
                    ) }
            </div>      
        </>
    )
}

function ItemComp(props) {
    return (
        <>
            <div className="flex flex-row justify-center items-center align-middle shadow-md rounded-md w-full p-10">
                <div className="flex flex-row align-middle items-center w-1/12">
                    <input id={props.idv} type="checkbox" value="" className="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 " />
                </div>
                <div className="flex flex-col justify-center w-11/12 gap-3">
                    <h1 className="text-3xl font-bold text-start text-slate-900 break-all">{props.title}</h1>
                    <p className="text-start text-sm font-light text-slate-700">{props.desc}</p>
                    <div className="flex flex-row align-middle items-center gap-5">
                        <div className="">
                            {props.date_added}
                        </div>
                        <div className="">
                            {props.deadline}
                        </div>
                        <div className="">
                            countdown
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}