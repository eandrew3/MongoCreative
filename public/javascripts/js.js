$(document).ready(function(){
 pablo();
  $("#postItem").click(function(){
      var myobj = {Name:$("#name").val(),Item:$("#item").val(),Due:$("#due").val()};
      jobj = JSON.stringify(myobj);
      $("#json").text(jobj);
      var url = "item";
$.ajax({
url:url,
type: "POST",
data: jobj,
contentType: "application/json; charset=utf-8",
success: function(data,textStatus) {
  //  $("#done").html(textStatus);
}
})
pablo();
  });



$("#getItems").click(function() {
  pablo();
});

function pablo() {
   console.log("hi!");
    $.getJSON('item', function(data) {
      console.log(data);
      var everything = "";
      for(var item in data) {
        i = data[item];
        var yo = "<button id='delOne' onclick=\"func(this)\"><h3>" + i.Name + "</h3><h4>" + i.Item + "</h4><h5>" + i.Due + "</h5></button>";
	everything += yo;
      }
      everything += "";
      $("#items").html(everything);
    })
  };

function func(e) {
  var li = e.target;
  var ul = li.parentElement;
  ul.removeChild(li);
  return false;
}

$("#delOne").click(function() {
  var url = "one"; 
});

$("#deleteItems").click(function() {
  var url = "item";
  $.ajax({
url:url,
type: "DELETE",
//data: jobj,
contentType: "application/json; charset=utf-8",
success: function(data,textStatus) {
  //  $("#done").html(textStatus);
}
})
pablo();

  console.log("delete things");
  
});

});

