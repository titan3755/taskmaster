import FormComp from "./main_comps/Form"
import FunctionBarComp from "./main_comps/FunctionBar"
import ItemListComp from "./main_comps/ItemList"
import TitleComp from "./main_comps/Title"

export default function Main() {
    return (
        <>
            <div className="w-full min-h-screen bg-white shadow-inner p-24 flex justify-center align-middle flex-col">
                <div className="bg-white shadow-2xl border-gray-300 border rounded-xl w-full min-h-max p-10">
                    <MainBox />
                </div>
            </div>
        </>
    )
}

function MainBox() {
    return (
        <>
            <div className="flex flex-col gap-12 justify-center px-12">
                <TitleComp />
                <FormComp />
                <FunctionBarComp />
                <ItemListComp />
            </div>
        </>
    )
}