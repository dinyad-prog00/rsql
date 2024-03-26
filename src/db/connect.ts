import Sequelize from "@sequelize/core";
import { sql } from '@sequelize/core';
import { config } from "dotenv";
import { ipcMain } from "electron";
import * as pg from 'pg';
import * as mysql from "mysql2"
import { DbInfos } from "../types";
import LocalStorageService from "./localStorage";

export const setupDatabase2 = () => {
    config()
    // pg.types
    const sequelize = new Sequelize(process.env.DB_URL)

    sequelize.authenticate().then(() => {
        console.log("Database connected successfully");

    }).catch((error) => {
        console.error('Unable to connect to the database:', error);

    })

    ipcMain.removeAllListeners("execute-query")
    ipcMain.on(
        "execute-query",
        async (event, query: string, requestId: string) => {
            sequelize.query(query).then((res) => {
                const [result, _]: [any, any] = res
                console.log(res)
                console.log("========================\n\n")
                console.log(result)
                ///console.log(_.rows, _.fields)
                event.reply(requestId, { rows: result, fields: _.fields, isError: false })
            }).catch((error) => {
                event.reply(requestId, { error, isError: true })

            })
        }
    );
};

const getDialectModule = (type: string) => {
    switch (type) {
        case 'postgres':
            return pg

        case 'mysql':
            return mysql

        default:
            return undefined
    }
}

const buildUrl = (dbInfos: DbInfos) => `${dbInfos.type}://${dbInfos.username}:${dbInfos.password}@${dbInfos.hostname}:${dbInfos.port}/${dbInfos.dbname}`


export const setupDatabase = () => {
    config()

    ipcMain.removeAllListeners("connect")
    ipcMain.on(
        "connect",
        async (event, dbInfos: DbInfos) => {
            const sequelize = new Sequelize(buildUrl(dbInfos), { dialectModule: getDialectModule(dbInfos.type),logging:false }) // Example for postgres

            ipcMain.removeAllListeners("execute-query")
            ipcMain.on(
                "execute-query",
                async (event, query: string, requestId: string) => {
                    sequelize.query(query).then((res) => {
                        const [result, _]: [any[], any] = res
                        //console.log( _.fields)
                        //console.log(result)

                        // console.log(res)
                        // console.log("=====================\n\n")
                        const fields = _.fields ?? (result.length != 0 ? Object.keys(result[0]).map((it) => ({ name: it })) : [])
                        //console.log(fields)

                        event.reply(requestId, { rows: result, fields, isError: false })
                    }).catch((error) => {
                        event.reply(requestId, { error, isError: true })

                    })
                }
            );



            sequelize.authenticate().then(() => {
                console.log("Database connected successfully");
                event.reply("connected",dbInfos)

            }).catch((error) => {
                console.error('Unable to connect to the database', error);
                event.reply("connect-error", error.message)

            })

        }
    );


};