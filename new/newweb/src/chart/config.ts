// Copyright 2019 GitBitEx.com
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

export function getTradingViewConfig(containerId: string, datafeed: any) {
  return {
    fullscreen: false,
    container_id: containerId,
    datafeed: datafeed,
    library_path: "assets/charting-library/",
    locale: "zh",
    debug: false,
    type: "bitcoin",
    style: "2",
    disabled_features: [
      "save_chart_properties_to_local_storage",
      "volume_force_overlay",
      "left_toolbar",
      "header_saveload",
      "header_fullscreen_button",
      "header_undo_redo",
      "header_indicators",
      "header_compare",
      "header_symbol_search",
      "legend_context_menu",
      "timeframes_toolbar",
      "display_market_status",
      "edit_buttons_in_legend",
      "dont_show_boolean_study_arguments",
      "header_screenshot",
      "header_settings",
      "control_bar",
      "volume_force_overlay",
      //"create_volume_indicator_by_default",
      "timezone_menu"
    ],
    enabled_features: ["hide_last_na_study_output", "move_logo_to_main_pane"],
    width: "100%",
    height: "100%",
    timezone: "Asia/Shanghai",
    overrides: {
      "symbolWatermarkProperties.color": "rgba(0,0,0, 0)",
      "paneProperties.background": "#15232c",
      //"paneProperties.vertGridProperties.color": "#15232c",
      //"paneProperties.horzGridProperties.color": "#15232c",
      "paneProperties.vertGridProperties.color": "rgba(255,255,255,0.05)",
      "paneProperties.horzGridProperties.color": "rgba(255,255,255,0.05)",
      //"paneProperties.crossHairProperties.color": "#f6fa03",
      // "paneProperties.crossHairProperties.style": 3,
      "mainSeriesProperties.style": 1,
      // "mainSeriesProperties.showCountdown": false,
      // "scalesProperties.showSeriesLastValue": false,
      //  "mainSeriesProperties.visible": false,
      // "mainSeriesProperties.showPriceLine": false,
      //"mainSeriesProperties.priceLineWidth": 1,
      //"mainSeriesProperties.lockScale": true,
      // "mainSeriesProperties.minTick": "default",
      // "mainSeriesProperties.extendedHours": false,
      volumePaneSize: "medium",
      // editorFontsList: ["Lato", "Arial", "Verdana", "Courier New", "Times New Roman"],
      "paneProperties.topMargin": 15,
      "paneProperties.bottomMargin": 20,
      // "paneProperties.leftAxisProperties.autoScale": true,
      // "paneProperties.leftAxisProperties.autoScaleDisabled": false,
      // "paneProperties.leftAxisProperties.percentage": false,
      // "paneProperties.leftAxisProperties.percentageDisabled": false,
      // "paneProperties.leftAxisProperties.log": false,
      // "paneProperties.leftAxisProperties.logDisabled": false,
      // "paneProperties.leftAxisProperties.alignLabels": true,
      "paneProperties.legendProperties.showStudyArguments": false,
      "paneProperties.legendProperties.showStudyTitles": false,
      "paneProperties.legendProperties.showStudyValues": false,
      "paneProperties.legendProperties.showSeriesTitle": false,
      //"paneProperties.legendProperties.showSeriesOHLC": false,
      // "scalesProperties.showLeftScale": false,
      // "scalesProperties.showRightScale": false,
      // "scalesProperties.backgroundColor": "#20334d",
      "scalesProperties.lineColor": "rgba(255,255,255, 0.2)",
      "scalesProperties.textColor": "#CCCCCC",
      "scalesProperties.scaleSeriesOnly": false,
      "mainSeriesProperties.priceAxisProperties.autoScale": true,
      "mainSeriesProperties.priceAxisProperties.autoScaleDisabled": false,
      "mainSeriesProperties.priceAxisProperties.percentage": false,
      "mainSeriesProperties.priceAxisProperties.percentageDisabled": true,
      "mainSeriesProperties.priceAxisProperties.log": false,
      "mainSeriesProperties.priceAxisProperties.logDisabled": false,
      "mainSeriesProperties.candleStyle.upColor": "#15232c",
      "mainSeriesProperties.candleStyle.downColor": "rgba(230,99,64, 0.9)",
      // "mainSeriesProperties.candleStyle.drawWick": true,
      // "mainSeriesProperties.candleStyle.drawBorder": true,
      //"mainSeriesProperties.candleStyle.borderColor": "#f6fa03",
      "mainSeriesProperties.candleStyle.borderUpColor": "rgba(99,177,89, 0.9)",
      "mainSeriesProperties.candleStyle.borderDownColor":
        "rgba(230,99,64, 0.9)",
      //"mainSeriesProperties.candleStyle.wickColor": "#f6fa03",
      "mainSeriesProperties.candleStyle.wickUpColor": "#5AB746",
      "mainSeriesProperties.candleStyle.wickDownColor": "rgba(230,99,64, 0.9)",
      // "mainSeriesProperties.candleStyle.barColorsOnPrevClose": false,
      "mainSeriesProperties.hollowCandleStyle.upColor": "#5AB746",
      "mainSeriesProperties.hollowCandleStyle.downColor": "#FB522C",
      // "mainSeriesProperties.hollowCandleStyle.drawWick": true,
      // "mainSeriesProperties.hollowCandleStyle.drawBorder": true,
      "mainSeriesProperties.hollowCandleStyle.borderColor": "#5AB746",
      "mainSeriesProperties.hollowCandleStyle.borderUpColor": "#5AB746",
      "mainSeriesProperties.hollowCandleStyle.borderDownColor": "#FB522C",
      // "mainSeriesProperties.hollowCandleStyle.wickColor": "#737375",
      "mainSeriesProperties.hollowCandleStyle.wickUpColor": "#5AB746",
      "mainSeriesProperties.hollowCandleStyle.wickDownColor": "#FB522C",
      "mainSeriesProperties.haStyle.upColor": "#5AB746",
      "mainSeriesProperties.haStyle.downColor": "#FB522C",
      // "mainSeriesProperties.haStyle.drawWick": true,
      // "mainSeriesProperties.haStyle.drawBorder": true,
      // "mainSeriesProperties.haStyle.borderColor": "#3fcfb4",
      "mainSeriesProperties.haStyle.borderUpColor": "#5AB746",
      "mainSeriesProperties.haStyle.borderDownColor": "#FB522C",
      // "mainSeriesProperties.haStyle.wickColor": "#737375",
      "mainSeriesProperties.haStyle.wickUpColor": "#5AB746",
      "mainSeriesProperties.haStyle.wickDownColor": "#FB522C",
      // "mainSeriesProperties.haStyle.barColorsOnPrevClose": false,
      "mainSeriesProperties.barStyle.upColor": "#5AB746",
      "mainSeriesProperties.barStyle.downColor": "#FB522C"
    },
    studies_overrides: {
      "volume.volume.color.0": "#5AB746",
      "volume.volume.color.1": "#FB522C",
      "volume.volume.transparency": 70,
      "volume.show ma": false
    }
  };
}
