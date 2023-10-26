const {MapperKind,getDirective,mapSchema} = require("@graphql-tools/utils")
const {GraphQLError,defaultFieldResolver} = require("graphql")

const AuthDirectiveTransformer = (schema) => {
    return mapSchema(schema,{
        [MapperKind.OBJECT_FIELD] : (fieldConfig) => {
            const AuthDirective = getDirective(schema,fieldConfig,"auth")?.[0];
            if(AuthDirective)
            {
                const {resolve = defaultFieldResolver} = fieldConfig
                fieldConfig.resolve = function (source,args,context,info) {
                    if(!context.isAuth)
                    {
                        throw new GraphQLError("You are not logged in",{
                            extensions : {
                                code : "UNAUTHORIZED",
                                http : {
                                    status : 401
                                }
                            }
                        })
                    }
                    return resolve(source,args,context,info)
                }
                return fieldConfig;
            }
        } 
    })
}

module.exports = AuthDirectiveTransformer;