export function test(ENV : any){


    ENV.addRoute("/test",[],["text/html"],"test api" ,(req:any,res:any)=>{
        res.status(200).json(ENV.repData("C Bon"));
    })
}