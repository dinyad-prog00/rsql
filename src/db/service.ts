import { dbInfosSql } from "../constants";
import { Column, DbInfos, Schema, Table } from "../types";

import { v4 as uuidv4 } from "uuid";
import { setupDatabase } from "./connect";

export type Result = { isError: boolean, result: any }

export const DbService = {

  runQuery: async <T>(query: string): Promise<T> => {
    const requestId: string = uuidv4();
    const window2 = window as Window & typeof globalThis & { electronAPI: any }

    return await window2.electronAPI.runReq(requestId, query)

    /*new Promise<T>((resolve, reject) => {
      window.Electron.ipcRenderer.once(requestId, (_, result) => {
        if (result.error) {
          reject(new Error(result.error));
        } else {
            
          resolve(result as T);
        }
      });
      window.Electron.ipcRenderer.send("execute-query", query, requestId);
    });*/
  },

  queryDbInfos: async (dbType: string): Promise<Schema[]> => {
    const reqs = dbType == "postgres" ? dbInfosSql.psql : dbInfosSql.mysql
    const schemas: Schema[] = []
    const schemas_infos = await DbService.runQuery<any>(reqs.schemas)
    if (!schemas_infos.isError) {
      for (let i = 0; i < schemas_infos.rows.length; i++) {
        const schema = schemas_infos.rows[i];
        const tables_infos = await DbService.runQuery<any>(reqs.tables.replace("{schema}", schema.name))
        const tables: Table[] = []

        for (let j = 0; j < tables_infos.rows.length; j++) {
          const table = tables_infos.rows[j];
          const columns_infos = await DbService.runQuery<any>(reqs.colums.replace("{table}", table.name).replace("{schema}", schema.name))
          const keys = await DbService.runQuery<any>(reqs.keys.replace("{table}", table.name).replace("{schema}", schema.name))
          const columns: Column[] = []

          for (let k = 0; k < columns_infos.rows.length; k++) {
            const column = columns_infos.rows[k];
            columns.push({ ...column, displayType: displayType(column), isFkey: isColumnFkey(keys.rows, column.name), isPkey: isColumnPkey(keys.rows, column.name) })
          }
          tables.push({ name: table.name, isView: table.type == "VIEW", columns: reorderColumns(columns) })
        }

        schemas.push({ ...schema, tables: tables })
      }

    }
    return schemas
  },

  connect: (dbInfos: DbInfos) => {
    const window2 = window as Window & typeof globalThis & { electronAPI: any }
    return window2.electronAPI.connect(dbInfos)
  },

  onRun: (callback: Function) => {
    const window2 = window as Window & typeof globalThis & { electronAPI: any }
    window2.electronAPI.onRun(callback)
  },
  onConnected: (callback: Function) => {
    const window2 = window as Window & typeof globalThis & { electronAPI: any }
    window2.electronAPI.onConnected(callback)
  },

  onConnectError: (callback: Function) => {
    const window2 = window as Window & typeof globalThis & { electronAPI: any }
    window2.electronAPI.onConnectError(callback)
  }
};


const isColumnPkey = (keys: any[], column: string): boolean => {
  return keys.some((it) => (it.name === column && it.type === "PRIMARY KEY"));
};

const isColumnFkey = (keys: any[], column: string): boolean => {
  return keys.some((it) => (it.name === column && it.type === "FOREIGN KEY"));
};
const displayType = (column: Column): string => {
  switch (column.udt_name) {
    case 'varchar':
      return `Varchar(${column.character_maximum_length})`;
    case 'numeric':
      return `Double(${column.numeric_precision},${column.numeric_scale})`;
    case 'int8':
    case 'int4':
    case 'int2':
      return 'Int';
    case 'date':
      return 'Date';
    case 'timestamp':
      return 'Datetime';
    case 'text':
      return 'Text'
    default:
      return column.udt_name;
  }
};

export const reorderColumns = (columns: Column[]): Column[] => {
  const pkeys = columns.filter(column => column.isPkey); // Filter columns with isPkey true
  const nonPkeys = columns.filter(column => !column.isPkey); // Filter columns with isPkey false
  const fkeys = nonPkeys.filter(column => column.isFkey); // Filter nonPkey columns with isFkey true
  const nonFkeys = nonPkeys.filter(column => !column.isFkey); // Filter nonPkey columns with isFkey false
  return [...pkeys, ...nonFkeys, ...fkeys]; // Concatenate arrays with pkeys on top, nonFkeys in the middle, and fkeys on bottom

};

