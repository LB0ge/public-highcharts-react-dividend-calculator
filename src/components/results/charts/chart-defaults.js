import Highcharts from 'highcharts';
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
    credits: {
        enabled: false
    },
    tooltip: {
        valueDecimals: 0,
        valuePrefix: '$'
    },
    yAxis: {
        title: { text: '' }
    }
});
