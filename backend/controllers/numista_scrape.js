const cheerio = require('cheerio');
const request = require('request');

const isValidString = (element) => element;

const logArrayElements = (element, index /*, array */) => {
    if(element) {
        console.log(`a[${index}] = \"${element}\"`);
    }
  };

function fetchHtml(url) {
    return new Promise((resolve, reject) => {
        request(url, (error, response, html) => {
            if (error) {
                return reject(error);
            }
            if (response.statusCode !== 200) {
                return reject(new Error(`Failed to load page, status code: ${response.statusCode}`));
            }
            resolve(html);
        });
    });
}

function getVariationData($_var) {
    const $ = $_var;
    var rawDates = $('td.date').map(function (i, el) {
        // this === el
        return $(this).text();
      })
      .toArray()
    var rawMintages = $('td.tirage').map(function (i, el) {
        // this === el
        return $(this).text();
      })
      .toArray()
    var rawComments = $('td.comment').map(function (i, el) {
        // this === el
        return $(this).text();
      })
      .toArray()

    var arrayOfData = [];

    for(var i = 1; i < rawDates.length && i < rawMintages.length && i < rawComments.length; i++) {
        var data = {
            date: rawDates[i].trimStart().trimEnd(),
            mintage: rawMintages[i].replaceAll(' ',','),
            comment: rawComments[i].trimStart().trimEnd()
        }
        arrayOfData.push(data);
        // console.log(JSON.stringify(data));
    }
    return arrayOfData;
}

function getFeatureValue($_var, header) {
    const $ = $_var;
    var value = $('th').filter(function() {
        return $(this).text().indexOf(header) > -1;
    }).next().text();
    return value.trimStart().trimEnd();
}

function getDenomination($_var) {
    const $ = $_var;
    var raw = getFeatureValue($, 'Value').split('\n')[0];
    const regex = /[0-9A-Za-z =]+/g;
    const denomination = raw.match(regex)[0].trim();
    return denomination;
}

function getIssuer($_var) {
    const $ = $_var;
    const raw = getFeatureValue($, 'Issuer').split('\n');
    const issuer = raw.find(isValidString).trimStart();

    // raw.forEach(logArrayElements);

    return issuer;
}

function getReferences($_var) {
    const $ = $_var
    var raw = getFeatureValue($, 'References')

    //const regex = /([A-Za-z]+#\s([A-Za-z]+\s[0-9]+))|([A-Za-z]+#\s([A-Za-z0-9\.-]+))/g;
    // const references = raw.match(regex);
    const references = raw;

    return references;
}

function getDescription($_var) {
    const $ = $_var;
    var value = $('h3').filter(function() {
        return $(this).text().indexOf('Commemorative issue') > -1;
    }).next().text();
    return value.trimStart().trimEnd();
}

async function getNumistaDetailsJSON(numistaNumber) {

    // const $ = $_var;

    try {
        const url = `https://en.numista.com/catalogue/pieces${numistaNumber}.html`;

        const html = await fetchHtml(url); // Wait for the request to complete
        const $ = cheerio.load(html);

        const features = {
            denomination: getDenomination($),
            issuer: getIssuer($),
            composition: getFeatureValue($, 'Composition'),
            mass: getFeatureValue($, 'Weight'),
            diameter: getFeatureValue($, 'Diameter'),
            orientation: getFeatureValue($, 'Orientation'),
            references: getReferences($),
            numistaRef: getFeatureValue($, 'Number'),
            variations: getVariationData($),
            description: getDescription($)
        };

        console.log("features: " + JSON.stringify(features, null, 2));
        return features; // Return the features after the request is complete
    } catch (error) {
        console.error("Error fetching Numista details:", error);
        throw error;
    }
}

module.exports.getNumistaDetailsJSON = getNumistaDetailsJSON;