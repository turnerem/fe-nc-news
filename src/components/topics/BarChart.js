import React, { Component } from 'react'
import * as d3 from 'd3'
// import * as api from '../api';
import * as data from './fakeData.js'

class BarChart extends Component {
    // state = {
    //     _isMounted: false
    // }

    componentDidMount() {
        // this.setState(({_isMounted}) => {
        //     return {_isMounted: true}
        // })
        console.log(this.props.idx, 'idx in BarChart')

    //     d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv", function(data) {
    //         console.log('data from eg', data)
    // })

        // d3.csv('./fakeData.csv')
        //   .then(data => {
        //       console.log('new fake data', data)
        //   })
        
        const { topic } = this.props;
        // console.log('idx', this.props.idx)
        // for (let key in data) {

        //     console.log(key)
        // }
        // const topicData = data.filter(obj => {
        //     return obj.hasOwnProperty(topic)
        // })
        // // const data = JSON.parse(fakeData)
        console.log(data[topic].length, 'length of data?')
        this.drawBarChart(data[topic])
    }

    // componentWilUnmount() {
    //     this.setState(({_isMounted}) => {
    //         return {_isMounted: false}
    //     })
    // }

    render() { 
        console.log('rendering!')
        return <div ref="canvas5" id='canvas5'></div> 
    }
    drawBarChart(data)  {
        const margin = {top: 10, bottom: 50, left: 40},
          width = document.getElementById('canvas5').offsetWidth * .9,
          height = 135 - margin.bottom;

          const colWidth = width / 30;

          const xAxisLabels = []
          const cols = []
          for (let i = 0; i < 31; i++) {
              if (i === 0) { xAxisLabels.unshift('today'); cols.unshift('black') }
              else if (i / 7 === 1) { xAxisLabels.unshift('1 week ago'); cols.unshift('black') }
              else if (i % 7 === 0) { xAxisLabels.unshift(`${i / 7} weeks ago`) ; cols.unshift('black') }
              else { xAxisLabels.unshift(`${i}`); cols.unshift('white') }
          }
          
          const xyData = []
          xAxisLabels.forEach((label, i) => {
              xyData.push({Time: label, Count: data[i], colour: cols[i]})
            })
            console.log('xy data', xyData)
            
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