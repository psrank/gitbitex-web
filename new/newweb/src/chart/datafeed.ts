import { StoreService } from "@/store/service";
import { SymbolSearchComponent, SymbolsStorage } from "@/chart/symbols";
import { DataPulseUpdater, QuotesPulseUpdater } from "@/chart/pulse-updaters";

const configJSON = {
  supports_search: true,
  supports_time: true,
  supports_timescale_marks: true,
  supports_group_request: false,
  supports_marks: false,
  supported_resolutions: ["1", "5", "15", "30", "60", "240", "1D", "1W"]
};

const symbolResolveJSON = {
  name: "BTC/USDT",
  timezone: "Asia/Shanghai",
  minmov: 1.5,
  minmov2: 1,
  pointvalue: 0.01,
  has_intraday: true,
  intraday_multipliers: ["1", "5", "15", "30", "60", "240", "1D", "1W"],
  has_daily: true,
  has_empty_bars: false,
  has_no_volume: false,
  has_weekly_and_monthly: true,
  description: "",
  type: "Index",
  supported_resolutions: ["1", "5", "15", "30", "60", "240", "1D", "1W"],
  pricescale: 0.1,
  ticker: "BTC/USDT"
};

export class UDFCompatibleDatafeed {
  productId: string;
  configuration: any;

  symbolSearch: any;
  symbolsStorage: any;
  barsPulseUpdater: DataPulseUpdater;
  quotesPulseUpdater: QuotesPulseUpdater;
  protocolVersion: number;

  enableLogging = false;
  initializationFinished = false;
  callbacks: any = {};
  history: any[] = [];
  resolution = "0";
  historyLoading = false;

  constructor(
    productId: string,
    updateFrequency: number,
    protocolVersion: number
  ) {
    this.productId = productId;
    this.barsPulseUpdater = new DataPulseUpdater(
      this,
      updateFrequency || 1000 * 10
    );
    // Trading terminal
    this.quotesPulseUpdater = new QuotesPulseUpdater(this);
    this.protocolVersion = protocolVersion || 2;

    this.initialize();
  }

  defaultConfiguration() {
    return {
      supports_search: false,
      supports_group_request: true,
      supported_resolutions: ["1", "5", "15", "30", "60", "1D"],
      supports_marks: false,
      supports_timescale_marks: false
    };
  }

  getServerTime(callback: (time: number) => void) {
    callback(new Date().getTime());
  }

  on(event: any, callback: any) {
    Object.prototype.hasOwnProperty.call(this.callbacks, event) ||
      (this.callbacks[event] = []);
    this.callbacks[event].push(callback);
    return this;
  }

  fireEvent(event: any, argument?: any) {
    if (Object.prototype.hasOwnProperty.call(this.callbacks, event)) {
      const callbacksChain = this.callbacks[event];
      for (let i = 0; i < callbacksChain.length; ++i) {
        callbacksChain[i](argument);
      }
      this.callbacks[event] = [];
    }
  }

  onInitialized() {
    this.initializationFinished = true;
    this.fireEvent("initialized");
  }

  logMessage(message: string) {
    if (this.enableLogging) {
      const now = new Date();
    }
  }

  initialize() {
    this.setupWithConfiguration(configJSON);
  }

  onReady(callback: any) {
    if (this.configuration) {
      callback(this.configuration);
    } else {
      this.on("configuration_ready", () => {
        callback(this.configuration);
      });
    }
  }

