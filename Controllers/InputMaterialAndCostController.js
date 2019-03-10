var InputMaterialAndCostController = function(InputMaterialAndCost){
    var post = (req, res)=>{
      //console.log(req.body)
      var mt = req.body.method
      var inputMaterialAndCost = new InputMaterialAndCost(req.body.data)
      //console.log(inputMaterialAndCost)
      if(mt == 'save'){
          inputMaterialAndCost.save();
          res.status(201)
          res.send(inputMaterialAndCost)
      }else if(mt == 'remove'){
        //console.log(inputDepartment2)
        for(var i=0; i<req.body.data.length; i++){
          const query = req.body.data[i]._id
          //console.log(query)
          InputMaterialAndCost.findByIdAndDelete(query , (err, doc)=>{
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
        res.send(InputMaterialAndCost)
      }else{
        res.send('please defind medthod')
      }
    }
    var get = (req,res)=>{
        //var query = {department: "gergerg"};
        var query = {};
        InputMaterialAndCost.find(query, function(err,data){
            if(err)
                res.status(500).send(err);
            else{
                var returnData = [];
                data.forEach(function(element, index, array){
                    var newData = element.toJSON();
                    returnData.push(newData);
                });
                res.status(200)
                res.json(returnData);
                //console.log(returnData)
            }
        });
    }
    return {
        post: post,
        get: get
    }
}

module.exports = InputMaterialAndCostController;