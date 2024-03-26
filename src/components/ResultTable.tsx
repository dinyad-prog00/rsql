import React from "react"
//select * from ops.customer limit 20;
const ResultTable = ({ rows, fields }: { rows: any[], fields: any[] }) => {
    return (

        <div className="h-full rounded-lg p-1 shadow-xs bg-white ">
            <table className="w-full  whitespace-nowrap rounded-t-lg  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="">
                        {
                            fields.map((it) => <th scope="col" className="px-6 py-3  ">
                                {it.name}
                            </th>)
                        }

                    </tr>

                </thead>
                <tbody>
                    {
                        rows.map((row) => {
                            return (

                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-44 dark:border-gray-700">

                                    {
                                        fields.map((k) => (<td className="px-6 py-4">
                                            {row[k.name]}
                                        </td>))
                                    }


                                </tr>)
                        })
                    }

                </tbody>
            </table>
        </div>

    )
}

export default ResultTable