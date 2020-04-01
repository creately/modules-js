const fetch = require("node-fetch");

function getSearchUrl( org, from=0 ) {
    return `https://registry.npmjs.org/-/v1/search?text=@${ org }&from=${ from }`;
}

async function getSearchPage( org, from=0 ) {
    const response = await fetch(getSearchUrl(org,from));
    const json = await response.json();
    const results = [];
    for (var i = 0; i < json.objects.length; i++) {
      const name = json.objects[i].package.name;
      if(name.startsWith( `@${ org }/` ) ){
        results.push(name)
      }
    }
    return results;
}

async function getModuleNames(org){
    const results = [];
    let page = 0;
    while (true){
      const pageResutls = await getSearchPage(org, page*20);
      if(pageResutls.length === 0){
        break;
      }
      results.push(...pageResutls);
      page++;
    }
    return results;
}

module.exports = { 
  getModuleNames 
}