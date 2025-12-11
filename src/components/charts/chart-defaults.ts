import Highcharts from 'highcharts/highcharts.src';
import 'highcharts/modules/accessibility';
import 'highcharts/highcharts-more';

// Global Chart Defaults
Highcharts.setOptions({
    chart: {
        backgroundColor: 'transparent'
        // style: { fontFamily: 'Roboto, sans-serif' }
    },
    title: {
        text: ''
    },
    colors: [
        '#5B7BF5',
        '#707AA0',
        '#88A070',
        '#F57E5B',
        '#A7F55B',
        '#424B39',
        '#666975',
        '#A07B70',
        '#96A809',
        '#263F11'
    ],
    tooltip: {
        valueDecimals: 0
    }
});

export default Highcharts;
