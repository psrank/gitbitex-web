import { Collect } from "./vendor";

export class Helper {
  static usNameWithObject(object: any, encode = false) {
    if (Array.isArray(object)) {
      object.forEach((item, index) => {
        object[index] = this.usNameWithObject(item, encode);
      });
    } else if (typeof object == "object" && !Array.isArray(object)) {
      object = Object.assign({}, object);

      for (const key in object) {
        if (typeof object[key] == "object") {
          object[key] = this.usNameWithObject(object[key], encode);
        }

        const newKey = encode
          ? key.replace(/([A-Z])/g, "_$1").toLowerCase()
          : key.replace(/_(\w)/g, ($0, $1) => {
              return $1.toUpperCase();
            });

        if (newKey != key) {
          object[newKey] = object[key];
          delete object[key];
        }
      }
    }

    return object;
  }

  static map = function(object: any, handle: (item: any, key?: any) => any) {
    let array = [];
    if (typeof handle === "function") {
      for (let key in object) {
        array.push(handle(object[key], key));
      }
    }
    return array;
  };

  static ArrayIn = (search: any, array: any[]) => {
    for (const i in array) {
      if (array[i] == search) {
        return true;
      }
    }
    return false;
  };

  static ObjectValues(obj: any) {
    return Object.keys(obj).map(key => {
      return obj[key];
    });
  }

  static CookieSet(name: string, value: string, expire: number = 0) {
    let exp = new Date();
    exp.setTime(exp.getTime() + (expire ? expire : exp.getTime()));
    document.cookie = `${name}=${value};expires=${exp.toUTCString()}`;
  }

  static TradeMargeOrderBook(orderBook: any, scale: number, count: number = 0) {
    let bids: any = {},
      asks: any = {},
      lastBidPrice = 0,
      lastAskPrice = 0;

    orderBook.bids.forEach((bid: any) => {
      let price = this.TradeScalePrice(bid[0], scale);
      bids[price] || (bids[price] = [Number(price), 0]);
      bids[price][1] += Number(bid[1]);

      lastBidPrice == 0 && (lastBidPrice = Number(price));
    });

    orderBook.asks.forEach((ask: any) => {
      let price = this.TradeScalePrice(ask[0], scale);
      asks[price] || (asks[price] = [Number(price), 0]);
      asks[price][1] += Number(ask[1]);
    });

    asks = this.ObjectValues(asks);
    bids = this.ObjectValues(bids);

    if (count && bids.length > 0 && asks.length > 0) {
      lastBidPrice = Collect(bids).first()[0];
      for (let i = 0; bids.length < count; i++) {
        bids.push([
          this.TradeScalePrice(lastBidPrice - (i + 1) * scale, scale),
          0
        ]);
      }

      lastAskPrice = Collect(asks).last()[0];
      for (let i = 0; asks.length < count; i++) {
        asks.push([
          this.TradeScalePrice(lastAskPrice + (i + 1) * scale, scale),
          0
        ]);
      }
    }

    return { asks: asks, bids: bids };
  }

  static TradeScalePrice(price: number, scale: number) {
    price = Number(Math.round(price / scale) * scale);
    return scale >= 1
      ? String(price)
      : price.toFixed(this.NumberToString(scale).length - 2);
  }

  static NumberToString(number: number): string {
    if (/-/.test(String(number)))
      return number.toFixed(Number(String(number).split("-")[1]));
    else return String(number);
  }
}