  setupWithConfiguration(configurationData: any) {
    this.configuration = configurationData;

    if (!configurationData.exchanges) {
      configurationData.exchanges = [];
    }

    //	@obsolete; remove in 1.5
    const supportedResolutions =
      configurationData.supported_resolutions ||
      configurationData.supportedResolutions;
    configurationData.supported_resolutions = supportedResolutions;

    //	@obsolete; remove in 1.5
    const symbolsTypes =
      configurationData.symbols_types || configurationData.symbolsTypes;
    configurationData.symbols_types = symbolsTypes;

    if (
      !configurationData.supports_search &&
      !configurationData.supports_group_request
    ) {
      throw "Unsupported datafeed configuration. Must either support search, or support group request";
    }

    if (!configurationData.supports_search) {
      this.symbolSearch = new SymbolSearchComponent(this);
    }

    if (configurationData.supports_group_request) {
      this.symbolsStorage = new SymbolsStorage(this);
    } else {
      this.onInitialized();
    }

    this.fireEvent("configuration_ready");
    this.logMessage(`Initialized with ${JSON.stringify(configurationData)}`);
  }

  getMarks(
    symbolInfo: any,
    rangeStart: any,
    rangeEnd: any,
    onDataCallback: any,
    resolution: any
  ) {
    // console.log('getMarks rangeStart ->', rangeStart);
    // console.log('getMarks rangeEnd ->', rangeEnd);
    onDataCallback([]);
    /*   if (this._configuration.supports_marks) {
        this._send(this._datafeedURL + "/marks", {
          symbol: symbolInfo.ticker.toUpperCase(),
          from: rangeStart,
          to: rangeEnd,
          resolution: resolution
        })
          .done(function (response) {
            // console.log('getMarks ->', response);
            onDataCallback(JSON.parse(response));
          })
          .fail(function () {
            onDataCallback([]);
          });
      } */
  }

  // The chart library calls this function to get the time scale mark of the visible candlestick range. The chart expects you to call getTimescaleMarks once per call onDataCallback。
  getTimescaleMarks(
    symbolInfo: any,
    rangeStart: any,
    rangeEnd: any,
    onDataCallback: any,
    resolution: any
  ) {
    // console.log('getTimescaleMarks rangeStart->', rangeStart);
    // console.log('getTimescaleMarks rangeEnd->', rangeEnd);
    onDataCallback([]);

    /*   if (this._configuration.supports_timescale_marks) {
        this._send(this._datafeedURL + "/timescale_marks", {
          symbol: symbolInfo.ticker.toUpperCase(),
          from: rangeStart,
          to: rangeEnd,
          resolution: resolution
        })
          .done(function (response) {
            // console.log('getTimescaleMarks response ->', response);
            onDataCallback(JSON.parse(response));
          })
          .fail(function () {
            onDataCallback([]);
          });
      } */
  }

  // Provide a list of products that match the user's search
  searchSymbolsByName = function(
    ticker: any,
    exchange: any,
    type: any,
    onResultReadyCallback: any
  ) {
    onResultReadyCallback([]);
    return;
  };

  // Get historical candlestick data by date range. The chart library hopes to receive all request history through onDataCallback only once. Instead of being called multiple times.
  getBars(
    symbolInfo: any,
    resolution: any,
    rangeStartDate: any,
    rangeEndDate: any,
    onDataCallback: any,
    onErrorCallback: any
  ) {
    const meta = { version: 1.0, noData: false };

    if (this.resolution == "0") {
      this.resolution = resolution;
      return;
    }

    const second = this.barsPulseUpdater.periodLengthSeconds(resolution);

    const returnBars = () => {
      const history: any[] = [];

      StoreService.Trade.getObject(this.productId).history.forEach(
        (item: any, index: number) => {
          history.push({
            time: item[0],
            close: item[4],
            open: item[3],
            high: item[2],
            low: item[1],
            volume: item[5]
          });
        }
      );
      history.reverse();

      return history;
    };

    let _history = returnBars();

    if (this.resolution != resolution) {
      this.resolution = resolution;
      _history = [];
    }

    if (_history.length > 0) {
      onDataCallback(_history, meta);
      return;
    }

    this.resolution = resolution;
    this.historyLoading = true;

    StoreService.Trade.loadProductHistory(this.productId, second, () => {
      onDataCallback(returnBars(), meta);
    });
  }

