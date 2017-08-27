import forEach from 'lodash/forEach';
import camelCase from 'lodash/camelCase';
import find from 'lodash/find';

export function prepareHeaders(token) {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

export function parseResponse(response) {
  const json = response.json();
  if (response.status >= 200 && response.status < 300) {
    return json;
  } else {
    return json.then(error => Promise.reject(error));
  }
}

export function camelizeResponseArray(data) {
  const result = [];
  forEach(data, (v) => {
    if (Array.isArray(v)) {
      result.push(camelizeResponseArray(v));
    } else if (typeof v === 'object') {
      result.push(camelizeResponseKeys(v));
    } else {
      result.push(v);
    }
  });
  return result;
}

export function camelizeResponseKeys(data) {
  const result = {};
  forEach(data, (v, k) => {
    if (Array.isArray(v)) {
      result[camelCase(k)] = camelizeResponseArray(v);
    } else if (!v) {
      result[camelCase(k)] = v;
    } else if (typeof v === 'object') {
      result[camelCase(k)] = camelizeResponseKeys(v);
    } else {
      result[camelCase(k)] = v;
    }
  });
  return result;
}

export function formatNumber(value) {
  const decimalPoint = ',';
  let remainder = 0;
  let leadingNumber = 0;
  let formattedNumber = '';

  if (value >= 1000000000000000) {
    remainder = ((value % 1000000000000000) / 1000000000000).toFixed(0);
    leadingNumber = Math.floor(value / 1000000000000000);
  } else if (value >= 1000000000000) {
    remainder = ((value % 1000000000000) / 1000000000).toFixed(0);
    leadingNumber = Math.floor(value / 1000000000000);
  } else if (value >= 1000000000) {
    remainder = ((value % 1000000000) / 1000000).toFixed(0);
    leadingNumber = Math.floor(value / 1000000000);
  } else if (value >= 1000000) {
    remainder = ((value % 1000000) / 1000).toFixed(0);
    leadingNumber = Math.floor(value / 1000000);
  } else if (value >= 1000) {
    remainder = (value % 1000).toFixed(0);
    leadingNumber = Math.floor(value / 1000);
  } else {
    remainder = 0;
    leadingNumber = value.toFixed(0);
  }
  if (remainder !== 0) {
    if (remainder < 1) {
      formattedNumber = leadingNumber.toString();
    } else if (remainder < 10) {
      formattedNumber = `${leadingNumber}${decimalPoint}00`;
    } else if (remainder < 100) {
      formattedNumber = `${leadingNumber}${decimalPoint}0${((remainder / 10).toFixed(0))}`;
    } else if (remainder < 1000) {
      formattedNumber = `${leadingNumber}${decimalPoint}${((remainder / 10).toFixed(0))}`;
    }
  } else {
    formattedNumber = leadingNumber.toString();
  }

  return formattedNumber;
}

export function formatLabel(value, type) {
  let result = '';

  const number = formatNumber(value);
  if (value >= 1000000000000000) {
    result = `${number} PW`;
  } else if (value >= 1000000000000) {
    result = `${number} TW`;
  } else if (value >= 1000000000) {
    result = `${number} GW`;
  } else if (value >= 1000000) {
    result = `${number} MW`;
  } else if (value >= 1000) {
    result = `${number} kW`;
  } else {
    result = `${number} W`;
  }
  return type === 'h' ? `${result}h` : result;
}

export function calculateAutarchy({ in: inData, out: outData }) {
  let ownConsumption = 0;
  let foreignConsumption = 0;
  let totalConsumption = 0;
  let totalProduction = 0;
  let autarchy = null;

  inData.forEach((inValue) => {
    totalConsumption += inValue.value;
    const outValue = find(outData, o => o.timestamp === inValue.timestamp);
    if (!outValue) return;
    totalProduction += outValue.value;
    if (outValue.value >= inValue.value) {
      ownConsumption += inValue.value;
    } else {
      ownConsumption += outValue.value;
      foreignConsumption += inValue.value - outValue.value;
    }
  });

  if (foreignConsumption + ownConsumption !== 0) autarchy = (ownConsumption / (foreignConsumption + ownConsumption)).toFixed(2);

  return autarchy;
}

export function logException(ex, context) {
  if (Raven.isSetup()) {
    Raven.captureException(ex, {
      extra: context,
    });
  }
  console.error(ex);
}
