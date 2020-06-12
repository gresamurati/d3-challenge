
var margin = {top: 10, right: 30, bottom: 40, left: 60},
    width = parseInt(d3.select("#scatter").style("width")) - margin.left - margin.right,
    height = width-width/4;


var svg = d3.select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


d3.csv("https://raw.githubusercontent.com/gresamurati/d3-challenge/master/data.csv", function(data) {

  var xmin = d3.min(data,function(d ){
    return parseFloat(d.poverty) * 0.9
  })

  var ymin = d3.min(data,function(d ){
    return parseFloat(d.healthcare) * 0.8
  })

  var xmax = d3.max(data,function(d ){
    return parseFloat(d.poverty) * 1.1
  })

  var ymax = d3.max(data,function(d ){
    return parseFloat(d.healthcare) * 1.1
  })

  // Add X axis
  var x = d3.scaleLinear()
    .domain([xmin, xmax])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width/2)
    .attr("y", height + margin.top + 20)
    .text("In Poverty(%)");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([ymin, ymax])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y))

svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left+20)
    .attr("x", -margin.top)
    .text("Lacks Healthcare(%)");

  // Add a tooltip div
  var tooltip = d3.select("#scatter")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px")


  // A function that change this tooltip when the user hover a point.
  var mouseover = function(d) {
    tooltip
      .style("opacity", 1)
  }

  var mousemove = function(d) {
    tooltip
      .html("Poverty: " + d.poverty)
      .style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
      .style("top", (d3.mouse(this)[1]) + "px")
  }

  // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
  var mouseleave = function(d) {
    tooltip
      .transition()
      .duration(100)
      .style("opacity", 0)
  }

  // Add dots
 svg.append('g')
    .selectAll("dot")
    .data(data) 
    .enter()
    .append("circle")
    .attr("cx", function (d) { return x(d.poverty); } )
    .attr("cy", function (d) { return y(d.healthcare); } )
    .attr("r",12)
    .style("fill", "#69b3a2")
    .style("opacity", 0.4)
    .style("stroke", "black")
    .on("mouseover", mouseover )
    .on("mousemove", mousemove )
    .on("mouseleave", mouseleave )

    // label within circle
svg.selectAll("dot")
  .data(data)
  .enter().append("text")
  .attr("class", "dodo")
  .attr("font_family", "sans-serif")  // Font type
            .attr("font-size", "10px")  // Font size
            .attr("fill", "black")
  .attr("dx", function (d) { return x(d.poverty)-6;  })
  .attr("dy", function (d) { return y(d.healthcare) +12/2.5; } )
  .text(function(d) { return d.abbr;});
  

})



