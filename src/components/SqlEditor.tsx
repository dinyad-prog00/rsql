import React, { useEffect } from "react"
import { useRef } from "react"
import { EditorView, basicSetup } from "codemirror"
import { EditorState } from "@codemirror/state"
import { sql } from "@codemirror/lang-sql"
import { Schema } from "../types"

let myTheme = EditorView.theme({
    "&": {
        color: "white",
        backgroundColor: "#034",
        borderRadius: "10px"

    },
    ".cm-content": {
        caretColor: "#0e9"
    },
    "&.cm-focused .cm-cursor": {
        borderLeftColor: "#0e9"
    },
    "&.cm-focused .cm-selectionBackground, ::selection": {
        backgroundColor: "#074"
    },
    ".cm-gutters": {
        backgroundColor: "#045",
        color: "#ddd",
        border: "none"
    }
}, { dark: true })

export let myTheme2 = EditorView.theme({


    "&": {
        color: "white",
        //backgroundColor: "#034",
        //height: Math.ceil(window.screen.height*0.70)+"px",
        height: "100%",
        //minHeight : "1000px",
        //maxWidth : Math.ceil(window.screen.width*0.85)+"px",
        fontSize: '13pt'
    },
    ".cm-content": {
        caretColor: "#0e9",
        //minHeight : "1000px",

    },
    "&.cm-focused .cm-cursor": {
        borderLeftColor: "#0e9"
    },
    "&.cm-focused .cm-selectionBackground, ::selection": {
        backgroundColor: "#074"
    },
    ".cm-gutters": {
        //backgroundColor: "#045",
        color: "#ddd",
        //color : "rgb(106, 10, 154)",
        border: "none"
    },
    ".cm-scroller": { overflow: "scroll" },

    "cm-active-line": {
        backgroundColor: "red"
    }

}, { dark: true })
const SqlEditor = ({ onChange ,schemas}: { onChange: Function ,schemas: Schema[]}) => {
    let view: EditorView;
    const editorRef = useRef()

    useEffect(() => {
        view = new EditorView({
            state: EditorState.create({
                doc: "SELECT 1+5 as test, 'cool' as c2",
                extensions: [myTheme2, basicSetup, sql({
                    upperCaseKeywords: true,
                    schema: convertToCompletionSchema(schemas)
                      
                    
                })]
            }),
            parent: editorRef.current
        })

        view?.contentDOM?.addEventListener("input", () => {
            const newValue = view.state.doc.toString();
            if (onChange) {
                onChange(newValue);
            }
        });



        return () => {
            view.destroy()
        }
    }, [schemas])


    return (
        <div ref={editorRef} className="h-full w-full rounded-lg bg-[#034]" >

        </div>
    )

}

export default SqlEditor

const convertToCompletionSchema = (schemas: Schema[]): { [key: string]: string[] } => {
    const completionSchema: { [key: string]: string[] } = {};

    schemas.forEach(schema => {
        const tableNames: string[] = schema.tables.map(table => table.name);
        completionSchema[schema.name] = tableNames;
    });

    return completionSchema;
};