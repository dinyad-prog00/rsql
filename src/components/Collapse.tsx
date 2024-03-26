import React, { useState } from "react"
import "flowbite"
const Collapse = ({ title, children, show = false }: any) => {
    const [open, setOpen] = useState(show)
    return (

        <div >
            <div>
                <div onClick={() => setOpen(!open)} className="flex cursor-pointer border-b border-gray-100 items-center justify-between w-full p-2 font-medium  dark:hover:bg-gray-800 gap-3" >
                    {title}
                    {
                        open && <svg className="w-3 h-3 shrink-0" style={{ rotate: '180deg' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                        </svg>
                    }
                    {
                        !open &&
                        <svg style={{ rotate: '90deg' }} className="w-3 h-3 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5 5 1 1 5" />
                        </svg>}
                </div>
            </div>
            <div hidden={!open} className="ml-2">
                {children}
            </div>


        </div>

    )
}

export default Collapse