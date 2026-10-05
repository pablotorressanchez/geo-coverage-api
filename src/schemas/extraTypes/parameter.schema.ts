import sql from 'mssql';

interface ParameterModel {
    Name: string;
    Type: any;
    Value: Date | string | number | boolean | null; 
}

const getParameter = (name: string, value: any, length = 36) => {
    const param: ParameterModel = {
        Name: name,
        Type: getType(value, length),
        Value: value
    }

    return param;

    function getType(value: any, length: number) {
        switch (typeof value) {
            case "string": return sql.VarChar(length); 
            case "number": return sql.Int; 
            case "boolean": return sql.Bit; 
            default: return sql.DateTime;
        }
    }
}
export { getParameter as Parameter, type ParameterModel }
