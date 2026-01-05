type Props = {
    [key: string]: any;
};

// Create a lightweight Series-like element that the Chart component can
// recognise. Highcharts React inspects child element `type` metadata such as
// `type === 'Series'` and `type._HCReact.HC_Option`. We provide those so the
// chart will treat this element as a series of type `bar`.
export default function BarSeries(_props: Props) {
    return null;
}

// Mark the element type so the Chart filter picks it up
(BarSeries as any).type = 'Series';
(BarSeries as any)._HCReact = {
    type: 'Series',
    HC_Option: 'series.bar',
    childOption: 'series.bar',
    defaultOptions: { type: 'bar' }
};