  // Subscribe to K-line data. The chart library will call the onRealtimeCallback method to update the real-time data.
  subscribeBars(
    symbolInfo: any,
    resolution: any,
    onRealtimeCallback: any,
    listenerGUID: any,
    onResetCacheNeededCallback: any
  ) {
    (window as any).hasWsMessage = "";
    this.barsPulseUpdater.subscribeDataListener(
      symbolInfo,
      resolution,
      onRealtimeCallback,
      listenerGUID
    );
  }

  // Cancel subscription to K-line data. When calling the subscriberBars method, the chart library will skip objects with the same subscriberUID.
  unsubscribeBars(listenerGUID: any) {
    this.barsPulseUpdater.unsubscribeDataListener(listenerGUID);
  }

  // The chart library will call this function when it wants to request some historical data, allowing you to cover the required historical depth.
  calculateHistoryDepth(period: any, resolutionBack: any, intervalBack: any) {
    return;
  }

  // -------------------- Exclusive to trading terminals -----------------------------

  // This function is called when the chart needs quote data. The chart library expects onDataCallback to be called when all requested data is received.
  getQuotes(symbols: any, onDataCallback: any, onErrorCallback: any) {
    // this._send(`${this._datafeedURL}/quotes`, { symbols })
    // .done((response) => {
    //     const data = JSON.parse(response);
    //     if (data.s == 'ok') {
    //     //	JSON format is {s: "status", [{s: "symbol_status", n: "symbol_name", v: {"field1": "value1", "field2": "value2", ..., "fieldN": "valueN"}}]}
    //     if (onDataCallback) {
    //         onDataCallback(data.d);
    //     }
    //     } else if (onErrorCallback) {
    //     onErrorCallback(data.errmsg);
    //     }
    // })
    // .fail((arg) => {
    //     if (onErrorCallback) {
    //     onErrorCallback(`network error: ${arg}`);
    //     }
    // });
  }

  // The trading terminal calls this function when it needs to receive real-time quotes for commodities. The chart expects that onRealtimeCallback will be called every time you want to update the quote.
  subscribeQuotes(
    symbols: any,
    fastSymbols: any,
    onRealtimeCallback: any,
    listenerGUID: any
  ) {
    this.quotesPulseUpdater.subscribeDataListener(
      symbols,
      fastSymbols,
      onRealtimeCallback,
      listenerGUID
    );
  }

  // The trading terminal calls this function when it no longer needs to receive real-time quotes for commodities. The chart library will skip the subscribeQuotes method when it encounters the same object as the listenerGUID.
  unsubscribeQuotes(listenerGUID: any) {
    this.quotesPulseUpdater.unsubscribeDataListener(listenerGUID);
  }

  // Analyze product information by product name
  resolveSymbol(
    symbolName: string,
    onSymbolResolvedCallback: any,
    onResolveErrorCallback: any
  ) {
    setTimeout(() => {
      if (!this.initializationFinished) {
        this.on("initialized", () => {
          this.resolveSymbol(
            symbolName,
            onSymbolResolvedCallback,
            onResolveErrorCallback
          );
        });
        return;
      }

      const resolveRequestStartTime = Date.now();
      this.logMessage("Resolve requested");

      const onResultReady = (data: any) => {
        const postProcessedData = data;
        // if (this.postProcessSymbolInfo) {
        //     postProcessedData = this.postProcessSymbolInfo(postProcessedData);
        // }

        this.logMessage(
          `Symbol resolved: ${Date.now() - resolveRequestStartTime}`
        );
        onSymbolResolvedCallback(postProcessedData);
      };

      if (!this.configuration.supports_group_request) {
        onResultReady(symbolResolveJSON);
      } else if (this.initializationFinished) {
        this.symbolsStorage.resolveSymbol(
          symbolName,
          onResultReady,
          onResolveErrorCallback
        );
      } else {
        this.on("initialized", () => {
          this.symbolsStorage.resolveSymbol(
            symbolName,
            onResultReady,
            onResolveErrorCallback
          );
        });
      }
    });
  }
}
