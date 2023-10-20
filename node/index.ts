/*######################################################
Import
######################################################*/

import * as express from "express"
import * as fs from "fs"

import * as dotenv from "dotenv"

import * as http from "http"
import * as https from "https"
import { ServerOptions } from "https"


dotenv.config();

import * as BDD from "./bdd/bdd"
import * as EXP from "./express/exp"
// const EXP = require('./modules/express.js');
// const MAIL = require('./modules/mail.js');
// const SOC = require('./modules/Socket.js');


/*######################################################
Constante
######################################################*/
const app = express();
const pathHTML = "./www/";
const pathMODULE = "./modules";
const PORT = 8081;


//DB
const host = process.env.HOST??"";
const user = process.env.MYSQL_USER??"";
const mdp = process.env.MYSQL_PASSWORD??"";
const database = process.env.MYSQL_DATABASE??"";

/*######################################################
BDD
######################################################*/


/*######################################################
Fonction
######################################################*/
function findlast(){
	let nb = 1;
	while(fs.existsSync("./https/privkey"+nb+".pem")){
		nb++;
	}
	return nb-1;


}
function newServer(app){
	if(process.env.isHTTPS == "true"){
		let nb = findlast();
		const options : ServerOptions = {
			key : fs.readFileSync("./https/privkey"+nb+".pem").toString(),
			cert : fs.readFileSync("./https/fullchain"+nb+".pem").toString()
		};
		return https.createServer(options, app);
	}else{
		return http.createServer(app);
	}
}

/*######################################################
main
######################################################*/
function main(){
    
	let bdd :any  = BDD.init(host,user,mdp,database);//Creation de l'instance de la BDD

	EXP.init(PORT,bdd,host); //Initialisation du serveur express
	const server = newServer(EXP.app) //Creation du serveur http
	server.listen(PORT); //Ecoute du serveur http 

    console.log("Serveur => ON")
}
main();




