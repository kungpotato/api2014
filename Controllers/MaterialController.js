var MaterialController = function(Material){
  var post = (req, res)=>{
      //console.log(req.body)
      var mt = req.body.method

      var inputMaterial = new Material(req.body.data)
      //console.log(inputMaterial)

      if(mt == 'save'){
        inputMaterial.save();
        res.status(201)
        res.send(inputMaterial)
      }else if(mt == 'remove'){
        //console.log(inputDepartment2)
        for(var i=0; i<req.body.data.length; i++){
          const query = req.body.data[i]._id
          //console.log(query)
          Material.findByIdAndDelete(query , (err, doc)=>{
            if(err){
              res.status(500).send(err)
              throw err
            }
            else{
              console.log(doc)
              // res.status(200)
              // res.send(doc)
            }
          });
        }
        res.send(Material)
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
        Material.find(query, function(err,data){
            if(err){
                res.status(500).send(err);
            	console.log(err)
            }else{
                var returnItems = [];
                data.forEach(function(element, index, array){
                    var newElem = element.toJSON();
                    returnItems.push(newElem);
                });
                res.status(200)
                res.json(returnItems);
            }
        });
    }
  return {
      post: post,
      get: get
  }
}

module.exports = MaterialController;