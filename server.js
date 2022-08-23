const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth:{
        user: "simonstorejr@hotmail.com",
        pass: "sintese2022"
    }
})

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(express.static(__dirname+"/src"));

app.get('/', function(req, res){
    res.sendFile(__dirname+"/index.html")
})

app.post('/add', function(req, res){
    const options = {
        from: "simonstorejr@hotmail.com",
        to: "risso.nicolas@sintesejr.com.br",
        subject: req.body.assunto,
        text: req.body.nome + " ("+ req.body.e_mail + ") enviou a mensagem: " + req.body.conteudo
    }
    transporter.sendMail(options, function (err, info){
        if(err){
            console.log(err)
            return
        }
        console.log(info.response)
    })
    res.sendFile(__dirname+"/index.html")
})




app.listen(8080, function(){
    console.log("Servidor funcionado!")
})



