import React, { useCallback, useEffect, useRef } from "react"
import { useState } from "react"
import { DbService, Result } from "../db/service"
import ResultTable from "./ResultTable"
import SqlEditor from "./SqlEditor"
import Collapse from "./Collapse"
import { Column, DbInfos, Schema } from "../types"
import { initFlowbite } from 'flowbite'
import NewConnection from "./NewConnection"
import { FaKey } from 'react-icons/fa';
import { MdEdit } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { BsLink45Deg } from 'react-icons/bs';
import { IoMdGrid } from 'react-icons/io';
import { CiGrid2V } from "react-icons/ci";
import { FiColumns } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { BiError } from "react-icons/bi";
import { FaInfoCircle } from "react-icons/fa";
import { Panel, PanelGroup, PanelResizeHandle, getPanelElement } from "react-resizable-panels";

import Rz from "./Rz"
import ConnexionForm from "./ConnexionForm"
import LocalStorageService from "../db/localStorage"

const Runner = () => {
    const [req, setReq] = useState("SELECT 1+5 as test, 'cool' as c2")
    const [result, setResult] = useState({ rows: [], fields: [] })
    const [error, setError] = useState(undefined)
    const [conError, setConError] = useState(undefined)
    const [conState, setConState] = useState(0)



    const [schemas, setSchemas] = useState<Schema[]>([])

    const [con, setCon] = useState<DbInfos>(LocalStorageService.getObject("dbInfos") ?? {
        type: "postgres", // Default value for type
        hostname: "localhost",
        port: "5432",
        dbname: "testdb",
        username: "",
        password: ""
    })

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

    const runCallback = useCallback(run, [req])

    useEffect(() => {

    }, [])

    useEffect(() => {
        DbService.onRun(runCallback)

    }, [req])

    useEffect(() => {
        initFlowbite()
        DbService.runQuery<any>("SELECT 1+1 AS test").then((res) => {
            if (!res.isError) {
                setConState(1)
            }
        })
        DbService.onConnected((di:DbInfos) => {
            setConState(1)
            setConError(undefined)
            setShowConForm(false)
            sidePanelRef.current.resize(20)
            DbService.queryDbInfos(di.type ?? 'postgres').then(setSchemas)
            LocalStorageService.setObject('dbInfos', di)
        })
        DbService.onConnectError((msg: string) => {
            setConState(2)
            setConError(msg)
        })

        const dbi = LocalStorageService.getObject("dbInfos")
        console.log("infos", dbi)
        if (dbi) {
            DbService.connect(dbi)
        }

    }, [])

    const sidePanelRef = useRef<any>()

    const [showConForm, setShowConForm] = useState(false)

    const expandSidebar = () => {
        if (showConForm) {
            sidePanelRef.current.resize(25)

        } else {
            sidePanelRef.current.resize(30)

        }
        setShowConForm(!showConForm)

    }

    return (
        <div className="flex h-full">
            <PanelGroup autoSaveId="runner" direction="horizontal">
                <Panel minSize={10} defaultSize={25} id="sidebar" ref={sidePanelRef}>
                    <div className="bg-white overflow-scroll h-full p-2 mb-0">
                        {conState === 0 &&
                            <div onClick={expandSidebar} className="text-blue-500 flex items-center py-1 px-2 justify-between  m-2 bg-blue-200 rounded-lg shadow-sm border border-blue-500">
                                <div className="flex items-center" > <FaInfoCircle className="mr-1 inline" />Connexion (Not connected)</div>  <BiSolidEdit size={20} className="cursor-pointer" />
                            </div>
                        }
                        {conState === 1 &&
                            <div onClick={expandSidebar} className="text-green-500 flex items-center py-1 px-2 justify-between  m-2 bg-green-200 rounded-lg shadow-sm border border-green-500">
                                <div className="flex items-center" > <FaCheck className="mr-1 inline" />Connected</div>  <BiSolidEdit size={20} className="cursor-pointer" />
                            </div>}
                        {conState === 2 &&
                            <div onClick={expandSidebar} className="text-red-500 flex items-center py-1 px-2 justify-between  m-2 bg-red-200 rounded-lg shadow-sm border border-red-500">
                                <div className="flex items-center" > <BiError className="mr-1 inline" />Error : not connected</div>  <BiSolidEdit size={20} className="cursor-pointer" />
                            </div>}

                        <div hidden={!showConForm}><ConnexionForm onChange={setCon} conError={conError} /></div>

                        <Collapse title={<span className="">{`${con.type}://${con.hostname}/${con.dbname}`}</span>} show={true} >
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
                <Panel minSize={30}>
                    <PanelGroup direction="vertical">
                        <div className="flex w-full justify-end p-2 bg-gray-100">
                            <button onClick={run} type="button" className="text-white text-xs flex items-center max-w-fit ml-2 bg-gradient-to-r from-green-400 to-blue-600 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center" title="Ctrl+Enter">
                                <FaPlay /><span className="ml-2"> Run</span>
                            </button>
                        </div>
                        <Panel minSize={20} defaultSize={40}>
                            <div className=" h-full overflow-scroll bg-gray-100 rounded-lgn" >
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