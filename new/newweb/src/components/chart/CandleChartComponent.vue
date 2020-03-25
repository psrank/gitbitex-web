<template lang="jade">
    div.chart.panel.chart-candle
        div.chart-menu
            v-select(:options='rangeNameOptions', v-model='rangeNameSelected')
            v-select(:options='chartTypeOptions', v-model='chartTypeSelected')
        div.chart-hover-point
            div.inner(v-show='overPoint[1] > 0')
                span T={{overPoint[0]}}
                span O={{overPoint[1]}}
                span H={{overPoint[2]}}
                span L={{overPoint[3]}}
                span C={{overPoint[4]}}
                span V={{overPoint[5]}}
        div.chart-container(ref='chart')
        div.chart-loading(v-if='loading')
            span.loading-spinner

</template>

<script lang="ts">
import { Chart, Moment } from "@/vendor";
import { Constant } from "@/constant";
import { DomWatch } from "@/watch";
import { StoreService } from "@/store/service";
//import {Dom, Prop, Watch} from "../component";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

//@Dom('chart-candle', require('./candle/candle.jade')())
@Component
export default class CandleChartComponent extends Vue {
  @Prop()
  productId!: string;

  chart: any;
  updateInterval: any;
  aggregationIndex = 4;
  priceScale = 0;
  nativeScale = 0;
  scaleUpBtnEnable = true;
  scaleDownBtnEnable = true;
  price = "";
  chartDom!: HTMLDivElement;
  loading = true;
  stopUpdate = false;

  range: any;
  rangeNameOptions: string[] = [];
  ranges!: any[];
  rangeNameSelected = 0;
  chartType = "";
  chartTypeOptions: any[] = [];
  chartTypes!: string[];
  chartTypeSelected = 0;
  history: any[] = [];
  points: any[] = [];
  overPoint: any = [0, 0, 0, 0, 0, 0];

  created() {
    this.chartTypeOptions = ["candle", "line"];
    this.rangeNameOptions = ["1m", "5m", "15m", "30m", "1h", "6h", "1d"];
    this.ranges = [
      {
        type: "minute",
        count: 1,
        granularity: 60
      },
      {
        type: "minute",
        count: 5,
        granularity: 60 * 5
      },
      {
        type: "minute",
        count: 15,
        granularity: 60 * 15
      },
      {
        type: "minute",
        count: 30,
        granularity: 60 * 30
      },
      {
        type: "hour",
        count: 1,
        granularity: 60 * 60
      },
      {
        type: "hour",
        count: 6,
        granularity: 60 * 60 * 6
      },
      {
        type: "day",
        count: 1,
        granularity: 60 * 60 * 24
      }
    ];
    this.range = this.ranges[this.rangeNameSelected];
  }

  mounted() {
    //super.mounted();
    this.nativeScale = Number(
      Math.pow(0.1, this.product.quoteScale).toFixed(this.product.quoteScale)
    );
    this.priceScale =
      this.nativeScale * Constant.AGGREGATION[this.aggregationIndex];
    this.chartDom = this.$refs.chart as HTMLDivElement;
    DomWatch.visibleChange(this.chartDom, (state: boolean) => {
      this.stopUpdate = state;
      if (state) {
        this.chart || this.chartInit();
      }
    });
  }

  get product() {
    return this.object.product;
  }

  get object() {
    return StoreService.Trade.getObject(this.productId);
  }

  get orderBook() {
    return this.object.orderBook;
  }

  @Watch("rangeNameSelected")
  onRangeNameSelected() {
    this.chartInit();
  }

  @Watch("chartTypeSelected")
  onChartTypeSelected() {
    this.chartInit();
  }

