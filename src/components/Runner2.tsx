import React, { useEffect } from "react"
import { useState } from "react"
import { DbService, Result } from "../db/service"
import ResultTable from "./ResultTable"
import SqlEditor from "./SqlEditor"
import Collapse from "./Collapse"
import { Column, Schema } from "../types"
import { initFlowbite } from 'flowbite'
import NewConnection from "./NewConnection"
import { FaKey } from 'react-icons/fa';
import { BsLink45Deg } from 'react-icons/bs';
import { IoMdGrid } from 'react-icons/io';
import { CiGrid2V } from "react-icons/ci";
import { FiColumns } from "react-icons/fi";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import Rz from "./Rz"

const Runner = () => {
    const [req, setReq] = useState("select * from ops.customer limit 20")
    const [result, setResult] = useState({ rows: [], fields: [] })
    const [error, setError] = useState("")

    const [schemas, setSchemas] = useState<Schema[]>([])

    const [con, setCon] = useState({
        type: "postgres", // Default value for type
        host: "",
        port: "",
        db: "",
        username: "",
        password: ""
    })
    const [r, setR] = useState(false)
    const run = () => {
        DbService.runQuery<any>(req).then((res) => {
            console.log(res)
            if (!res.isError) {
                setResult(res)
            } else {
                setError(JSON.stringify({ error: res.error.message }))

            }
        })
    }

    useEffect(() => {
        DbService.queryDbInfos("psql").then(setSchemas)
    }, [r])

    useEffect(() => {
        initFlowbite()
    }, [])


    return (
        <div className="flex h-full">
            <PanelGroup autoSaveId="runner" direction="horizontal">
                <Panel >
                    <div className="bg-white overflow-scroll h-full p-2">
                        <Collapse title={<span className="">Postgres: ecom</span>} >
                            {schemas.map((schema) => {
                                return <Collapse title={<span className="text-blue-900">{schema.name}</span>}>
                                    <Collapse title={<span className="text-rose-700">Tables</span>}>
                                        {schema.tables.filter((it) => !it.isView).map((t) => {
                                            return <Collapse title={<TableTitle title={t.name} />} >
                                                {t.columns.map((c) => {
                                                    return <div className="pl-2 py-2 pr-5 bold w-full"><ColumnIcon column={c} /> <span className=" text-pink-900">{c.name}:</span> <span className="float-right text-green-900">{c.displayType}</span></div>
                                                })}
                                            </Collapse>
                                        })}</Collapse>
                                    <Collapse title={<span className="text-rose-700">Views</span>}>
                                        {schema.tables.filter((it) => it.isView).map((t) => {
                                            return <Collapse title={<TableTitle title={t.name} />}>
                                                {t.columns.map((c) => {
                                                    return <div className="pl-2 py-2 pr-5 bold w-full"><ColumnIcon column={c} /> <span className=" text-pink-900">{c.name}:</span> <span className="float-right text-green-900">{c.displayType}</span></div>
                                                })}
                                            </Collapse>
                                        })}</Collapse>


                                </Collapse>
                            })}
                        </Collapse >
                    </div>
                </Panel >
                <PanelResizeHandle className="w-1 bg-gray-100" />
                <Panel>
                    <PanelGroup direction="vertical">
                        <div className="p-2 grow h-full bg-teal-500">
                            <div className="p-2 h-full  bg-teal-500 rounded-lg">
                                <div className="flex h-full flex-col ">

                                    {/* <div className="flex">
                                        <button onClick={run} type="button" className="text-white  max-w-fit ml-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Exécuter</button>

                                        <button data-modal-target="static-modal" data-modal-toggle="static-modal" className="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 me-2 mb-2 dark:focus:ring-blue-800" type="button">
                                            New Connexion
                                        </button>
                                    </div> */}
                                    <Panel >
                                        <div className="mx-2 h-48 overflow-scroll rounded-lg" >

                                            <SqlEditor onChange={(v: string) => { setReq(v) }} schemas={schemas} />

                                            {/* <textarea onChange={(e) => { setReq(e.target.value) }} rows={4} className="block p-2.5 w-full min-h-5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here...">
                            {req}
                        </textarea> */}
                                        </div>
                                    </Panel >
                                    <PanelResizeHandle className="h-1 bg-gray-100" />

                                    <Panel >
                                        <div className="grow overflow-scroll m-2 bg-gray-100 rounded-lg">

                                            <ResultTable rows={result.rows} fields={result.fields} />

                                        </div>
                                    </Panel >

                                </div>
                            </div>
                        </div>
                        <NewConnection onChange={setCon} r={r} setR={setR} />
                    </PanelGroup>
                </Panel>

            </PanelGroup>
        </div>)
}

export default Runner


const ColumnIcon = ({ column }: { column: Column }) => {
    return <span className="inline text-blue-800 mr-1">
        {column.isPkey ? <FaKey className="inline" title="Primary Key" /> : column.isFkey ? <BsLink45Deg className="inline" title="Foreign Key" /> : <FiColumns className="inline" title="Column" />}
    </span>
}


const TableTitle = ({ title }: any) => {
    return <span><IoMdGrid className="inline text-fuchsia-300" title="Primary Key" /> <span className="text-fuchsia-600">{title}</span></span>

}