import forEach from 'lodash/forEach';
import sortBy from 'lodash/sortBy';

import find from 'lodash/find';
import filter from 'lodash/filter';

export function matchesTimestamp(time1, time2, resolution) {
  const delta = Math.abs(time1 - time2);

  switch (resolution) {
    case 'year_to_months':
      return delta <= 15 * 24 * 60 * 60 * 1000;
    case 'month_to_days':
      return delta <= 12 * 60 * 60 * 1000;
    case 'day_to_minutes':
    default:
      return delta <= 8 * 60 * 1000;
    case 'hour_to_minutes':
      return delta <= 1000;
  }
}

export function sumData({ data, resolution }) {
  if (data.length === 0) return [{ timestamp: (new Date).getTime(), powerMilliwatt: -1 }];

  const sortedData = sortBy(data, [d => (-d.values.length)]);
  const tail = sortedData.slice(1);
  let result = [];

  if (tail.length === 0) {
    result = sortedData[0].values;
  } else {
    forEach(sortedData[0].values, (value, idx) => {
      let { powerMilliwatt, timestamp } = value;
      forEach(tail, meteringPoint => {
        // console.log(filter(meteringPoint.values, v => matchesTimestamp(v.timestamp, timestamp, resolution)));
        const c = find(meteringPoint.values, v => matchesTimestamp(v.timestamp, timestamp, resolution));
        // console.log(filter(meteringPoint.values, v => v.timestamp === timestamp));
        // const c = find(meteringPoint.values, v => v.timestamp === timestamp);
        if (c) powerMilliwatt += c.powerMilliwatt;


        // const v = meteringPoint.values[idx];
        // if (v && v.timestamp && (v.timestamp === timestamp || matchesTimestamp(v.timestamp, timestamp, resolution))) {
        //   powerMilliwatt += v.powerMilliwatt;
        // }
      });
      result.push({ timestamp, powerMilliwatt });
    });
  }

  return result;
}
