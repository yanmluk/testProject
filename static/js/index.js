// define some global consts
const canvas_margin = { top: 50, right: 50, bottom: 60, left: 50 },
    canvas_width  = 500 - canvas_margin.left - canvas_margin.right,
    canvas_height = 400 - canvas_margin.top  - canvas_margin.bottom;

// create svg
let svg = d3.select("#canvas")
                .append("svg")
                .attr("id","canvas_svg")
                .attr("width",  canvas_width  + canvas_margin.left + canvas_margin.right)
                .attr("height", canvas_height + canvas_margin.top  + canvas_margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + canvas_margin.left + "," + canvas_margin.top + ")");

let x = d3.scaleLinear().range([0, canvas_width]).domain([0, 1]);
let y = d3.scaleLinear().range([canvas_height, 0]).domain([0, 1]);

svg.append("g")
    .attr("transform", "translate(0," + canvas_height + ")")
    .call(d3.axisBottom(x));

svg.append("g")
    .call(d3.axisLeft(y));

// test http methods
$.ajax({
    url: '/get_data',
    data:JSON.stringify({data:[{x:0.1, y:0.2},{x:0.3, y:0.5}, {x:0.7, y:0.4}, {x:0.3, y:0.8}, {x:0.5, y:0.5}]}),
    type: 'POST',
    //error function for first ajax call
    error: function(error) {
        console.log(error);
    }
}).done(function(jsonRes){
    const data = jsonRes.data;
    let dots = svg.selectAll(".dot")
        .data(data)
        .enter()
        .append("g")
        .attr("class","dot");

    dots.append("circle")
        .attr("cx", function (d) { return x(d.x); } )
        .attr("cy", function (d) { return y(d.y); } )
        .attr("r", 5)
        .attr("opacity", 0.5)
        .style("fill", "blue");
});

