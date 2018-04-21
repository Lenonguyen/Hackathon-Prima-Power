google.load('visualization', '1', { 'packages': ['geochart'] });
            google.setOnLoadCallback(drawVisualization);

            function drawVisualization() {
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Country');
                data.addColumn('number', 'Resources : ');
                
                data.addRows([[{ v: 'USA', f: ' HeadOffice' }, 15]]);
                data.addRows([[{ v: 'Finland', f: 'Branch' }, 15]]);
                var options = {
                    legend: 'none',
                    width: "600",
                    height: "400",
                    displayMode: 'markers',
                    sizeAxis: { minValue: 5, maxValue: 15, minSize: 5, maxSize: 15 },
                    region: 'world'
                };

                var chart = new google.visualization.GeoChart(document.getElementById('map'));
                google.visualization.events.addListener(chart, 'ready', function () {
                    createMarkerImage("img1", "http://upload.wikimedia.org/wikipedia/commons/e/e0/Us_flag_large_51_stars.png");
                    document.getElementsByTagName('circle')[0].setAttribute("fill", "url(#img1)");
                    createMarkerImage("img2", "http://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_India.png")
                    document.getElementsByTagName('circle')[1].setAttribute("fill", "url(#img2)");
                });
                chart.draw(data, options);
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