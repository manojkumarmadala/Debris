import React,{Component} from 'react';
import {
    scaleThreshold as d3ScaleThreshold,
    scaleBand as d3ScaleBand,
  } from 'd3-scale';
import { select } from 'd3-selection';
var commonWidth = 0;

class ChatFunnelGraph extends Component {
    constructor(props){
		super(props);
		console.log('chat funnel graph constructor called');
    }
    
    componentDidMount() {
        console.log('chat funnel graph componentDidMount called');
        this.drawChart();
      }    

    drawChart() {
        var data = [
            {"name":"Visitors", "value":13794717},
            {"name":"HotLead Visitors","value":3629760},
            {"name":"Invited Visitors","value":3119035},
            {"name":"Accepted Visitors","value":118895},
            {"name":"Chat Started","value":116389},
            {"name":"Interactive Chats","value":96411},
            {"name":"In Session Conversation","value":2648},
            {"name":"Cross Session Conversation","value":1914}
            ];
            
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 600,
            funnel_width = 400,
            height=475,
            font_size=12,
            bar_height = 40,
            line_length = 25;
        var commonWidth =0;
        var x = d3ScaleThreshold()
        .domain([1,100,1000,10000,100000,1000000,10000000,100000000])
        .range([50,100,150,200,250,300,350,400]);
        var y = d3ScaleBand()
                    .range([0, height])
                    .padding(0.1);
        var svg = select(".funnelChart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")            
            .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");
        svg.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "white");
        function setCommonWidth(width){
            commonWidth = width/2;
        }
        setCommonWidth(funnel_width);
        
        // Scale the range of the data in the domains
        //x.domain([0, d3.max(data, function(d) { return d.value; })]);
        y.domain(data.map(function(d) { return d.name; }));
        // append the rectangles for the bar chart
        svg.selectAll(".bar")
            .data(data)
        .enter()
        .append("rect")
            .attr("class", "bar")
            .attr("x", function(d, i){
            if( i != 0){
            return commonWidth-(x(d.value)/2);
            }
            else
            return 10;
            })
            .attr("width", function(d,i) {
                if( i == 0) setCommonWidth(x(d.value));
                if(i != data.length-1 && i != 0){
                if(data[i-1].value>data[i].value)
                    return x(d.value)-(2*(data[i].value/data[i-1].value));
                else
                    return x(d.value)+(2*(data[i].value/data[i-1].value));
                }
                else
                    return x(d.value);
                    })
            .attr("y", function(d) { return y(d.name); })
            .attr("height",bar_height )
            .attr("fill", "#f7941d");

        svg.selectAll("line")
            .data(data)
            .enter()
            .append("line")
            .attr("x1",commonWidth)
            .attr("y1",function(d,i){return i!=data.length-1 ? y(d.name)+bar_height : 0;})
            .attr("x2", commonWidth)
            .attr("y2",function(d,i){return i!=data.length-1 ? y(d.name)+bar_height+line_length : 0;})
            .attr("stroke","#f7941d");

        svg.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("x",commonWidth+3)
            .attr("y", function(d,i){return i!=data.length-1 ? y(d.name)+bar_height+(line_length/2) : 0;})
            .text(function(d,i){
                if(i!=data.length-1) return ((data[i+1].value/data[i].value)*100).toFixed(1)+"%";
            })
            .attr("font-size",font_size)
            .attr("fill","#f7941d")
            .attr("font-weight","bold");

        svg.selectAll(".text")
            .data(data)
            .enter()
            .append("text")
            .attr("x", function(d, i){
                    return (commonWidth*2)+margin.right;
                })
                .attr("y",function(d) { return y(d.name)+font_size; })
                .text(function(d){return d.name;})
                .attr("font-size",font_size)
                .attr("fill","#9496a0")
                .attr("font-weight","bold");

        svg.selectAll(".text")
            .data(data)
            .enter()
            .append("text")
            .attr("x", function(d,i){
                return (commonWidth*2)+margin.right;
            })
            .attr("y", function(d){
                return y(d.name)+ (2*font_size) + 2;
            })
            .text(function(d){return d.value.toLocaleString();})
            .attr("font-size",font_size)
            .attr("fill","#9496a0")
            .attr("font-weight","bold");
    }

    render(){
        return <div class={this.props.id}></div>
      }
}

export default ChatFunnelGraph;