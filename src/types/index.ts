
export interface Column {
    name: string
    udt_name: string
    character_maximum_length?: number
    numeric_precision?: number
    numeric_scale?: number
    displayType?: string
    isPkey?: boolean
    isFkey?: boolean
}

export interface Table {
    name: string
    isView: boolean
    columns: Column[]

}

export interface Schema {
    name: string
    tables: Table[]
}

export interface DbInfos {
    type: string
    hostname: string
    port: string
    dbname: string
    username: string
    password: string
}