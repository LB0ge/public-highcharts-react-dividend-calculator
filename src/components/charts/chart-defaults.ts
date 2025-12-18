import Highcharts from 'highcharts/highcharts.src';
import 'highcharts/modules/accessibility';
import 'highcharts/highcharts-more';

// Global Chart Defaults
Highcharts.setOptions({
    chart: {
        backgroundColor: 'transparent'
    },
    title: {
        text: ''
    },
    tooltip: {
        valueDecimals: 0
    }
});

export default Highcharts;
