/*######################################################
Import
######################################################*/

import * as mysql from "mysql"

import * as dbTable from './module/bdd-Table'

import { Preset } from "./module/preset";


/*######################################################
fonction
######################################################*/

function setup(db:mysql.Connection) : void {

}

/*######################################################
module
######################################################*/

class INIT {
    db: mysql.Connection;
    constructor(db: mysql.Connection) {
        this.db = db;
    }
    Table() {
        dbTable.main(this.db);
    }
    Values() {
        setup(this.db)


    }
}




// let STAT = Stat.class();

/*######################################################
BDD
######################################################*/
let BDD = class {
    user: string;
    host: string;
    mdp: string;
    database: string;

    init: INIT;
    preset: Preset;

    constructor(host: string, user: string, mdp: string, database: string) {
        //constantes
        this.host = host;
        this.user = user;
        this.mdp = mdp;
        this.database = database;

        //connexion
        const db = mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.mdp,
            database: this.database
        });

        db.connect(function (err) {
            if (err) throw err;
            console.log("Connecté à la base de données MySQL!");
        });

        //modules

        //this.stat = new STAT(db);

        this.init = new INIT(db);
        this.init.Table();

        this.preset = new Preset(db)
    }
}










/*######################################################
export
######################################################*/

export function init (host: string, user: string, mdp: string, db :string) : any {
    return new BDD(host, user, mdp, db);
}

