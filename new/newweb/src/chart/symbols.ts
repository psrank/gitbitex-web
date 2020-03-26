export class SymbolsStorage {
  datafeed: any;

  exchangesList = ["AAPL", "NYSE", "FOREX", "AMEX"];
  exchangesWaitingForData = {};
  exchangesDataCache = {};

  symbolsInfo = {};
  symbolsList: any = [];

  constructor(datafeed: any) {
    this.datafeed = datafeed;
    this.requestFullSymbolsList();
  }

  // Set product collection information
  requestFullSymbolsList() {
    for (let i = 0; i < this.exchangesList.length; ++i) {
      const exchange = this.exchangesList[i];

      if (
        Object.prototype.hasOwnProperty.call(this.exchangesDataCache, exchange)
      ) {
        continue;
      }

      //TODO: fix later
      // this.exchangesDataCache[exchange] = true;
      // this.exchangesWaitingForData[exchange] = "waiting_for_data";

      const response = {
        symbol: ["AAPL", "NYSE", "FOREX", "AMEX"],
        description: ["AAPL Inc", "NYSE corp", "FOREX index", "AMEX index"],
        "exchange-listed": "NYSE",
        "exchange-traded": "NYSE",
        minmov: 1,
        minmov2: 0,
        pricescale: [1, 1, 100],
        "has-dwm": true,
        "has-intraday": true,
        "has-no-volume": [false, false, true, false],
        type: ["stock", "stock", "index", "index"],
        ticker: ["AAPL~0", "MSFT~0", "$SPX500"],
        timezone: "Asia/Shanghai",
        "session-regular": "0900-1600"
      };

      // console.log('response ->', response);

      this.onExchangeDataReceived(exchange, response);
      this.onAnyExchangeResponseReceived(exchange);

      /*     this._datafeed._send(this._datafeed._datafeedURL + "/symbol_info", {
                      group: exchange
                  })
                      .done(function (exchange) {

                      return function (response) {
                          that._onExchangeDataReceived(exchange, JSON.parse(response));
                          that._onAnyExchangeResponseReceived(exchange);
                      };
                      }(exchange)) //jshint ignore:line
                      .fail(function (exchange) {
                      return function (reason) {
                          that._onAnyExchangeResponseReceived(exchange);
                      };
                      }(exchange)); //jshint ignore:line
              */
    }
  }

  onExchangeDataReceived = (exchangeName: string, data: any) => {
    const tableField = (data: any, name: string, index: number) => {
      return data[name] instanceof Array ? data[name][index] : data[name];
    };

    for (let symbolIndex = 0; symbolIndex < data.symbol.length; ++symbolIndex) {
      try {
        const symbolName = data.symbol[symbolIndex];
        const listedExchange = tableField(data, "exchange-listed", symbolIndex);
        const tradedExchange = tableField(data, "exchange-traded", symbolIndex);
        const fullName = `${tradedExchange}:${symbolName}`;

        //	This feature support is not implemented yet
        //	var hasDWM = tableField(data, "has-dwm", symbolIndex);

        const hasIntraday = tableField(data, "has-intraday", symbolIndex);
        const tickerPresent = typeof data.ticker !== "undefined";
        const symbolInfo = {
          name: symbolName,
          base_name: [`${listedExchange}:${symbolName}`],
          description: tableField(data, "description", symbolIndex),
          full_name: fullName,
          legs: [fullName],
          has_intraday: hasIntraday,
          has_no_volume: tableField(data, "has-no-volume", symbolIndex),
          listed_exchange: listedExchange,
          exchange: tradedExchange,
          minmov:
            tableField(data, "minmovement", symbolIndex) ||
            tableField(data, "minmov", symbolIndex),
          minmove2:
            tableField(data, "minmove2", symbolIndex) ||
            tableField(data, "minmov2", symbolIndex),
          fractional: tableField(data, "fractional", symbolIndex),
          pointvalue: tableField(data, "pointvalue", symbolIndex),
          pricescale: tableField(data, "pricescale", symbolIndex),
          type: tableField(data, "type", symbolIndex),
          session: tableField(data, "session-regular", symbolIndex),
          ticker: tickerPresent
            ? tableField(data, "ticker", symbolIndex)
            : symbolName,
          timezone: tableField(data, "timezone", symbolIndex),
          supported_resolutions:
            tableField(data, "supported-resolutions", symbolIndex) ||
            this.datafeed.defaultConfiguration().supported_resolutions,
          force_session_rebuild:
            tableField(data, "force-session-rebuild", symbolIndex) || false,
          has_daily: tableField(data, "has-daily", symbolIndex) || true,
          intraday_multipliers: tableField(
            data,
            "intraday-multipliers",
            symbolIndex
          ) || ["1", "5", "15", "30", "60"],
          has_fractional_volume:
            tableField(data, "has-fractional-volume", symbolIndex) || false,
          has_weekly_and_monthly:
            tableField(data, "has-weekly-and-monthly", symbolIndex) || false,
          has_empty_bars:
            tableField(data, "has-empty-bars", symbolIndex) || false,
          volume_precision:
            tableField(data, "volume-precision", symbolIndex) || 0
        };

        //TODO: fix later
        // this.symbolsInfo[symbolInfo.ticker] = symbolInfo;
        // this.symbolsInfo[symbolName] = symbolInfo;
        // this.symbolsInfo[fullName] = symbolInfo;
        this.symbolsList.push(symbolName);
      } catch (error) {
        throw `API error when processing exchange \`${exchangeName}\` symbol #${symbolIndex}: ${error}`;
      }
    }
  };

  onAnyExchangeResponseReceived(exchangeName: string) {
    delete (this.exchangesWaitingForData as any)[exchangeName];
    const allDataReady = Object.keys(this.exchangesWaitingForData).length === 0;

    if (allDataReady) {
      this.symbolsList.sort();
      this.datafeed.logMessage("All exchanges data ready");
      this.datafeed.onInitialized();
    }
  }

  resolveSymbol(
    symbolName: string,
    onSymbolResolvedCallback: any,
    onResolveErrorCallback: any
  ) {
    if (!Object.prototype.hasOwnProperty.call(this.symbolsInfo, symbolName)) {
      onResolveErrorCallback("invalid symbol");
    } else {
      onSymbolResolvedCallback((this.symbolsInfo as any)[symbolName]);
    }
  }
}

export class SymbolSearchComponent {
  datafeed: any;

  constructor(datafeed: any) {
    this.datafeed = datafeed;
  }

  searchSymbolsByName(searchArgument: any, maxSearchResults: any) {
    searchArgument.onResultReadyCallback([]);
  }
}
