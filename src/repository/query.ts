import sql from 'mssql';
import { sqlconfig } from '../config/sqlconfig.js'
import { ItemCollectionModel } from '../schemas/common/ItemCollectionModel.js';
import { StatusModel } from '../schemas/common/StatusModel.js';
import { ItemModel } from '../schemas/common/ItemModel.js';
import { ParameterModel } from '../schemas/extraTypes/parameter.schema.js';

const defaultStatus: StatusModel = {
    statusCode: 'OK',
    statusMessage: 'Request procesado.'
};

export const query = {

    runQueryAsync: async <T>(query: string, ...params: Array<ParameterModel>) => {
        let collection: ItemCollectionModel<T> = {
            ...defaultStatus,
            items: []
        };

        try { 
            const pool: sql.ConnectionPool = await sql.connect(sqlconfig);

            const request: sql.Request = pool.request();

            if (params?.length && Array.isArray(params)) {
                for (const param of params)
                    request.input(param.Name, param.Type, param.Value)
            }

            const result = await request.query<T>(query)

            collection.items = result.recordset;
            return collection;

        } catch (err) {
            console.error('Error al ejecutar el SELECT:', err);

            collection.statusCode = '00';
            collection.statusMessage = 'No pudimos conectarnos con el servidor.';

            return collection;                
        }
    },
    /**
     * 
     * @param {string} procedure  is procedure name
     * @param {Array.<ParameterModel>|ParameterModel} parameter
     * @return {Promise.<ItemModel>} Promise object ItemModel
     */
    getQueryFirstAsync: async <T>(procedure: string, ...params: Array<ParameterModel>) => {
        const { items = [], ...rest } = await runStoreProcedureAsync<T>(procedure, ...params);
        
        let item: ItemModel<T> = {
            ...rest,
            item: items?.[0] || null
        }

        return item;
    },
    /**
     * 
     * @param {string} procedure  is procedure name
     * @param {Array.<ParameterModel>|ParameterModel} parameter
     * @return {Promise.<ItemCollectionModel>} Promise object ItemCollectionModel
     */
    getQueryAsync: async <T>(procedure: string, ...params: Array<ParameterModel>) => {
        return await runStoreProcedureAsync<T>(procedure, ...params);
        
    }
}

const runStoreProcedureAsync = async <T>(procedure: string, ...params: Array<ParameterModel>): Promise<ItemCollectionModel<T>> => {
    return new Promise((resolve, reject) => {
        let collection: ItemCollectionModel<T> = {
            ...defaultStatus,
            items: []
        }

        sql.connect(sqlconfig, (err) => {

            if (err) {
                return errRequest(err, reject)
            }

            const request: sql.Request = new sql.Request();

            if (params?.length) {
                for (const param of params) {
                    request.input(param.Name, param.Type, param.Value)
                }
            }

            request.execute<T>(procedure, (err, result) => {
                if (err) {
                    return errRequest(err, reject)
                }

                if (result) {
                    collection.items = result.recordset
                    return resolve(collection)
                }
            })
        })
    });

    function errRequest<T>(err: any, reject: any) {
        console.error(`${err}`)
        return reject(
            {
                statusCode: '00',
                statusMessage: 'No pudimos conectarnos al servidor.',
                items: []
            } as ItemCollectionModel<T>
        );
    }
}