  chartInit() {
    clearInterval(this.updateInterval);
    this.loading = true;

    const bgColor = "#15232c";

    Chart.setOptions({
      global: {
        useUTC: false
      }
    });

    this.range = this.ranges[this.rangeNameSelected];
    this.chart = Chart.stockChart(this.chartDom, {
      chart: {
        margin: [-40, 0, 30, 0],
        backgroundColor: bgColor,
        animation: false,
        panning: true
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      title: {
        text: null
      },
      tooltip: {
        enabled: false,
        followTouchMove: false
      },
      scrollbar: {
        enabled: false
      },
      navigator: {
        enabled: false
      },
      rangeSelector: {
        buttons: [
          {
            type: this.range.type,
            count: this.range.count,
            text: "1"
          },
          {
            type: this.range.type,
            count: this.range.count * 60,
            text: "2"
          },
          {
            type: "all",
            count: 1,
            text: "All"
          }
        ],
        selected: 1,
        inputEnabled: false
      },
      series: [this.series()[this.chartTypeSelected]].concat([
        {
          type: "ema",
          name: "EMA (12)",
          linkedTo: "candle",
          color: "#7f8b9e",
          lineWidth: 1,
          marker: {
            enabled: false
          },
          states: {
            hover: {
              enabled: false
            }
          },
          params: {
            period: 12
          },
          zIndex: 1
        },
        {
          type: "ema",
          name: "EMA (26)",
          linkedTo: "candle",
          color: "#e98e39",
          lineWidth: 1,
          marker: {
            enabled: false
          },
          states: {
            hover: {
              enabled: false
            }
          },
          params: {
            period: 26
          },
          zIndex: 2
        },
        {
          type: "column",
          data: [],
          yAxis: 1,
          color: "rgba(255, 255, 255, .05)",
          pointWidth: 4
        }
      ]),
      xAxis: {
        lineColor: "#293741",
        tickColor: "#293741",
        tickLength: 5,
        labels: {
          style: { color: "rgba(255, 255, 255, .7)" }
        },
        gridLineColor: "rgba(255, 255, 255, .05)",
        gridLineWidth: 1,
        crosshair: {
          width: 4,
          color: "rgba(255, 255, 255, .05)"
        }
      },
      yAxis: [
        {
          height: "90%",
          resize: {
            enabled: true
          },
          lineWidth: 0,
          offset: -3,
          labels: {
            style: {
              color: "rgba(255, 255, 255, .7)",
              align: "left",
              width: 100
            }
          },
          gridLineColor: "rgba(255, 255, 255, .05)"
        },
        {
          top: "80%",
          height: "20%",
          offset: 0,
          lineWidth: 1,
          labels: {
            enabled: false
          },
          gridLineWidth: 0
        }
      ],
      plotOptions: {
        series: {
          point: {
            events: {
              mouseOver: (event: any) => {
                this.overPoint = Object.assign({}, this.points[event.target.x]);
                this.overPoint[0] = Moment(event.target.x).format(
                  "YYYY-MM-DD HH:mm:ss"
                );
              }
            }
          },
          states: {
            inactive: {
              opacity: 1
            }
          }
        }
      }
    });

    StoreService.Trade.loadProductHistory(
      this.productId,
      this.range.granularity,
      () => {
        this.updateInterval = setInterval(() => {
          this.updateData();
        }, 1000);
        this.updateData();
        this.overPoint = Object.assign(
          {},
          this.history[this.history.length - 1]
        );
        this.overPoint[0] = Moment(this.overPoint[0]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
    );

    this.chart.reflow();
  }

  updateData() {
    const volumes: any[] = [];

    this.history = [];

    StoreService.Trade.getObject(this.productId).history.forEach(
      (item: any, index: number) => {
        let lastRecord = this.history[this.history.length - 1];

        // 自动补齐
        while (
          lastRecord &&
          lastRecord[0] / 1000 - item[0] > this.range.granularity
        ) {
          const speed = this.range.granularity * 1000,
            point = [
              lastRecord[0] - speed,
              lastRecord[4],
              lastRecord[4],
              lastRecord[4],
              lastRecord[4],
              0
            ];

          this.history.push(point);
          this.points[point[0]] = point;

          lastRecord = this.history[this.history.length - 1];
        }

        const point = [
          item[0] * 1000,
          item[3],
          item[2],
          item[1],
          item[4],
          Number(item[5].toFixed(4))
        ];

        this.history.push(point);
        this.points[point[0]] = point;

        volumes.push([item[0] * 1000, item[5]]);
      }
    );

    this.history.reverse();

    volumes.reverse();

    let lastTime = volumes[volumes.length - 1][0];
    for (let i = 0; i < 7; i++) {
      volumes.push([lastTime + i * this.range.granularity * 1000, null]);
    }
    this.chart.update({
      series: [
        { animation: false, data: this.history },
        {},
        {},
        { animation: false, data: volumes }
      ]
    });

    lastTime = volumes[volumes.length - 1][0];
    if (
      lastTime - this.chart.xAxis[0].max <
      5 * this.range.granularity * 1000
    ) {
      const first = Math.max(
        volumes.length - Math.floor(this.chart.chartWidth * 0.101),
        0
      );
      this.chart.xAxis[0].setExtremes(volumes[first][0], lastTime);
    }

    this.loading = false;
  }

  series(): any {
    return [
      {
        id: "candle",
        name: this.product.id,
        type: "candlestick",
        data: [],
        tooltip: {
          valueDecimals: 2
        },
        upColor: "#40b86c",
        upLineColor: "#40b86c",
        color: "#e86339",
        lineColor: "#e86339",
        pointWidth: 4,
        zIndex: 4
      },
      {
        name: this.product.id,
        type: "area",
        data: [],
        tooltip: {
          valueDecimals: 2
        },
        color: "#2f73c5",
        lineColor: "#2f73c5",
        id: "candle",
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, "#2f73c5"],
            [1, "rgba(0,0,0,0)"]
          ]
        },
        threshold: null
      }
    ];
  }

  destroyed() {
    clearInterval(this.updateInterval);
  }
}
</script>
