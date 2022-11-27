const { query } = require('express')
const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const {buildSchema} = require('graphql')
const app = express()
const PORT = 3000

const schema = buildSchema(`

    type product{
        id : ID
        name : String
        veg : Boolean
    }
    
    type Query{
        products(from:Int,to:Int) : [product]
    }
`)

var data = []
for(let i=1; i<=20; i++){
    var bools = [true,false]
    let x = bools[Math.floor(Math.random()*2)]
    data.push({id:i, name:`name${i}`,veg:x})
}
// console.log(data);

var root = {
    products : ({from,to})=>{
        // console.log(name)
        return data.filter(x=> x.id >= from && x.id <= to )
    }
}

app.use('/graphql',graphqlHTTP({
    schema : schema,
    rootValue : root,
    graphiql:true
}))

app.listen(PORT,(err)=>{
    if(err) {throw err}
    console.log('Server Started at '+PORT);
})
