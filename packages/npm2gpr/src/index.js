const fetch = require("node-fetch");

function getSearchUrl(org, from = 0) {
  return `https://registry.npmjs.org/-/v1/search?text=@${org}&from=${from}`;
}

async function getSearchPage(org, from = 0) {
  const response = await fetch(getSearchUrl(org, from));
  const json = await response.json();
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

async function getModuleNames(org) {
  const results = [];
  let from = 0;
  while (true) {
    const pageResults = await getSearchPage(org, from);
    if (pageResults.results.length === 0) {
      break;
    }
    results.push(...pageResults.results);
    from = from + pageResults.processed;
  }
  return results;
}

module.exports = {
  getModuleNames,
};
