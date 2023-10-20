export function preset(ENV : any){


    ENV.addPost("/preset/add",["name:String","desc:String","mdp:String","mdpadmin:String"],["Status 1","Array(erreur)"],"Ajouter un preset" ,(req:any,res:any)=>{
        let err = []

        const name = (req.body.name);
        const desc = (req.body.desc);
        const mdp = (req.body.mdp);
        const mdpadmin = (req.body.mdpadmin);

        console.log(req.body)

        if(ENV.estScript(name)){ err.push("Le nom est invalid !")}
        if(ENV.estScript(desc)){ err.push("La description est invalid !")}
        if(ENV.estScript(mdp)){ err.push("Le mot de passe est invalid !")}
        if(ENV.estScript(mdpadmin)){ err.push("Le mot de passe admin est invalid !")}

        if(ENV.estVide(name)){err.push("Le nom est vide !")}
        if(ENV.estVide(desc)){err.push("La description est vide !")}

        if(err.length > 0){
            res.status(200).json(ENV.repErr(err));
        }else{
            ENV.BDD.preset.add(name,desc,ENV.MD5(mdp),ENV.MD5(mdpadmin),(data:any)=>{
                res.status(200).json(ENV.repOK());
            })
        }
        
        
    })
}