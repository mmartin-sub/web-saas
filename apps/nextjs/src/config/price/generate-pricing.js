const { priceDataMap } = require('./generate-pricing');

/*
* Needed if you can't run .ts file directly
*/
console.log(JSON.stringify(priceDataMap, null, 2));
