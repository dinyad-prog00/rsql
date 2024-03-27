import React, { useEffect } from "react"
import { FaPlay } from "react-icons/fa"
import TabBody from "./TabBody"
import ShortUniqueId from "short-unique-id"
const shorUid = new ShortUniqueId({ length: 20 })
const activeClasses = "inline-block py-2 px-4 bg-white  rounded-t-xl - text-purple-600 hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-500 border border-b-0 border-purple-600 rounded-t-xl dark:border-purple-500"
const inactiveClasses = "inline-block py-2 px-4 bg-white rounded-t-xl - border-b border-purple-600 dark:border-transparent text-gray-500 hover:text-purple-600 dark:text-gray-400  hover:border-purple-600  dark:border-gray-700 dark:hover:text-gray-300"

const Tabs = ({ schemas, tabs, setTabs, activeTab, setActiveTab }: any) => {
    const addTab = () => {
        const tb = { name: "New tab", id: shorUid.rnd() }
        setTabs([...tabs, tb])
        setTimeout(() => setActiveTab(tb), 100)
    }

    useEffect(() => {
        if (tabs.length == 0) {
            addTab()
        }
    }, [])

    return (
        <div className="bg-red-100 h-full">
            <div className="bg-white dark:border-gray-700 rounded-t-xl flex">
                <ul className="flex flex-wrap -mb-px  text-sm rounded-t-xl font-medium text-center">

                    {tabs.map((it: any) => {
                        return (
                            <li className="" role="presentation" onClick={() => setActiveTab(it)}>
                                <button className={(activeTab && activeTab.id == it.id) ? activeClasses : inactiveClasses} id={it.id} key={it.id} type="button" >{it.name}</button>
                            </li>
                        )
                    })}

                </ul>
                <span onClick={addTab} className="p-2 px-4 cursor-pointer">+</span>
            </div>
            <div className="h-full">
                {tabs.map((it: any) => {
                    return (
                        <div hidden={!(activeTab && activeTab.id == it.id)} className="bg-green-500 h-full rounded-lg bg-gray-50 dark:bg-gray-800">
                            <TabBody schemas={schemas} />
                        </div>
                    )
                })}


            </div>

        </div>
    )
}

export default Tabs