const axios = require("axios")

const manufacturers = {
    'Origin Jumpworks GmbH': 1,
    'Anvil Aerospace': 2,
    'Roberts Space Industries': 3,
    'Aegis Dynamics': 4,
    'Esperia': 5,
    'Drake Interplanetary': 6,
    'Tumbril': 7,
    'Banu': 8,
    'Musashi Industrial & Starflight Concern': 9,
    'Aopoa': 10,
    'Argo Astronautics': 11,
    'Consolidated Outland': 12,
    'Kruger Intergalactic': 13,
    'Vanduul': 14
}

const sizes = {
    'vehicle': 1,
    'snub': 2,
    'small': 3,
    'medium': 4,
    'large': 5,
    'capital': 6
}

const types = {
    'Exploration': 1,
    'Competition': 2,
    'Combat': 3,
    'Transport': 4,
    'Multi': 5,
    'Ground': 6,
    'Industrial': 7,
    'Support': 8
}

const focus = {
    'Touring': 1,
    'Expedition': 2,
    'Racing': 3,
    'Pathfinder': 4,
    'Light Fighter': 5,
    'Light Freight': 6,
    'Interdiction': 7,
    'Military': 8,
    'Snub Fighter': 9,
    'Transport':10,
    'Medium Freight':11,
    'Recon':12,
    'Medical':13,
    'Militia':14,
    'Stealth Bomber':15,
    'Medium Fighter':16,
    'Stealth Fighter':17,
    'Bomber':18,
    'Heavy Fighter':19,
    'Medium Data':20,
    'Heavy Gun Ship':21,
    'Mining':22,
    'Stealth':23,
    'Luxury':24,
    'Reporting':25,
    'Heavy Salvage':26,
    'Light Science':27,
    'Heavy Bomber':28,
    'Heavy Refuelling':29,
    'Exploration':30,
    'Dropship':31,
}

async function syncShips() {
    let result = await axios({
        url: 'https://calculator-api-259617.appspot.com/mongoDocuments/ships',
        method: 'GET'
    }).then((res) => {
        let ships = []
        for (i in res.data) {
            const item = res.data[i]
            console.log(item)
            ship = {}
            ship.short_name = item.ship.localName
            ship.manufacturer = manufacturers[item.ship.manufacturer]
            ship.model = item.ship.name
            ship.size = sizes[item.ship.size]
            ship.max_crew = item.ship.maxCrew
            ship.cargoCapacity = item.ship.cargoCapacity
            ship.type = types[item.ship.type]
            ship.focus = focus[item.ship.focus]
            console.log(ship)
            ships.push(ship)
        }
        return ships[0]
    }).catch((err) => {
        console.error(err)
    })
    return {success: "Success!", result: result}
}

module.exports = {
    syncShips
};