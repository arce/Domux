
var body = domux("body");

body.append("h2").text("Table sample")
var tbl = body.append("table");
var tblBody = tbl.append("tbody");
 
for (var i = 0; i < 2; i++) {
 
  var row = tblBody.append("tr");
 
  for (var j = 0; j < 2; j++)
    row.append("td").text("cell in row "+i+", column "+j);

 }
 
 tbl.attr("border", "2");
 tbl.style("color", "#ff0000");
 tbl.attr("stroke","3");