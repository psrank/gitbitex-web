export class DataPulseUpdater {
  subscribers: any = {};
  datafeed: any;
  requestsPending = 0;

  constructor(datafeed: any, updateFrequency: number) {
    this.datafeed = datafeed;

    const update = () => {
      if (this.requestsPending > 0) {
        return;
      }

      for (const listenerGUID in this.subscribers) {
        const subscriptionRecord = (this.subscribers as any)[listenerGUID];

        const resolution = subscriptionRecord.resolution;

        const datesRangeRight = Number(new Date().valueOf() / 1000);

        //	BEWARE: please note we really need 2 bars, not the only last one
        //	see the explanation below. `10` is the `large enough` value to work around holidays
        const datesRangeLeft =
          datesRangeRight - this.periodLengthSeconds(resolution, 10);
        this.requestsPending++;

        this.subscribe(
          subscriptionRecord,
          resolution,
          datesRangeLeft,
          datesRangeRight,
          listenerGUID
        );
      }
    };

    if (typeof updateFrequency !== "undefined" && updateFrequency > 0) {
      setInterval(update, 1000);
    }
  }

  subscribe(
    subscriptionRecord: any,
    resolution: any,
    datesRangeLeft: any,
    datesRangeRight: any,
    listenerGUID: any
  ) {
    this.datafeed.getBars(
      subscriptionRecord.symbolInfo,
      resolution,
      datesRangeLeft,
      datesRangeRight,
      (bars: any) => {
        this.requestsPending--;
        //	means the subscription was cancelled while waiting for data
        if (
          !Object.prototype.hasOwnProperty.call(this.subscribers, listenerGUID)
        ) {
          return;
        }

        if (bars.length === 0) {
          return;
        }

        const lastBar = bars[bars.length - 1];
        if (
          !isNaN(subscriptionRecord.lastBarTime) &&
          lastBar.time < subscriptionRecord.lastBarTime
        ) {
          return;
        }

        const subscribers = subscriptionRecord.listeners;
        //	BEWARE: this one isn't working when first update comes and this update makes a new bar. In this case
        //	_subscriptionRecord.lastBarTime = NaN
        const isNewBar =
          !isNaN(subscriptionRecord.lastBarTime) &&
          lastBar.time > subscriptionRecord.lastBarTime;

        //	Pulse updating may miss some trades data (ie, if pulse period = 10 secods and new bar is started 5 seconds later after the last update, the
        //	old bar's last 5 seconds trades will be lost). Thus, at fist we should broadcast old bar updates when it's ready.
        if (isNewBar) {
          if (bars.length < 2) {
            throw "Not enough bars in history for proper pulse update. Need at least 2.";
          }

          const previousBar = bars[bars.length - 2];
          for (let i = 0; i < subscribers.length; ++i) {
            subscribers[i](previousBar);
          }
        }
        subscriptionRecord.lastBarTime = lastBar.time;

        for (let i = 0; i < subscribers.length; ++i) {
          subscribers[i](lastBar);
        }
      },
      () => {
        this.requestsPending--;
      }
    );
  }

  unsubscribeDataListener(listenerGUID: any) {
    this.datafeed.logMessage(`Unsubscribing ${listenerGUID}`);
    delete this.subscribers[listenerGUID];
  }

  subscribeDataListener(
    symbolInfo: any,
    resolution: any,
    newDataCallback: any,
    listenerGUID: any
  ) {
    this.datafeed.logMessage(`Subscribing ${listenerGUID}`);

    const key = `${symbolInfo.name}, ${resolution}`;

    if (!Object.prototype.hasOwnProperty.call(this.subscribers, listenerGUID)) {
      this.subscribers[listenerGUID] = {
        symbolInfo,
        resolution,
        lastBarTime: NaN,
        listeners: []
      };
    }

    this.subscribers[listenerGUID].listeners.push(newDataCallback);
  }

  periodLengthSeconds(resolution: any, requiredPeriodsCount: any = 1) {
    let daysCount = 0;

    if (resolution == "D") {
      daysCount = requiredPeriodsCount;
    } else if (resolution == "M") {
      daysCount = 31 * requiredPeriodsCount;
    } else if (resolution == "W") {
      daysCount = 7 * requiredPeriodsCount;
    } else {
      daysCount = (requiredPeriodsCount * resolution) / (24 * 60);
    }

    return daysCount * 24 * 60 * 60;
  }
}

export class QuotesPulseUpdater {
  datafeed: any;
  subscribers: any = {};
  updateInterval = 60 * 1000;
  fastUpdateInterval = 10 * 1000;
  requestsPending = 0;

  constructor(datafeed: any) {
    this.datafeed = datafeed;

    setInterval(() => {
      this.updateQuotes((subscriptionRecord: any) => {
        return subscriptionRecord.symbols;
      });
    }, this.updateInterval);

    setInterval(() => {
      this.updateQuotes((subscriptionRecord: any) => {
        return subscriptionRecord.fastSymbols.length > 0
          ? subscriptionRecord.fastSymbols
          : subscriptionRecord.symbols;
      });
    }, this.fastUpdateInterval);
  }

  subscribeDataListener(
    symbols: any,
    fastSymbols: any,
    newDataCallback: any,
    listenerGUID: any
  ) {
    if (!Object.prototype.hasOwnProperty.call(this.subscribers, listenerGUID)) {
      this.subscribers[listenerGUID] = {
        symbols,
        fastSymbols,
        listeners: []
      };
    }
    this.subscribers[listenerGUID].listeners.push(newDataCallback);
  }

  unsubscribeDataListener(listenerGUID: any) {
    delete this.subscribers[listenerGUID];
  }

  updateQuotes(symbolsGetter: any) {
    if (this.requestsPending > 0) {
      return;
    }

    for (const listenerGUID in this.subscribers) {
      this.requestsPending++;

      const subscriptionRecord = this.subscribers[listenerGUID];
      this.datafeed.getQuotes(
        symbolsGetter(subscriptionRecord),
        // onDataCallback
        () => {
          return (data: any) => {
            this.requestsPending--;
            // means the subscription was cancelled while waiting for data
            if (
              !Object.prototype.hasOwnProperty.call(
                this.subscribers,
                listenerGUID
              )
            ) {
              return;
            }
            for (let i = 0; i < subscriptionRecord.listeners.length; ++i) {
              subscriptionRecord.listeners[i](data);
            }
          };
        }, // jshint ignore:line
        // onErrorCallback
        (error: any) => {
          this.requestsPending--;
        }
      ); // jshint ignore:line
    }
  }
}
