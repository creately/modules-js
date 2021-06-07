// additional library used to fetch data for a given url
const fetch = require("node-fetch");

/**
 * Get the correct url format 
 */
function getSearchUrl(org, from = 0) {
  return `https://registry.npmjs.org/-/v1/search?text=@${org}&from=${from}`;
}

/**
 * getting the response and convert into json format and return results
 * @param {string} org npm organization name 
 * @param {int} from npm page count
 */
async function getSearchPage(org, from = 0) {
  // return response of given org name and starting object count
  const response = await fetch(getSearchUrl(org, from));
  // return result in json format
  const json = await response.json();
  // result array to concat objects:package.name specifically searched by "@creately/"
  const results = [];
  for (var i = 0; i < json.objects.length; i++) {
    const name = json.objects[i].package.name;
    if (name.startsWith(`@${org}/`)) {
      results.push(name);
    }
  }
  return {
    results,
    processed: json.objects.length,
  };
}

/**
 * github package utilization for page by page processed results 
 * @param {String} org npm organization name
 */ 
async function getModuleNames(org) {
  // array to store set of elements pushed for each page by url
  const results = [];
  // initial object count from the getSearchPage function
  let from = 0;
  while (true) {
    // results of objects returned in json format
    const pageResults = await getSearchPage(org, from);
    // exit while loop when results returned from getSearchPage function returns zero
    if (pageResults.results.length === 0) {
      break;
    }
    results.push(...pageResults.results);
    from = from + pageResults.processed;
  }
  return results;
}

/**
 * export function getModuleNames to get use globally
 */
module.exports = {
  getModuleNames,
};
