
var UserController = function(User){
  var post = (req, res)=>{
      //console.log(req.body)
      var mt = req.body.method

      var user = new User(req.body.data)
      //console.log(inputMaterial)

      if(mt == 'save'){
        user.save();
        res.status(201)
        res.send(user)
      }else if(mt == 'remove'){
        //console.log(inputDepartment2)
        for(var i=0; i<req.body.data.length; i++){
          const query = req.body.data[i]._id
          //console.log(query)
          User.findByIdAndDelete(query , (err, doc)=>{
            if(err){
              res.status(500).send(err)
              throw err
            }
            else{
              console.log(doc)
            }
          });
        }
        res.send(User)
      }else{
        res.send('please defind medthod')
      }
  }
  var get = (req,res)=>{
        //var query = {department: "gergerg"};
        var query = {};
        User.find(query, function(err,data){
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

module.exports = UserController;