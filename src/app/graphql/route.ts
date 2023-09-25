//apolo server graph ql ki api bananay m 
//npm i @apollo/server @as-integrations/next

import { ApolloServer } from "@apollo/server"
import gql from "graphql-tag"
import { startServerAndCreateNextHandler } from '@as-integrations/next';

type todo = {
    id: Number,
    title: String,
    description: String,
    isCompleted: Boolean,
    createdAt: Date
}

var todos: todo[] = [{
    id: 2,
    title: 'Grocery Shopping',
    description: `Buy groceries for the week, including fruits, vegetables, milk, eggs, and bread. Don't forget to check for any discounts or special offers at the store.`,
    isCompleted: false,
    createdAt: new Date()
},
{
    id: 3,
    title: 'Prepare for Presentation',
    description: 'Get ready for the upcoming presentation at work. Create an outline of key points, gather supporting data and statistics, and practice the presentation at least twice to ensure confidence during the meeting.',
    isCompleted: true,
    createdAt: new Date()
}
]

const typeDefs = gql`
    scalar Date
    type todo{
        id:Int 
        title: String,
        description:String,
        isCompleted:Boolean
        createdAt: Date
    }
    type Query{
        getTodos(id:Int,code:String): [todo]
    }
 
    

    type Mutation{
        createTodo(todo:todoInput): todo
    }

    input todoInput{
        title: String,
        description:String,
    }
    `
    const resolvers = {
        Query: {
            getTodos: (root: {}, args: { id: Number,code:String }) => {
                console.log("args", args)
                if (args.id) {
                    return todos.filter((todo) => todo.id === args.id)
                }
                return todos
            }
        },
       
        }
        const server: ApolloServer = new ApolloServer({
            typeDefs,
            resolvers
        })
        const handler = startServerAndCreateNextHandler(server);

        export {handler as Get, handler as POST };        

        //local:3000/graphql
//code for playground
        //query getTodos{
        //     getTodos{
        //         id
        //     }
        // }
        //query getTodos{
        //     getTodos(id:2){
        //         id
        //     }
        // }

        //query getTodos{
        //     getTodos(code:""){
        //         id
        //     }
        // }