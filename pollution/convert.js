const fs = require("fs")
const mm = require("moment")

const data = JSON.parse(fs.readFileSync("./data.json","utf8"))

console.log("Generating compatible DataSet to converted-data.json")

let output = {
    dataset: {
        name: "Concentration en polluant",
        description: "Concentrations moyennes horaires issues du réseau fixe des mesures européennes des principaux polluants réglementés dans l'air sur la région Auvergne-Rhône-Alpes",
        primaryField: "valeur",
        secondaryField: "nom_poll",
        fields: [
            {
                id: "nom_station",
                displayname: "Nom de station",
                type: "string"
            },
            {
                id: "influence",
                displayname: "Influence",
                type: "string"
            },
            {
                id: "nom_poll",
                displayname: "Polluant",
                type: "string"
            },
            {
                id: "valeur",
                displayname: "Concentration (µg.m-3)",
                type: "number"
            }
        ]
    },
    data:[]
}

data.features.forEach(feature => {

    let point = output.data.find(el => el.point[0] == feature.geometry.coordinates[0] &&
        el.point[1] == feature.geometry.coordinates[1])

    if(!point){
        point = {
            point: [...feature.geometry.coordinates],
            values: []
        }
        output.data.push(point);
    }

    let value = {
        timestamp: mm(feature.properties["date_debut"], "MM/DD/YYYY hh:mm:ss A").valueOf(),
        fields: [
            {
                id: "nom_station",
                value: `${feature.properties["nom_station"]}`
            },
            {
                id: "influence",
                value: `${feature.properties["influence"]}`
            },
            {
                id: "nom_poll",
                value: `${feature.properties["nom_poll"]}`
            },
            {
                id: "valeur",
                value: `${feature.properties["valeur"]}`
            }
        ]
    }

    point.values.push(value)

});

fs.writeFileSync("./converted-data.json",JSON.stringify(output,null,2));

console.log("Outputted to converted-data.json");