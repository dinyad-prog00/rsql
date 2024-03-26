import React, { useEffect, useState } from "react";
import { DbService } from "../db/service";

const NewConnection = ({ onChange ,setR,r}: any) => {
    const [formData, setFormData] = useState({
        type: "postgres", // Default value for type
        host: "",
        port: "",
        db: "",
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
        
        //DbService.connect(`${formData.type}://${formData.username}:${formData.password}@${formData.host}:${formData.port}/${formData.db}`)
        //DbService.connect(`postgres://dbt:dbt@2024@localhost:5432/${formData.db}`)
        
    }

    useEffect(()=>{
        DbService.onConnected(()=>{
            setR(!r)
        })
    },[])

    return (
        <div>
            <div id="static-modal" data-modal-backdrop="static" tabIndex={-1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                New Connexion
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <div className="p-4 md:p-5">
                            <form className="space-y-4" action="#" onSubmit={handleSubmit}>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
                                    <select id="type" name="type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formData.type} onChange={handleChange}>
                                        <option value="postgres">Postgresql</option>
                                        <option value="mysql">Mysql</option>
                                    </select>
                                </div>

                                <div className="flex">
                                    <div className="mx-1">
                                        <label htmlFor="host" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Host </label>
                                        <input type="text" name="host" id="host" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={handleChange} />
                                    </div>
                                    <div className="mx-1">
                                        <label htmlFor="port" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Port </label>
                                        <input type="text" name="port" id="port"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={handleChange} />
                                    </div>
                                    <div className="mx-1">
                                        <label htmlFor="db" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Database </label>
                                        <input type="text" name="db" id="db" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="mx-1 grow">
                                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username </label>
                                        <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={handleChange} />
                                    </div>
                                    <div className="mx-1 grow">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password </label>
                                        <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={handleChange} />
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button onClick={() => { conn() }} data-modal-hide="static-modal" type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Connect</button>
                            <button data-modal-hide="static-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default NewConnection;
