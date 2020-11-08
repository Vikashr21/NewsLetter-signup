const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const app=express();
const https=require("https");
const e = require("express");
const port=3000;
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));



/* get*/

app.get("/",(req,res)=>{
   
    res.sendFile(__dirname+"/signup.html");

});
/*get end */


/*Post*/
app.post("/",(req,res)=>{
    
    let first_name=req.body.fname;
    let last_name=req.body.lname;
    let email=req.body.email;
    let data={
        members :[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:first_name,
                    LNAME:last_name
                }
            }
        ]
    };
    const josnData=JSON.stringify(data);
    const url="https://usX.api.mailchimp.com/3.0/lists/{list_id}";///change the X and id
    const Option={
        method:"POST",
        auth:"Yourname:{Api key}"///change here
    };
    console.log(first_name,last_name,email);
   const request= https.request(url,Option,(response)=>{
      
    if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
    }
    else{
        
        res.sendFile(__dirname+"/failure.html");   }

    response.on("data",(data)=>{
            
            console.log(JSON.parse(data));
        });
    });

    request.write(josnData);
    request.end();
    
});
app.post("/failure",(req,res)=>{
    res.redirect('/');
})
/*Post end*/

/* Listen */
app.listen(process.env.PORT||port,()=>{
    console.log(`server started at ${port}`);
});
/*listen end */
