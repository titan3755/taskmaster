import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TitleComp() {
    return (
        <>
            <div className="w-full flex flex-row align-middle items-center justify-center gap-x-3">
                <FontAwesomeIcon icon={faCheckSquare} width={48} height={48} className="mt-1 text-5xl text-blue-600" />
                <h1 className="text-blue-600 text-center font-normal text-4xl p-0 m-0 border-0"><u>Taskmaster</u></h1>
            </div>
        </>
    )
}