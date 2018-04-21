 /* global google */
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {GoogleCharts} from 'google-charts';
import svgCharts from 'svg-charts';


class App extends Component {
  componentDidMount = () => {
    var data = {};
    fetch('https://prima-visual.herokuapp.com:443/country').then(res => {
      return res.json()
    }).then(res => {
      
      //Data is fully fetched
      console.log(res)
      var pieData = { values: [50, 20, 30], colors: ['#7BE17F', '#FD9133', '#EC4548'], radius: 48, stroke: 4 };
    const _icon = {
      url: 'data:image/svg+xml;charset=UTF-8,' + svgCharts().generatePieChartSVG(pieData.values, pieData.colors, pieData.radius, pieData.stroke)
    }
    google.charts.load('visualization', '1', { 'packages': ['geochart'] });
            google.charts.setOnLoadCallback(drawVisualization);
            function drawVisualization() {
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Country');
                data.addColumn('number', 'Resources');
                
                data.addRows([[{ v: 'USA', f: ' USA' }, 60]]);
                data.addRows([[{ v: 'Finland', f: 'Finland' }, 35]]);
                data.addRows([[{ v: 'Sweden', f: 'Sweden' }, 70]]);
                data.addRows([[{ v: 'China', f: 'China' }, 53]]);
                data.addRows([[{ v: 'Brazil', f: 'Brazil' }, 45]]);
                data.addRows([[{ v: 'Australia', f: 'Australia' }, 69]]);
                var regionOptions = {
                    legend: 'none',
                    width: "600",
                    height: "400",
                    displayMode: "regions",
                    colorAxis: {colors: ['yellow', 'green']}, // orange to blue
                    backgroundColor: '#343751',
                    sizeAxis: { minValue: 0, maxValue: 100, minSize: 5, maxSize: 15 },
                    region: 'world'
                };
                var chartRegion = new google.visualization.GeoChart(document.getElementById('regionMap'));
                chartRegion.draw(data, regionOptions);
                
            }
            google.charts.load('visualization', '1', { 'packages': ['geochart'] });
            google.charts.setOnLoadCallback(drawVisualizationMarker);
            function drawVisualizationMarker() {
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Country');
                data.addColumn('number', 'Resources');
                
                data.addRows([[{ v: 'USA', f: ' USA' }, 60]]);
                data.addRows([[{ v: 'Finland', f: 'Finland' }, 35]]);
                data.addRows([[{ v: 'Sweden', f: 'Sweden' }, 75]]);
                data.addRows([[{ v: 'China', f: 'China' }, 53]]);
                data.addRows([[{ v: 'Brazil', f: 'Brazil' }, 45]]);
                data.addRows([[{ v: 'Australia', f: 'Australia' }, 69]]);
                var markerOptions = {
                    legend: 'none',
                    width: "600",
                    height: "400",
                    defaultColor: "transparent",
                    backgroundColor: 'transparent', 
                    datalessRegionColor: 'transparent', 
                    defaultColor: 'transparent',
                    displayMode: "markers",
                    colorAxis: {colors: ['#e7711c', '#4374e0']}, // orange to blue
                    
                    sizeAxis: { minValue: 5, maxValue: 15, minSize: 5, maxSize: 15 },
                    region: 'world'
                };
                var chart = new google.visualization.GeoChart(document.getElementById('markerMap'));
                google.visualization.events.addListener(chart, 'ready', function () {
                    createMarkerImage("img1", _icon.url);
                    createMarkerImage("img2", _icon.url);
                    createMarkerImage("img3", _icon.url);
                    createMarkerImage("img4", _icon.url);
                    createMarkerImage("img5", _icon.url);
                    createMarkerImage("img6", _icon.url);
                    var list = document.getElementsByTagName('path');
                    //console.log(list);
                    document.getElementsByTagName('circle')[0].setAttribute("fill","url(#img1)");
                    document.getElementsByTagName('circle')[1].setAttribute("fill","url(#img2)");
                    document.getElementsByTagName('circle')[2].setAttribute("fill","url(#img3)");
                    document.getElementsByTagName('circle')[3].setAttribute("fill","url(#img4)");
                    document.getElementsByTagName('circle')[4].setAttribute("fill","url(#img5)");
                    document.getElementsByTagName('circle')[5].setAttribute("fill","url(#img6)");
                });
                
                chart.draw(data, markerOptions);
                
            }
            function createMarkerImage(id, url) {
                var patt = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
                patt.setAttribute('id', id);
                patt.setAttribute('width', '30');
                patt.setAttribute('height', '30');
                var image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
                image.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', url);
                image.setAttribute('width', '30');
                image.setAttribute('height', '30');
                var defs = document.getElementsByTagName('defs')[0];
                patt.appendChild(image);
                defs.appendChild(patt);
            }
    }).catch(e => console.log(e));

    console.log(google.charts);

    
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div id="regionMap"></div>
        <div id="markerMap"></div>
      </div>
    );
  }
}

export default App;
