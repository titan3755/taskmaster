'use client'
import { useState, useEffect, useRef } from "react"
import FormComp from "./main_comps/Form"
import FunctionBarComp from "./main_comps/FunctionBar"
import ItemListComp from "./main_comps/ItemList"
import TitleComp from "./main_comps/Title"
import { toast } from "react-hot-toast"

export default function Main() {
    const [modalState, setModalState] = useState(false)
    const [taskTitle, setTaskTitle] = useState('')
    const [listData, setListData] = useState([])
    const [loading, setLoading] = useState(true)
    const [editorMode, setEditorMode] = useState([false, {}])
    const pageRendered = useRef(false)
    useEffect(() => {
        if (localStorage.getItem('listData')) {
            setListData(JSON.parse(localStorage.getItem('listData')))
            setLoading(false)
        } else {
            setLoading(false)
        }
    }, [])
    useEffect(() => {
        if (pageRendered.current) {
            localStorage.setItem('listData', JSON.stringify(listData))
            return
        }
        pageRendered.current = true
    }, [listData])
    return (
        <> 
            <div className="w-full min-h-screen bg-white shadow-inner p-24 flex justify-center align-middle flex-col">
                <div className="bg-white shadow-2xl border-gray-300 border rounded-xl w-full min-h-max p-10">
                    <MainBox editorMode={editorMode} setEditorMode={setEditorMode} loading={loading} listData={listData} setListData={setListData} taskTitle={taskTitle} setTaskTitle={setTaskTitle} modalState={modalState} setModalState={setModalState} />
                </div>
            </div>
            {modalState ? <ModalBox editorMode={editorMode} setEditorMode={setEditorMode} listData={listData} setListData={setListData} taskTitle={taskTitle} setTaskTitle={setTaskTitle} modalState={modalState} setModalState={setModalState} /> : <></>}
        </>
    )
}

function MainBox(props) {
    return (
        <>
            <div className="flex flex-col gap-12 justify-center px-12">
                <TitleComp />
                <FormComp taskTitle={props.taskTitle} setTaskTitle={props.setTaskTitle} modalState={props.modalState} setModalState={props.setModalState} />
                <FunctionBarComp editorMode={props.editorMode} setEditorMode={props.setEditorMode} modalState={props.modalState} setModalState={props.setModalState} listData={props.listData} setListData={props.setListData} />
                <ItemListComp loading={props.loading} listData={props.listData} setListData={props.setListData} />
            </div>
        </>
    )
}

