import { faPlusCircle, faHourglass1, faStopwatch, faCheckSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
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
                                <ItemComp key={index} setListData={props.setListData} idv={index}  {...objMapped} />
                            )
                        })
                    ) }
            </div>      
        </>
    )
}

function ItemComp(props) {
    function checkHandler() {
        props.setListData((prev) => {
            return prev.map((objMapped, index) => {
                if (index === props.idv) {
                    return {...objMapped, selected: !objMapped.selected}
                } else {
                    return objMapped
                }
            })
        })
    }
    return (
        <>
            <div className="flex flex-row justify-center items-center align-middle shadow-md rounded-md w-full p-10">
                <div className="flex flex-row align-middle items-center w-1/12">
                    <input id={props.idv} checked={props.selected} onChange={checkHandler} type="checkbox" className="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 " />
                </div>
                <div className="flex flex-col justify-center w-11/12 gap-3">
                    <h1 className="text-3xl font-bold text-start text-slate-900 break-all">{props.title}</h1>
                    <p className="text-start text-sm mb-2 font-light text-slate-700">{props.desc}</p>
                    <div className="flex flex-row align-middle items-center gap-5">
                        {
                            (props.completed) ? (
                                <div className="rounded-md shadow-sm bg-green-400 text-white flex flex-row align-middle justify-center items-center p-2">
                                    <FontAwesomeIcon icon={faCheckSquare} className="text-white p-0 mx-2" />
                                    <p className="text-white">Completed</p>
                                </div>
                            ) : 
                            <>
                                <div className="border rounded-md shadow-sm ring-2 ring-blue-700 flex flex-row align-middle justify-center items-center p-2">
                                    <FontAwesomeIcon icon={faPlusCircle} className="text-blue-700 p-0 mx-2" />
                                    <p>{props.date_added}</p>
                                </div>
                                <div className="border rounded-md shadow-sm ring-2 ring-yellow-400 flex flex-row align-middle justify-center items-center p-2">
                                    <FontAwesomeIcon icon={faHourglass1} className="text-yellow-400 p-0 mx-2" />
                                    <p>{props.deadline}</p>
                                </div>
                                <div className="border rounded-md shadow-sm ring-2 ring-red-400 flex flex-row align-middle justify-center items-center p-2">
                                    <FontAwesomeIcon icon={faStopwatch} className="text-red-400 p-0 mx-2" />
                                    <p>
                                        {
                                            (new Date(props.deadline).getTime() - new Date().getTime() < 0) ? (
                                                'Overdue' 
                                            ) : (Math.floor((new Date(props.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) < 1) ?
                                                'Due Today' : Math.floor((new Date(props.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) + ' day(s) left'
                                        }
                                    </p>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}