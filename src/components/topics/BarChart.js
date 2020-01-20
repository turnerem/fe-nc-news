import React, { Component } from 'react'
import * as d3 from 'd3'
// import * as api from '../api';
import * as fakeData from './fakeData'

class BarChart extends Component {
    

    componentDidMount() {
        const { topic } = this.props;
        const data = fakeData[topic]
        this.drawBarChart(data)
    }
    render() { 
        return <div ref="canvas5"></div> 
    }
    drawBarChart(data)  {
        
        const width = 450,
          height = 85;
               
            const scale = 2
            const svgTopics = d3.select(this.refs.canvas5)
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .style('border-bottom', '1px solid black')
                // .append('g')
                // .attr('transform', 'translate(' + margin.left + ', ', + margin.top + ')')
            
            // x-axis
            // const x = d3.scaleBand()
            //   .range([0, width])
            //   .domain(data.map(d => {return d.xLabels}))
            //   .padding(0.2)



            svgTopics.selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                    .attr('x', (d, iteration) => iteration * 15)
                    .attr('width', 15)
                    .attr('fill', 'orange')
                    .attr('height', (d) => 0)
                    .attr('y', (d) => 0)

            svgTopics.selectAll('rect')
              .transition()
              .duration(800)
              .attr('y', (d) => height - d * scale)
              .attr('height', (d) => height * scale)
              .delay((d, i) => {return i * 100})
                }
}
export default BarChart