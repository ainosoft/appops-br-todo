import * as ts from 'typescript';

export default function myTransformerPlugin(program: ts.Program, pluginOptions: {}) {

    return {
        before(context: ts.TransformationContext) {

            return (sourceFile: ts.SourceFile) => {
        
                const visitor = (node: ts.Node): ts.VisitResult<ts.Node> => {
        
                   // console.log(node.kind, `\t# ts.SyntaxKind.${ts.SyntaxKind[node.kind]}`);

                    //Check if the node is Interface Decleration
                    if (ts.isInterfaceDeclaration(node)) {
                        
                        return [
                            ts.createImportDeclaration(
                            undefined,
                            undefined,
                            ts.createImportClause(
                                undefined,
                                ts.createNamedImports([ts.createImportSpecifier(
                                    undefined,
                                    ts.createIdentifier("HttpServiceInvoker")
                                )])
                            ),
                            ts.createStringLiteral("@ainosoft/appops-core-components/components/appops-common/fetch-br/dist/http-service-invoker.js")
                        ),
                        
                        
                        ts.createClassDeclaration(undefined, [ts.createModifier(ts.SyntaxKind.ExportKeyword)],
                            ts.createIdentifier(node.name["escapedText"].toString()),
                            undefined, undefined, memberDeclaration(node.members))
                        ]

                    }

                    /**
                     * Create class method.
                     * @param members Information about members 
                     */
                    function memberDeclaration(members): any {
                        let memberArray = [];
                      
                        //  memberArray.push(createConstructor());

                        for (let i = 0; i < members.length; i++) {
                           

                            memberArray.push(ts.createMethod(undefined,
                                undefined,
                                undefined,
                                ts.createIdentifier(members[i].name["escapedText"].toString()),
                                undefined,
                                undefined,
                                createParameterList(members[i].parameters),

                            
                                //For creating the type
                                ts.createTypeReferenceNode(
                                    ts.createIdentifier(members[i].type.typeName['escapedText']),
                                    [ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)]
                                  )
                                  
                                ,

                                ts.createBlock(
                                    [ts.createReturn(ts.createNew(
                                        ts.createIdentifier("HttpServiceInvoker"),
                                        undefined,
                                        methodBody(members[i].parameters)
                                    ))],
                                    true
                                )
                            ))
                        }
                        return memberArray;
                    }


                    /**
                     * Create Parameter List
                     * @param param Imformation about parameters 
                     */
                    function createParameterList(param): any {
                        let paramaterArray = [];

                        for (let i = 0; i < param.length; i++) {
                            //console.log("In param", param[i].name['escapedText'])
                            paramaterArray.push(ts.createParameter(undefined,
                                undefined,
                                undefined,
                                ts.createIdentifier(param[i].name['escapedText']),
                                undefined,
                                ts.createTypeReferenceNode(
                                    ts.createIdentifier("String"),
                                    undefined
                                  )
                                  ,
                                undefined))
                        }
                        return paramaterArray;
                    }


                    /**
                     * Create identifier for metho body.
                     * @param param 
                     */
                    function methodBody(param) {
                        let paramaterArray = [];

                        for (let i = 0; i < param.length; i++) {
                            paramaterArray.push(ts.createIdentifier(param[i].name['escapedText']));
                        }
                        return paramaterArray;
                    }

                    /**
                     * Create the constructor for the class
                     */
                    function createConstructor() {
                        return ts.createConstructor(
                            undefined,
                            undefined,
                            [ts.createParameter(
                                undefined,
                                undefined,
                                undefined,
                                ts.createIdentifier("fetchBr"),
                                undefined,
                                undefined,
                                undefined
                            )],
                            ts.createBlock(
                                [ts.createExpressionStatement(ts.createBinary(
                                    ts.createPropertyAccess(
                                        ts.createThis(),
                                        ts.createIdentifier("fetchBr")
                                    ),
                                    ts.createToken(ts.SyntaxKind.EqualsToken),
                                    ts.createIdentifier("fetchBr")
                                ))],
                                true
                            )
                        )
                    }

                    /**
                     * Get the type is httppost or httpget
                     * @param param 
                     */
                    function setRequestType(param) {
                        return param[param.length - 1].name["escapedText"]
                    }

                    return ts.visitEachChild(node, visitor, context)
                }

                return ts.visitNode(sourceFile, visitor);
            }

        }
    }

}



