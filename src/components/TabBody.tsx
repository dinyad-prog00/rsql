import React, { useState } from "react"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import SqlEditor from "./SqlEditor"
import ResultTable from "./ResultTable"
import { FaPlay } from "react-icons/fa"
import { DbService } from "../db/service"

const TabBody = ({ schemas }: any) => {

    const [req, setReq] = useState("SELECT 1+5 as test, 'cool' as c2")
    const [result, setResult] = useState({ rows: [], fields: [] })
    const [error, setError] = useState(undefined)

    const run = () => {
        DbService.runQuery<any>(req).then((res) => {
            console.log(res)
            if (!res.isError) {
                setError(undefined)
                setResult(res)
            } else {
                setError(res.error.message)
            }
        })
    }

    return <div className="w-full h-full">
        <PanelGroup direction="vertical">
            <div className="flex w-full justify-end p-1 bg-white">
                <button onClick={run} type="button" className="text-white px-4 py-2 mr-2 ml-auto text-xs flex items-center max-w-fit bg-gradient-to-r from-green-400 to-blue-600 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-center" title="Ctrl+Enter">
                    <FaPlay /><span className="ml-2"> Run</span>
                </button>
            </div>

            <Panel minSize={20} defaultSize={40}>
                <div className="h-full overflow-scroll bg-gray-100 rounded-lgn" >
                    <SqlEditor onChange={(v: string) => { setReq(v) }} schemas={schemas} />
                </div>

            </Panel >
            <PanelResizeHandle className="h-1 bg-gray-100" />

            <Panel minSize={15}>
                <div className="w-full h-full overflow-scroll bg-gray-200 rounded-lgn">
                    {!error && result.rows.length !== 0 &&
                        <div className="m-1 rounded-lg">
                            <ResultTable rows={result.rows} fields={result.fields} />

                        </div>}

                    {error &&
                        <div className="m-2 p-2 bg-red-100 border border-red-300 px-4 rounded-lg">
                            {error}
                        </div>
                    }

                </div>
            </Panel >
        </PanelGroup>
    </div>
}

export default TabBody