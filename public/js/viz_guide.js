var layer_1_active = false;
var layer_2_active = false;

function drawLayers() {

	layers = g.append('text') // blue: bus + walking
		.attr('x', gap + 20)
		.attr('y', 20)
		.text('LAYERS')
		.attr('class', 'legend')
		.style('fill', '#fff')
		.style('fill-opacity', 1)
		.attr('text-anchor', 'start')
		.attr('stroke', 'none');

	layer_line = g.append('line') // blue: bus + walking
		.attr('x1', gap+7)
		.attr('y1', 10 )
		.attr('x2', gap+7)
		.attr('y2', height-10)
		.style('fill', '#fff')
		.style('fill-opacity', 0)
		.attr('stroke', '#fff')
		.attr('stroke-width', 1);

	var diameter2 = 26;

	// var tg = (width/4 - 110 - 5 * diameter2)/3; // for 3 circles
	// var x1 = gap + 110;
	// var x2 = x1 + 2 * diameter2 + tg;
	// var x3 = x2 + 2 * diameter2 + tg;
	
	var tg = (width/4-40)/2; 
	var x1 = gap + 20 + diameter2;
	var x2 = x1 + 140;
	var dy = 15;
	var img_size = 30;

	img_1 = g.append("image")
	   .attr('x', x1 - img_size/2)
	   .attr('y', height/2 - img_size/2 + dy)
	   .attr('width', img_size)
	   .attr('height', img_size)
	   .style('opacity', 0.9)
	   .attr("xlink:href","bus2.png");

	img_2 = g.append("image")
	   // .attr('x', x2 - img_size/2*1.2)
	   .attr('y', height/2 - img_size/2 +dy + 5)
	   .attr('x', function() {
			if(window_width < 1309) { return x1 + 70 - img_size/2*1.2; }
			else { return x2 - img_size/2*1.2; }
		})
	   .attr('width', img_size*1.2)
	   .attr('height', img_size*0.6*1.2)
	   .style('opacity', 0.9)
	   .attr("xlink:href","bike2.png");

	layer_1 = g.append('circle') // bus route layer
		.attr('cx', x1)
		.attr('cy', height/2 + dy)
		.attr('r', diameter2)
		.style('fill', '#fff')
		.style('fill-opacity', 0.15)
		.attr('stroke-width', 0.9)
		.attr('stroke', 'rgba(255,255,255,0.2)')
		.on("mouseover", function() {
			d3.select(this).style('fill-opacity', 0.3);
			tooltip.text("Bus Routes");

			if($( window ).width() < 1309) {  tooltip.style("visibility", "visible"); }
			else { tooltip.style("visibility", "hidden"); }
			// tooltip.style("visibility", "visible");
		})
		.on("mousemove", function(){
			tooltip.style("top", (event.pageY- 40)+"px").style("left",(event.pageX -40)+"px");
		})
		.on("mouseout", function() {
			d3.select(this).style('fill-opacity', 0.15);
			tooltip.style("visibility", "hidden");
		})
		.on('click', function() {
			if(layer_1_active) { // true
				d3.select(this).attr('stroke', 'rgba(255,255,255,0.2)');
				layer_1_active = false;
				map.removeLayer(busRouteLayer);
			} else {
				// d3.select(this).attr('stroke', '#76f013'); // green
				d3.select(this).attr('stroke', '#fdf733'); // yellow
				layer_1_active = true;
				
				busRouteLayer.addTo(map);
			}
		});

	layer_2 = g.append('circle') // bike station layer
		// .attr('cx', x2)
		.attr('cy', height/2 + dy )
		.attr('cx', function() {
			if(window_width < 1309) { return x1 + 70; }
			else { return x2; }
		})
		.attr('r', diameter2)
		.style('fill', '#fff')
		.style('fill-opacity', 0.15)
		.attr('stroke-width', 0.9)
		.attr('stroke', 'rgba(255,255,255,0.2)')
		.on("mouseover", function() {
			d3.select(this).style('fill-opacity', 0.3);
			tooltip.text("Hubway Stations");
			if($( window ).width() < 1309) {  tooltip.style("visibility", "visible"); }
			else { tooltip.style("visibility", "hidden"); }
		})
		.on("mousemove", function(){
			tooltip.style("top", (event.pageY- 40)+"px").style("left",(event.pageX -40)+"px");
		})
		.on("mouseout", function() {
			d3.select(this).style('fill-opacity', 0.15);
			tooltip.style("visibility", "hidden");
		})
		.on('click', function() {
			
			if(layer_2_active) { // true
				d3.select(this).attr('stroke', 'rgba(255,255,255,0.2)');
				layer_2_active = false;
				map.removeLayer(bikeStationLayer);
			} else {
				// d3.select(this).attr('stroke', '#fdf733'); // yellow
				// d3.select(this).attr('stroke', '#ed462f'); // orange
				d3.select(this).attr('stroke', '#76f013');  // green
				layer_2_active = true;
				bikeStationLayer.addTo(map);
			}
		});

	text2_1 =  g.append('text') // blue: bus + walking
		.attr('x', x1 + diameter2 + 8)
		.attr('y',  height/2 + dy)
		.text('Bus')
		.attr('class', 'legend2')
		.style('fill', '#fff')
		.style('fill-opacity', 0.65)
		.attr('text-anchor', 'start')
		.style('visibility', function() {
			if(window_width < 1309) { return 'hidden'; }
			else { return 'visible'; }
		})
		.attr('stroke', 'none');

	text2_1_1 =  g.append('text') // blue: bus + walking
		.attr('x', x1 + diameter2 + 8)
		.attr('y',  height/2 + dy + 15)
		.text('Routes')
		.attr('class', 'legend2')
		.style('fill', '#fff')
		.style('fill-opacity', 0.65)
		.style('visibility', function() {
			if(window_width < 1309) { return 'hidden'; }
			else { return 'visible'; }
		})
		.attr('text-anchor', 'start')
		.attr('stroke', 'none');

	text2_2 =  g.append('text') // blue: bus + walking
		.attr('x', x2 + diameter2 + 8)
		.attr('y',  height/2 + dy)
		.text('Hubway')
		.attr('class', 'legend2')
		.style('fill', '#fff')
		.style('fill-opacity', 0.65)
		.style('visibility', function() {
			if(window_width < 1309) { return 'hidden'; }
			else { return 'visible'; }
		})
		.attr('text-anchor', 'start')
		.attr('stroke', 'none');

	text2_2_1 =  g.append('text') // blue: bus + walking
		.attr('x', x2 + diameter2 + 8)
		.attr('y',  height/2 + dy + 15)
		.text('Stations')
		.attr('class', 'legend2')
		.style('fill', '#fff')
		.style('visibility', function() {
			if(window_width < 1309) { return 'hidden'; }
			else { return 'visible'; }
		})
		.style('fill-opacity', 0.65)
		.attr('text-anchor', 'start')
		.attr('stroke', 'none');
}


///////////////////////////////////////////////////////////////////////////////////////



