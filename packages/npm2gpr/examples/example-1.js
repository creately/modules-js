// require index.js mentioned within package.json
const npm2gpr = require("../");

/**
 *  function to call getModuleNames and return results on console.log
 */
async function main(){
  const names = await npm2gpr.getModuleNames("creately");
  console.log(names);
}

main();