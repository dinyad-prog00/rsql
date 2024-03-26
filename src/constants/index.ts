
export const dbInfosSql = {
    psql: {
        schemas: "SELECT schema_name as name FROM information_schema.schemata WHERE schema_name NOT LIKE 'pg_%' AND  schema_name != 'information_schema'",
        tables: "SELECT table_name as name, table_type as type FROM information_schema.tables WHERE table_schema = '{schema}'",
        colums: "SELECT column_name as name, udt_name, character_maximum_length,numeric_precision,numeric_scale FROM information_schema.columns  WHERE table_schema = '{schema}' AND table_name ='{table}'",
        keys: "SELECT  kcu.column_name as name ,  tc.constraint_type as type  FROM information_schema.table_constraints AS tc JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name WHERE  tc.table_schema = '{schema}' AND tc.table_name='{table}' "
    },
    mysql: {
        schemas: "SELECT schema_name as name FROM information_schema.schemata WHERE schema_name NOT IN ('information_schema','mysql','sys','performance_schema')",
        tables: "SELECT table_name as name, table_type as type FROM information_schema.tables WHERE table_schema = '{schema}'",
        colums: "SELECT column_name as name, column_type as  udt_name, character_maximum_length,numeric_precision,numeric_scale FROM information_schema.columns  WHERE table_schema = '{schema}' AND table_name ='{table}'",
        keys: "SELECT COLUMN_NAME as name, 'PRIMARY KEY' as type FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE TABLE_SCHEMA = '{schema}' AND TABLE_NAME = '{table}' AND CONSTRAINT_NAME = 'PRIMARY' UNION  SELECT COLUMN_NAME as name, 'FOREIGN KEY' as type FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE TABLE_SCHEMA = '{schema}' AND TABLE_NAME = '{table}' AND CONSTRAINT_NAME <> 'PRIMARY'"
    }
}
