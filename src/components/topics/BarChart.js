import React, { Component } from 'react'
import * as d3 from 'd3'
// import * as api from '../api';
import * as data from './fakeData.js'

class BarChart extends Component {

    componentDidMount() {
        const { topic } = this.props;
        const dataSel = (document.getElementById('canvas5').offsetWidth < 650) ? data[topic].slice(-10) : data[topic]
        this.drawBarChart(dataSel)
    }

    render() { 
        return <div ref="canvas5" id='canvas5'></div> 
    }
    drawBarChart(data)  {
        const margin = {top: 10, bottom: 50, left: 40},
          width = document.getElementById('canvas5').offsetWidth * .9,
          height = 135 - margin.bottom;

          const colWidth = width / data.length;

          const xAxisLabels = []
          const cols = []
          for (let i = 0; i < data.length; i++) {
              if (i === 0) { xAxisLabels.unshift('today'); cols.unshift('black') }
              else if (i / 7 === 1) { xAxisLabels.unshift('1 week ago'); cols.unshift('black') }
              else if (i % 7 === 0) { xAxisLabels.unshift(`${i / 7} weeks ago`) ; cols.unshift('black') }
              else { xAxisLabels.unshift(`${i}`); cols.unshift('white') }
          }
          
          const xyData = []
          xAxisLabels.forEach((label, i) => {
              xyData.push({Time: label, Count: data[i], colour: cols[i]})
            })
            
            // const scale = 2
            const svgTopics = d3.select(this.refs.canvas5)
                .append('svg')
                .attr('width', width)
                // .attr('width', width + margin.left)
                .attr('height', height + margin.bottom)
                // .style('border-bottom', '1px solid black')
                // .append('g')
                // .attr('transform', 'translate(' + margin.left + ')')
            
            const x = d3.scaleBand()
              .domain(xyData.map(d => d.Time))
                .range([ 0, width ])
                // .padding(0.2);
                svgTopics.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x))
                .selectAll("text")
                    .attr("transform", "translate(-10,0)rotate(-45)")
                    .style("text-anchor", "end");

            const y = d3.scaleLinear()
              .domain([0, 38])
              .range([ height, 0])
            //   .select('text').remove()
            svgTopics.append('g')
              .attr('class', 'white-axis')
              .call(d3.axisLeft(y))
           

            svgTopics.selectAll('rect')
                .data(xyData)
                .enter()
                .append('rect')
                    .attr('x', d => x(d.Time))
                    .attr('width', x.bandwidth())
                    .attr('width', colWidth)
                    .attr('fill', 'orange')
                    .attr('height', (d) => height - y(0))
                    .attr('y', (d) => y(0))

            svgTopics.selectAll('rect')
              .transition()
              .duration(950)
            //   .attr('y', (d) => height - d * scale)
            //   .attr('height', (d) => height * scale)
            .attr('y', (d) => y(d.Count))
            .attr('height', (d) => height - y(d.Count))
            .delay((d, i) => {return i * 30})
            }
}
export default BarChart