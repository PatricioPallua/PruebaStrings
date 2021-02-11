const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({origin: 'http://localhost:3000', credentials: true}))


app.post("/", (req, res) => {
	const input = req.body.input

	var arr = input.split("")

	var objectControl = {}

	for(var i=0; i<arr.length; i++){
		if(objectControl.hasOwnProperty(arr[i])){
			objectControl[arr[i]] = objectControl[arr[i]] + 1
		} else {
			objectControl[arr[i]] = 1
		}
	}

	var arrControl = Object.keys(objectControl)

	if(arr.length === arrControl.length){
//		console.log("ACA VA A ENTRAR CUANDO ESTA LA MISMA CANTIDAD DE TODAS LAS LETRAS UNA VEZ")
		return res.status(200).send({ valid: "valid", input: input, output: arrControl.join(""), date: Date() })
	} else if(arr.length === arrControl.length +1){
//		console.log("ACA VA A ENTRAR CUANDO UNA SOLA LETRA ESTA REPETIDA")
		return res.status(200).send({ valid: "valid", input: input, output: arrControl.join(""), date: Date() })
	} else {

		if(Object.values(objectControl).every(el => el === Object.values(objectControl)[0])){
//			console.log("ACA VA A ENTRAR CUANDO TODOS LOS CARACTERES SE REPITAN LA MISMA CANTIDAD DE VECES")
			return res.status(200).send({ valid: "valid", input: input, output: arrControl.join(""), date: Date() })
		} 
		
		var arrValues = Object.values(objectControl).filter(el => el !== Object.values(objectControl)[0]) 

		if(arrValues.length === 1 && arrValues[0] === Object.values(objectControl)[0] +1){
//			console.log("ACA VA A ENTRAR CUANDO TENGAMOS MUCHOS REPETIDOS LA MISMA CANTIDAD Y UNO SOLO SE REPITA UNA VEZ MAS")
			return res.status(200).send({ valid: "valid", input: input, output: arrControl.join(""), date: Date() })	
		} else if(arrValues.length === arrControl.length -1 && arrValues.every(el => el === Object.values(objectControl)[0] -1)){
//			console.log("ACA VA A ENTRAR CUANDO ENTRE TODOS REPETIDOS LA MISMA CANTIDAD DE VECES LA PRIMERA SE REPITE UNA VEZ MAS")
			return res.status(200).send({ valid: "valid", input: input, output: arrControl.join(""), date: Date() })	
		}

//		console.log("ACA ENTRA SI NADA MAS SIRVIO")
		return res.status(200).send({ valid: "invalid", input: input, output: arr.join(""), date: Date() })
	}

})


app.listen(3001, () => {
	console.log("Funcionando en el puerto 3001")
})