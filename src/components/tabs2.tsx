import React from "react"
import { FaPlay } from "react-icons/fa"
import TabBody from "./TabBody"
import ShortUniqueId from "short-unique-id"
const shorUid = new ShortUniqueId({ length: 20 })

const Tabs = ({ schemas, tabs, setTabs, activeTab, setActiveTab }: any) => {
    const addTab = () => {
        setTabs([...tabs, { name: "New tab", id: shorUid.rnd() }])
    }

    return (
        <div className="bg-white h-full">

            <div className="mb-4 bg-white dark:border-gray-700 rounded-t-xl flex">
                <ul className="flex flex-wrap -mb-px  text-sm rounded-t-xl font-medium text-center" id="default-styled-tab" data-tabs-toggle="#default-styled-tab-content"
                    data-tabs-active-classes="text-purple-600 hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-500 border border-b-0 border-purple-600 rounded-t-xl dark:border-purple-500"
                    data-tabs-inactive-classes="dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300"
                    role="tablist"
                >

                    {tabs.map((it: any) => {
                        return (
                            <li className="me-2" role="presentation">
                                <button className="inline-block py-2 px-4 bg-white border-b-2 rounded-t-xl" id={it.id} key={it.id} data-tabs-target={`#tab-${it.id}`} type="button" role="tab" aria-controls={it.id} aria-selected={(activeTab&& activeTab.id == it.id )? 'true' : 'false'}>{it.name}</button>
                            </li>
                        )
                    })}
                    {/* <li className="me-2" role="presentation">
                        <button className="inline-block py-2 px-4 bg-white border-b-2 rounded-t-xl" id="profile-styled-tab" data-tabs-target="#styled-profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Profile</button>
                    </li>

                    <li className="me-2" role="presentation">
                        <button className="inline-block py-2 px-4  border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="dashboard-styled-tab" data-tabs-target="#styled-dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Dashboard</button>
                    </li>
                    <li className="me-2" role="presentation">
                        <button className="inline-block py-2 px-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="settings-styled-tab" data-tabs-target="#styled-settings" type="button" role="tab" aria-controls="settings" aria-selected="false">Settings</button>
                    </li>
                    <li role="presentation">
                        <button className="inline-block py-2 px-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="contacts-styled-tab" data-tabs-target="#styled-contacts" type="button" role="tab" aria-controls="contacts" aria-selected="false">Contacts</button>
                    </li> */}
                </ul>
                <span onClick={addTab} className="p-2 px-4 cursor-pointer">+</span>
                <button type="button" className="text-white px-4 py-2 mr-2 ml-auto text-xs flex items-center max-w-fit ml-2 bg-gradient-to-r from-green-400 to-blue-600 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-center" title="Ctrl+Enter">
                    <FaPlay /><span className="ml-2"> Run</span>
                </button>

            </div>
            <div id="default-styled-tab-content" className="h-full">
                {tabs.map((it: any) => {
                    return (
                        <div className="hidden bg-green-500 h-full rounded-lg bg-gray-50 dark:bg-gray-800" id={`tab-${it.id}`} role="tabpanel" aria-labelledby={`${it.id}-tab`}>
                            <TabBody schemas={schemas} />
                        </div>
                    )
                })}

                {/* <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
                    <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
                </div>
                <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-settings" role="tabpanel" aria-labelledby="settings-tab">
                    <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Settings tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
                </div>
                <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-contacts" role="tabpanel" aria-labelledby="contacts-tab">
                    <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
                </div> */}
            </div>

        </div>
    )
}

export default Tabs