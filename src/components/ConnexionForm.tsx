import React, { useEffect, useState } from "react";
import { DbService } from "../db/service";
import { DbInfos } from "../types";
import LocalStorageService from "../db/localStorage";

const ConnexionForm = ({ onChange, conError }: any) => {
    const [formData, setFormData] = useState<DbInfos>(LocalStorageService.getObject("dbInfos") ??{
        type: "postgres", // Default value for type
        hostname: "localhost",
        port: "5432",
        dbname: "testdb",
        username: "",
        password: ""
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        onChange(formData);
    };


    const conn = () => {
        onChange(formData);
        DbService.connect(formData)
        //DbService.connect(`${formData.type}://dbt:dbt@2024@${formData.host}:${formData.port}/${formData.db}`)

    }

   

    return (
        <div>
            <div className="overflow-y-auto overflow-x-hidden  justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">

                <div className="p-2">

                    <form className="space-y-4" action="#" onSubmit={handleSubmit}>
                        
                        <div className="col-span-2 sm:col-span-1">
                            {/* <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label> */}
                            <select id="type" name="type" defaultValue={formData.type} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formData.type} onChange={handleChange}>
                                <option value="postgres">Postgresql</option>
                                <option value="mysql">Mysql</option>
                            </select>
                        </div>

                        <div className="flex flex-col sm:flex-row">
                            <div className="grow">
                                <input type="text" placeholder="Hostname" defaultValue={formData.hostname} name="hostname" id="host" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={handleChange} />
                            </div>
                            <div className="mx-1 grow">
                                <input type="text" placeholder="Port" defaultValue={formData.port} name="port" id="port" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={handleChange} />
                            </div>
                            <div className="grow">
                                <input type="text" placeholder="Database" defaultValue={formData.dbname} name="dbname" id="db" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={handleChange} />
                            </div>
                        </div>

                        <div className="flex">
                            <div className="mr-1 grow">
                                <input type="text" placeholder="Username" defaultValue={formData.username} name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={handleChange} />
                            </div>
                            <div className="grow">
                                <input type="password" placeholder="Password" defaultValue={formData.password} name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={handleChange} />
                            </div>
                        </div>
                    </form>
                </div>

                <div className="flex flex-col w-full  p-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    {conError && <div className="p-2 text-red-500 p-2 rounded-lg">
                        {conError}
                    </div>}
                    <button onClick={() => { conn() }} className="text-white w-full grow bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Connect</button>
                </div>
            </div>
        </div>

    );
};

export default ConnexionForm;