function ModalBox(props) {
    if (props.editorMode[0]) {
        const [taskDesc, setTaskDesc] = useState(props.editorMode[1].desc.trim().replace(/(^\s*(?!.+)\n+)|(\n+\s+(?!.+)$)/g, ""))
        const [taskDeadline, setTaskDeadline] = useState({date: props.editorMode[1].deadline.trim().split(/\s+/)[0], time: props.editorMode[1].deadline.trim().split(/\s+/)[1]})
        const [editTaskTitle, setEditTaskTitle] = useState(props.editorMode[1].title.trim())
        function editHandler(e) {
            let newArray = props.listData.map((objMapped) => {
                if (objMapped.title === props.editorMode[1].title) {
                    return {title: editTaskTitle.trim(), desc: taskDesc.trim().replace(/(^\s*(?!.+)\n+)|(\n+\s+(?!.+)$)/g, ""), deadline: taskDeadline.date + ' ' + taskDeadline.time, date_added: objMapped.date_added, selected: objMapped.selected, completed: objMapped.completed}
                } else {
                    return objMapped
                }
            })
            e.preventDefault()
            props.setListData(newArray)
            props.setTaskTitle('')
            props.setModalState(false)
            props.setEditorMode([false, {}])
            localStorage.setItem('listData', JSON.stringify(newArray))
            toast.success('Task edited successfully')
        }
        return (
            <>
                <form onSubmit={editHandler}>
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 backdrop-blur-3xl overflow-y-scroll -translate-y-1/2 justify-center items-center w-full h-full">
                    <div className="relative p-10 w-full">
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Edit Task Information
                                </h3>
                            </div>
                            <div className="p-4 md:p-5 space-y-4">
                                <p className="text-base leading-relaxed text-gray-500">
                                    Edit existing task information. Type the information onto the input fields below, you can leave some fields empty.
                                </p>
                                <div className="mb-6">
                                    <label htmlFor="default-input" className="block mb-2 text-lg font-medium text-gray-900">Edit Task Title</label>
                                    <input type="text" id="default-input" value={editTaskTitle} onChange={(e) => {setEditTaskTitle(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="default-input" className="block mb-2 text-lg font-medium text-gray-900">Edit Task Description</label>
                                    <textarea rows={20} id="default-input" value={taskDesc} onChange={(e) => {setTaskDesc(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="time" className="block mb-2 text-lg font-medium text-gray-900">Edit deadline time</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd"/>
                                            </svg>
                                        </div>
                                        <input type="time" id="time" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={taskDeadline.time} onChange={(e) => {setTaskDeadline({...taskDeadline, time: e.target.value})}} required />
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="date" className="block mb-2 text-lg font-medium text-gray-900">Edit deadline date</label>
                                    <div className="relative">
                                        <input type="date" id="date" value={taskDeadline.date} onChange={(e) => {setTaskDeadline({...taskDeadline, date: e.target.value})}} className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row gap-5 align-middle items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add Task</button>
                                <button type="button" onClick={() => {props.setModalState(false);props.setEditorMode([false, {}])}} className="text-white bg-red-500 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                </form>
            </>
        )
    } else {
        const [taskDesc, setTaskDesc] = useState('')
        const [taskDeadline, setTaskDeadline] = useState({date: '', time: ''})
        function submissionHandler(e) {
            let newArray = [...props.listData, {title: props.taskTitle, desc: taskDesc, deadline: taskDeadline.date + ' ' + taskDeadline.time, date_added: new Date().toLocaleString(), selected: false, completed: false}]
            e.preventDefault()
            props.setListData(newArray)
            props.setTaskTitle('')
            props.setModalState(false)
            localStorage.setItem('listData', JSON.stringify(newArray))
            toast.success('Task added successfully')
        }
        return (
            <>
                <form onSubmit={submissionHandler}>
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 backdrop-blur-3xl overflow-y-scroll -translate-y-1/2 justify-center items-center w-full h-full">
                    <div className="relative p-10 w-full">
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Additional Task Information
                                </h3>
                            </div>
                            <div className="p-4 md:p-5 space-y-4">
                                <p className="text-base leading-relaxed text-gray-500">
                                    Some additional information is required regarding your task. Type the information onto the input fields below, you can leave some fields empty.
                                </p>
                                <div className="mb-6">
                                    <label htmlFor="default-input" className="block mb-2 text-lg font-medium text-gray-900">Task Title</label>
                                    <input type="text" id="default-input" value={props.taskTitle} onChange={(e) => {props.setTaskTitle(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="default-input" className="block mb-2 text-lg font-medium text-gray-900">Task Description</label>
                                    <textarea rows={20} id="default-input" value={taskDesc} onChange={(e) => {setTaskDesc(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="time" className="block mb-2 text-lg font-medium text-gray-900">Select deadline time</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd"/>
                                            </svg>
                                        </div>
                                        <input type="time" id="time" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={taskDeadline.time} onChange={(e) => {setTaskDeadline({...taskDeadline, time: e.target.value})}} required />
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="date" className="block mb-2 text-lg font-medium text-gray-900">Select deadline date</label>
                                    <div className="relative">
                                        <input type="date" id="date" value={taskDeadline.date} onChange={(e) => {setTaskDeadline({...taskDeadline, date: e.target.value})}} className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row gap-5 align-middle items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add Task</button>
                                <button type="button" onClick={() => {props.setModalState(false)}} className="text-white bg-red-500 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                </form>
            </>
        )
    }
}