var DepartmentController = function(Department){
  var post = (req, res)=>{
      //console.log(req.body)
      var mt = req.body.method

      var inputDepartment = new Department(req.body.data)
      //console.log(inputDepartment)

      if(mt == 'save'){
        inputDepartment.save();
        res.status(201)
        res.send(inputDepartment)
      }else if(mt == 'remove'){
        //console.log(inputDepartment2)
        for(var i=0; i<req.body.data.length; i++){
          const query = req.body.data[i]._id
          //console.log(query)
          Department.findByIdAndDelete(query , (err, doc)=>{
            if(err){
              res.status(500).send(err)
              throw err
            }
            else{
              console.log(doc)
              console.log('remove success')
              // res.status(200)
              // res.send(doc)
            }
          });
        }
        res.send(Department)
      }else{
        res.send('please defind medthod')
      }

      // if(!req.body.title){
      //     res.status(400);
      //     res.send('Title is required');
      // }
      // else {
      //     book.save();
      //     res.status(201)
      //     res.send(book);
      // }
  }
  var get = (req,res)=>{
        //var query = {department: "gergerg"};
        var query = {};
        Department.find(query, function(err,data){
            if(err)
                res.status(500).send(err);
            else{
                var returnBooks = [];
                data.forEach(function(element, index, array){
                    var newDept = element.toJSON();
                    returnBooks.push(newDept);
                });
                res.status(200)
                res.json(returnBooks);
            }
        });
    }
  return {
      post: post,
      get: get
  }
}

module.exports = DepartmentController;