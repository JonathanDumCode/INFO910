export class Preset {
    db: any;
    constructor(db: any) {
        this.db = db;
    }
    add(name: string, desc: string, mdp: string, mdpadmin: string, callback: any) {
        let sql = "INSERT INTO `Preset` VALUES (null,'" + name + "','" + desc + "','" + mdp + "','" + mdpadmin + "');"
        this.db.query(sql, function (err: any, result: any) {
            if (err) throw err;
            callback(result)
        });
    }

    update(id: number, name: string, desc: string, callback: any) {
        let sql = "UPDATE `Preset` SET name ='" + name + "', desc='" + desc + "' WHERE id = '" + id + "';"
        this.db.query(sql, function (err: any, result: any) {
            if (err) throw err;
            callback(result)
        });
    }

    del(id: number, callback: any) {
        const THIS = this;
        let sql = "DELETE FROM `Combinaison` WHERE presetID = '" + id + "';"
        THIS.db.query(sql, function (err: any, result: any) {
            if (err) throw err;
            let sql = "DELETE FROM `Element` WHERE presetID = '" + id + "';"
            THIS.db.query(sql, function (err: any, result: any) {
                if (err) throw err;
                let sql = "DELETE FROM `Preset` WHERE id = '" + id + "';"
                THIS.db.query(sql, function (err: any, result: any) {
                    if (err) throw err;
                    callback(result)
                });
            });
        });
    }
}


