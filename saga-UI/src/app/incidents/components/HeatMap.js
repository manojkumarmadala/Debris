import React from 'react';
import * as d3 from 'd3';
import Loading from '../../loading';

export default class HeatMap extends React.Component{
    constructor(props){
        super(props);
    }
    generateHeatMap = (data) =>
	{   console.log('1');
	    console.log(data);
	    let width;
	    let height;
	    let cellsize_x=100;
	    let cellsize_y=20;
	    let item_x=[];
	    let item_y=[];
	    let x_scale;
	    let y_scale;
	    let color_scale;
	    let color_scale_1;
	    let x_axis;
	    let y_axis;
		
		for(let i=0;i<data.length;i++){
		item_x.push(data[i].month);
        item_y.push(data[i].client);}
          console.log('2');
        console.log(item_x);
        console.log(item_x);

		
		
		item_x=d3.set(item_x).values();
		item_y=d3.set(item_y).values();
		x_scale = d3.scalePoint()
					.domain(item_x)
					.range([0, (item_x.length-0.9) * cellsize_x]);
		y_scale = d3.scalePoint()
					.domain(item_y)
					.range([0, (item_y.length+0.1) * cellsize_y]);
				//console.log(item_x);

		color_scale= d3.scaleThreshold()
                        .domain([1,2,5,10,30,50, 100,5000])
                        .range(["#97dc92", "#82c77e","#b2c77e","#f5cf47", "#ffa500","#ff8100","#ff4700","#f50404","#fff"]);	
        color_scale_1= d3.scaleThreshold()
                        .domain([1,2,5,10,30,50, 100])
                        .range(["#97dc92", "#82c77e","#b2c77e","#f5cf47", "#ffa500","#ff8100","#ff4700","#f50404"]);
	
		x_axis = d3.axisTop()
				.scale(x_scale)
				.tickFormat(function (d,i) {
								return item_x[i];});
				
        y_axis = d3.axisLeft()
				.scale(y_scale)
				.tickFormat(function (d,i) {
								return item_y[i];});
								
	
		let element = d3.select('#heatmap').node();
        // width=element.getBoundingClientRect().width-150;
        // if(width<=0){width=1300}
        width=1300;
        //console.log(element.getBoundingClientRect().width);
        //console.log(width);
	    height=item_y.length * cellsize_y+200;
	
        d3.select("#legend")
        .style("height", height+"px");
			
		let area=d3.select("#heatmap").append("svg").attr("height",height).attr("width",width).append("g").attr("transform","translate(220,100)");
				
		area.selectAll("rect")
			.data(data)
			.enter()
			.append("rect")
			.attr("width",function(d,i,data){return cellsize_x;})
			.attr("height",function(d,i,data){return cellsize_y;})
			.attr("x",function(d){return x_scale(d.month);})
			.attr("y",function(d){return y_scale(d.client);})
			.attr("fill",function(d)
				{if(d.client=='Total'){
					//console.log(d.client);
					return "#adacac";}
					return color_scale(d.count);
				})
			.on("click",function(d)
				{ 
					if(d.month=="Total"||d.client=="Total")
				{
					//console.log(d);
				}
				else 
				{
					
				//	onClick(d);
				}

				})
			.on("mouseover", function(d) 
				{
                if(d.month=="Total"||d.client=="Total")
				{
					//console.log(d);
				}
				else 
				{
					//d3.select(this).style("cursor", "pointer"); 
				}
			})
			.on("mouseout", function(d) {d3.select(this).style("cursor", "default"); })
  
			//console.log(x_scale("2017-I-September"));

		area.selectAll("text")
			.data(data)
			.enter()
			.append("text")
            .attr("x", function(d) { return x_scale(d.month)+(cellsize_x*2)/5; })
            .attr("y", function(d) { return y_scale(d.client)+(cellsize_y/2);})
            .attr("dy", ".35em")
            .text(function(d) { return d.count; })
            .on("click",function(d){
                if(d.month=="Total"||d.client=="Total")
				{
					//console.log(d);
				}
				else 
				{
					
				//	onClick(d);
				}
			})
            .on("mouseover",function(d) {
                if(d.month=="Total"||d.client=="Total")
				{
					//console.log(d);
				}
				else 
				{
					
					//d3.select(this).style("cursor", "pointer"); 
				}
            })
			.on("mouseout",function(d) {d3.select(this).style("cursor", "default"); })

        /*area.append("text")
         	 .attr("x",(item_x.length * cellsize_x)/2)
         	 .attr("y",item_y.length * cellsize_y+50)
         	 .attr("text-anchor", "middle")  
            .style("font-size", "16px") 
            .text("Heatmap DataAnalytics pillar");
        */

        area.append("g")
            .attr("class", "y axis")
            .call(y_axis)
            .selectAll('text')
            .attr('font-weight', 'normal')
            .attr('transform',"translate(0,"+cellsize_y/2+")");

 

        area.append("g")
            .attr("class", "x axis")
            .call(x_axis)
            .selectAll('text')
            .attr('font-weight', 'normal')
            .style("text-anchor", "start")
            .attr("dx", ".8em")
            .attr("dy", ".5em")
            .attr('transform',"translate("+cellsize_x/2+",0) rotate(-45)");

        	}

			
    redraw = () => {
		let element = d3.select('#content1').node();
		let width=element.getBoundingClientRect().width-150;
		if(width<=0){width=1300}
		    d3.select("#heatmap").select("svg").attr("width",width);
    }
    
    componentDidMount(){
        console.log('props of heatmap component')
        console.log(this.props);
		if (!this.props.isDataAvailable) {
			this.props.actions.loadIncidentsHeatMapData(this.props.product);
		}
		  this.generateHeatMap(this.props.heatMapData);
    }

    componentDidUpdate(){
        this.generateHeatMap(this.props.heatMapData);
    }

    render(){
        if (!this.props.isDataAvailable) {
			return (
                <div>
				    <Loading loading={true}/>
                </div>
			);
        }
        
        return <div>
            <div className="text-center">
                <h4>{this.props.title}</h4>
                <div id="heatmap" style={{'paddingLeft':'100px'}}></div>
            </div>
        </div>;
    }
}