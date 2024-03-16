import { realtimeChartFilters } from '@constants';

export const TotalUsersDonutChartOptions = (title: string): any => ({
  chart: {
    type: 'donut',
    width: 414,
  },
  labels: ['Active', 'Inactive'],
  plotOptions: {
    pie: {
      expandOnClick: false,
      donut: {
        size: '85%',
        labels: {
          show: true,

          name: {
            show: true,
            fontSize: '12px',
            fontWeight: '400',
            color: '#6E7191',
          },
          value: {
            show: true,
            fontSize: '22px',
            fontWeight: '600',
            color: '#2E285C',
          },
          total: {
            show: true,
            color: '#BCC1C8',
            fontWeight: 600,
          },
        },
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 370,
      options: {
        legend: {
          show: false,
        },
        title: {
          show: false,
          style: {
            fontSize: '0px',
          },
        },
      },
    },
  ],
  legend: {
    position: 'left',
    offsetY: 62,
    fontSize: '16px',
    fontFamily: 'Poppins',
    formatter: function (
      val: string,
      opts: {
        w: { globals: { series: { [x: string]: string } } };
        seriesIndex: string | number;
      },
    ) {
      return (
        '<span style="color: #2E285C;font-family: Poppins;font-weight: 400;font-size: 16px;">' +
        val +
        '</span>' +
        '<span style="font-weight: 500;font-size: 16px;color: #2E285C;margin-left: 10px;">' +
        opts.w.globals.series[opts.seriesIndex] +
        '</span>'
      );
    },
  },
  colors: ['#645CAA', '#BFACE0'],
  title: {
    text: title,
    align: 'left',
    floating: true,
    style: {
      fontSize: '36px',
      fontWeight: '500',
      color: '#2E285C',
    },
  },
});
export const VerificationStatusRadialChartOptions = (total:any): any => ({
  chart: {
    height: 350,
    type: 'radialBar',
  },
  plotOptions: {
    radialBar: {
      startAngle: -180,
      endAngle: 180,
      dataLabels: {
        name: {
          color: '#5A5A89',
          fontWeight: 600,
          fontSize: '18.6464px',
          fontFamily: 'Poppins',
          offsetY: -10,
        },
        value: {
          fontSize: '47.948px',
          fontFamily: 'Poppins',
          fontWeight: 500,
          color: '#2E285C',
          
          formatter: function (w: any) {
            return `${((w * total!) / 100).toFixed(0)}`;
          },
        },
        total: {
          show: true,
          label: 'TOTAL', 
          formatter: function () {
            return `${total!}`;
          },
        },
      },
    },
  },
  responsive: [
    {
      breakpoint: 400,
      options: {
        chart: {
          width: 350,
        },
      },
    },
    {
      breakpoint: 540,
      options: {
        legend: {
          show: false,
        },
      },
    },
    {
      breakpoint: 720,
      options: {
        legend: {
          itemMargin: {
            vertical: 5,
          },
          formatter: function (
            val: string,
            opts: {
              w: { globals: { series: { [x: string]: string } } };
              seriesIndex: string | number;
            },
          ) {
            return (
              '<span style="color: #2E285C;font-family: Poppins;font-weight: 400;font-size: 14px;">' +
              val +
              '</span><br/>' +
              '<span style="font-weight: 500;font-size: 16px;color: #2E285C;margin-left: 20px; }">' +
              opts.w.globals.series[opts.seriesIndex] +
              '</span>'
            );
          },
        },
      },
    },
  ],
  legend: {
    show: true,
    position: 'left',
    formatter: function (val: any, opts: any) {
      return (
        '<span style="color: #2E285C;font-family: Poppins;font-weight: 400;font-size: 16px;">' +
        val +
        '</span><br/>' +
        '<span style="font-weight: 500;font-size: 28px;color: #2E285C;margin-left: 20px; }">' +
        ((opts.w.globals.series[opts.seriesIndex] * total!) / 100).toFixed(0) +
        '</span>'
      );
    },
    fontSize: '16px',
    itemMargin: {
      vertical: 20,
    },
    fontFamily: 'Poppins',
  },
  stroke: {
    lineCap: 'round',
    width: 10,
  },
  colors: ['#A66FEA', '#695DFB', '#0BAB52', '#BFACE0', '#F8E334', '#FF624E'],
  labels: [
    'Started',
    'Abandoned',
    'Approved',
    'Not Started',
    'Expired',
    'Declined',
  ],
});
export const VerifiedDocumentBarChartOptions = (
  item: string | undefined,labelsArray:any
): any => ({
  chart: {
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '70%',
      borderRadiusApplication: 'end',
      borderRadius: 5,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 5,
    colors: ['transparent'],
  },
  xaxis: {
    categories: item === 'Monthly' ? labelsArray  : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisTicks: {
      show: false,
    },
    labels: {
      style: {
        fontSize: '14px',
        fontFamily: 'Poppins',
      },
    },
  },
  yaxis: {
    tickAmount: 4,
    decimalsInFloat: 0,
    forceNiceScale: true,
    max: (max:any) => {
      return max + 3.999; 
    },
    labels: {
      style: {
        fontSize: '14px',
        fontFamily: 'Poppins',
      },
    },
  },
  fill: {
    opacity: 1,
  },
  responsive: [
    {
      breakpoint: 1900,
      options: {
        stroke: {
          width: 1,
        },
        plotOptions: {
          bar: {
            columnWidth: '50%',
          },
        },
      },
    },
    {
      breakpoint: 1000,

      options: {
        chart: {
          width: 890,
        },
        stroke: {
          width: 1,
        },
      },
    },
  ],
  legend: {
    fontSize: '16px',
    fontFamily: 'Poppins',
    labels: {
      colors: '#6E7191',
    },
    itemMargin: {
      horizontal: 10,
    },
  },
  colors: ['#FDAA11', '#645CAA', '#BFACE0', '#A084CA'],
  tooltip: {
    y: {
      formatter: function (val: any) {
        return val === 0.001 ? 0 + ' Documents' : val + ' Documents';
      },
    },
  },
});
export const SimpleLineChartOptions = (
  color: string,max:number
): ApexCharts.ApexOptions => ({
  chart: {
    height: 350,
    type: 'line',
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 0,
    hover: {
      sizeOffset: 0,
    },
  },
  stroke: {
    curve: 'smooth',
    width: 2,
  },
  xaxis: {
    labels: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    max: max,
    labels: {
      show: false,
    },
  },
  tooltip: {
    enabled: false,
  },
  colors: [color],
});
export const realTimeChartOptions = (item: string,labelsArray:any): ApexCharts.ApexOptions => ({
  chart: {
    id: 'realtime',
    height: 350,
    type: 'line',
    animations: {
      enabled: true,
      easing: 'easein',
      dynamicAnimation: {
        speed: 500,
      },
    },
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  stroke: {
    curve: 'smooth',
  },
  grid: {
    borderColor: '#E3E3EC',
    strokeDashArray: 5,
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  xaxis: {
    categories: labelsArray ? labelsArray : realtimeChartFilters[item],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      style: {
        fontSize: '14px',
        fontFamily: 'Poppins',
        colors: '#6E7191',
      },
    },
  },
  yaxis: {
    forceNiceScale: true,
    max: (max:any) => {
      return max + 4; 
    },
    labels: {
      formatter: (value: any) => {
        return value.toFixed(0);
      },
      style: {
        fontSize: '14px',
        fontFamily: 'Poppins',
        colors: '#6E7191',
      },
    },
  },
  legend: {
    show: true,
    fontSize: '16px',
    fontFamily: 'Poppins',
    labels: {
      colors: '#6E7191',
    },
    markers: {
      width: 13,
      height: 13,
      radius: 0,
      fillColors: ['#20BA64', '#FF624E'],
    },
  },
  colors: ['#20BA64', '#FF624E'],
});
