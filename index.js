const express = require('express');
const path = require('path');
const app = express();
const mysql = require('mysql');
const PORT = process.env.PORT||5000;

const connection = mysql.createConnection({
   host: 'localhost',
   user:'root',
   password:'',
   database:'egtraffledata'
   //host: 'db4free.net',
  // user:'roottoordatatest',
  // password:'01020929Henry!',
  //database:'egtraffledata'
});

connection.connect();
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//SELECT
app.get('/api/contestant',(req, res)=>{
   connection
   .query('SELECT * FROM raffledatas',(err, rows, fields)=>{
       if (err) throw err
       res.json(rows);
   });

});



//SELECT DETAIL
app.get('/api/contestant/:ContestantId',(req, res)=>{
    var ContestantId = req.params.ContestantId;
   // res.send(id);

    connection
    .query(`SELECT * FROM raffledatas where ContestantId = '${ContestantId}'`,(err, rows, fields)=>{
        if (err) throw err
       
        if (rows.length >0){
            res.json(rows);
        }else{
            res.status(400).json({msg:`No user with an id of ${ContestantId}`});
        }
       
    });

 });


//INSERT
 app.post('/api/contestant/',(req, res)=>{     
    var EmployeeID = req.body.EmployeeID;
    var Contestant = req.body.Contestant;
    var Attendance = req.body.Attendance;
    var Department = req.body.Department;
    connection
    .query(`INSERT INTO raffledatas(EmployeeID,Contestant,Attendance,Department) VALUES 
    ('${EmployeeID}','${Contestant}','${Attendance}','${Department}')`,(err, rows, fields)=>{
      
        if (err) throw err
        res.json({msg:`1 row inserted`});  
    });
});


//Update
app.put('/api/contestant/',(req, res)=>{     
    var ContestantId = req.body.ContestantId;
    var EmployeeID = req.body.EmployeeID;
    var Contestant = req.body.Contestant;
    var Attendance = req.body.Attendance;
    var Department = req.body.Department;
    
    connection
    .query(`Update raffledatas SET EmployeeID='${EmployeeID}',Contestant='${Contestant}',Attendance='${Attendance}',
    Department='${Department}' Where ContestantId='${ContestantId}'`,(err, rows, fields)=>{
      
        if (err) throw err
        res.json({msg:`1 row updated`});  
    });
});


//delete
app.delete('/api/contestant',(req, res)=>{

    var ContestantId = req.body.ContestantId;
    connection
    .query(`DELETE FROM raffledatas where ContestantId = '${ContestantId}'`,(err, rows, fields)=>{
        if (err) throw err
        res.json({msg:`1 row was deleted`}); 
    });
 
 });




app.use(express.static(path.join(__dirname,'public')));
app.listen(PORT, ()=>{
    console.log(`Server is started in port ${PORT}`);
});