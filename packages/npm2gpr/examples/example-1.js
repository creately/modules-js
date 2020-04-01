const npm2gpr = require("../");

async function main(){
  const names = await npm2gpr.getModuleNames("creately");
  console.log(names);
}

main();