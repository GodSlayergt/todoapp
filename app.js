var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb+srv://gtiwari037:DTJizkPfPqAYqe74@cluster0.8c0r8xj.mongodb.net/?retryWrites=true&w=majority");

const itemSchema = {
  description:String,
  category:String,
  date:String
};

const Item = mongoose.model("Item", itemSchema);


app.get("/", function (req, res) {
  Item.find({}, function (err, f) {
      res.render("list", { newListItem: f});
    
  });
});

app.post("/", function (req, res) {
  const item = new Item({...req.body})
  item.save()
  res.redirect("/");
});

const deleteItem = (i,res)=>{
  Item.findByIdAndRemove(i, function (err) {
    if (!err) {
      console.log("Successfully deleted");
      res.redirect("/");
    }
  })
}



app.post("/delete", function (req, res) {
const checkBox = req.body.checkbox
if(typeof checkBox === 'string'){
  deleteItem(checkBox,res)
}
else if(Array.isArray(checkBox)){
Item.deleteMany({_id: {$in: checkBox}},function(err){
  if (!err) {
    console.log("Successfully deleted");
    res.redirect("/");
  }
});
}
});

app.listen(3000, function () {
  console.log("listening on port 3000.");
});
