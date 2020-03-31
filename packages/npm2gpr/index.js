const fetch = require("node-fetch");
const url1 = "https://registry.npmjs.org/-/v1/search?text=@creately&from=0";
const url2 = "https://registry.npmjs.org/-/v1/search?text=@creately&from=20";

const getData = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    //console.log(json.objects.package);
    arr = [];
    arr = json.objects;
    for (var i = 0; i < arr.length; i++) {
        console.log(arr[i].package.name)
    }
  } catch (error) {
    console.log(error);
  }
};

getData(url1);
getData(url2);