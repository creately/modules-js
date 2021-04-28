const path = require('path');
const fs = require('fs');
const csv = require('csv-parser')

/**
 * This script accepts a list of country names as a .csv file, and outputs
 * a list of supprted ISO 639-3 country codes as defined in the franc package.
 * It supports 406 languages as defined in codes.csv.
 * 
 * See https://github.com/wooorm/franc
 * 
 * Usage:
 * 1. Get a list of languages supported by the font, e.g. from https://fontdrop.info
 * 2. Add the list of languages to languages.csv
 * 3. Run 'npm run code-gen'
 * 4. The suported language codes will be in codes.csv
 * 
 * This list can then be used to update the supportedLanguages for the font on the FONTS_INFO_LIST in the package.
 */

const ROOT_DIR = path.resolve( __dirname, '../' );

const countryFilePath = ROOT_DIR + '/.npm-scripts/languages.csv';
const allCodesFilePath = ROOT_DIR + '/.npm-scripts/all-codes.csv';
const codesFilePath = ROOT_DIR + '/.npm-scripts/codes.csv';

const countries = [];

fs.createReadStream(countryFilePath)
    .pipe(csv({ headers: false }))
    .on('data', (data) => countries.push(data['0']))
    .on('end', () => {
        console.log('Retrieving supported language codes for ' + countries.length + ' countries');
    });

const codes = [];

fs.createReadStream(allCodesFilePath)
    .pipe(csv())
    .on('data', (data) => {
        const currentCountry = data['country'];
        const currentCode = data['code'];
        if (countries.includes(currentCountry)) {
            codes.push(currentCode);
        }
    })
    .on('end', () => {
        console.log('Found ' + codes.length +  ' supported countries with following language codes:');
        console.log(codes);
        fs.writeFileSync( codesFilePath, JSON.stringify(codes));
    });