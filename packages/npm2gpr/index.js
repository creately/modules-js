const fetch = require("node-fetch");
arr = [];
arr_package_names = [];

function getUrl( from ) {
    return `https://registry.npmjs.org/-/v1/search?text=@creately&from=${ from }`;
  }

const getData = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    //console.log(json.objects.package);

    arr = json.objects;
    for (var i = 0; i < arr.length; i++) {
        arr_package_names.push((arr[i].package.name))
    }
    // for (var i = 0; i < arr_package_names.length; i++) {
    //     console.log(arr_package_names[i])
    // }
  } catch (error) {
    console.log(error);
  }
};

getData(getUrl(0));
getData(getUrl(20));
// console.log(arr_package_names[2]);