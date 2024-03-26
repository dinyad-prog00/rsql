import React from "react"
import { useState } from "react"

const AddSub = () => {
    const [count, seCount] = useState(0)
    return (
        <div>
            <button onClick={() => seCount(count - 1)}>Sub</button>
            <span>{count}</span>
            <button onClick={() => seCount(count + 1)}>Add</button>
            
        </div>)
}

export default AddSub