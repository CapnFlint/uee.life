const axios = require('axios')
const cheerio = require('cheerio')

async function fetchMembers(org, page=1, isMain) {
    let members = {
        count: 1,
        members: []
    }
    /*await axios.get(`http://api.sc-tools.org/v1/orgs/${org}/json`).then(res => {
        if(res.data.status == 'ok') {
            console.log(res.data.orgs.members)
            members = res.data.orgs.members;
        } else {
            members = []
        }
    })*/

    console.log("isMain: ")
    console.log(isMain)

    try {
        const url = "https://robertsspaceindustries.com/api/orgs/getOrgMembers"
        let i = 0
        data = {
            symbol: org,
            search: '',
            pagesize: 32,
            main_org: isMain ? "1" : "0",
            page: page
        }

        console.log(data)

        members = axios({
            url: url,
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            data: data
        }).then((res) => {
            let members = []
            const totalMembers = res.data.data.totalrows
            const html = res.data.data.html
            const $ = cheerio.load(html)

            $('li.member-item').each(function (i, el) {
                let handle = $(el).find('span.nick').text()
                let name = $(el).find('span.name').text()
                let stars = parseInt($(el).find('span.stars').attr('style').match(/width\:\ (.*)\%/)[1])
                if(stars) {
                    stars = stars / 20
                }
                if(handle.trim() != '') {
                    member = {
                        name: name,
                        handle: handle,
                        stars: stars
                    }
                    members.push(member)
                } else {
                    member = {
                        name: 'Redacted',
                        handle: 'Redacted',
                        stars: stars
                    }
                    members.push(member)
                }
            })

            result = {
                count: totalMembers,
                members: members.sort((a, b) => {
                    b.stars - a.stars
                })
            }
            
            return result
        }).catch((err) => {
            console.error(err)
        })
    } catch (error) {
        console.error(error)
        return {error: "Couldn't grab org members!"}
    }
    return members
}

async function fetchOrg(org) {
    try {
        const baseURI = "https://robertsspaceindustries.com"
        const resp = await axios.get(baseURI + '/orgs/' + org)
        const $ = cheerio.load(resp.data)
        info = {}
        info.name = $('h1', '#organization').text().split("/")[0].trim()
        info.banner = baseURI + $('div.banner', '#organization').find('img').attr('src')
        info.logo = baseURI + $('div.logo', '#organization').find('img').attr('src')
        info.count = $('div.logo', '#organization').find('span').text().split(" ")[0]
        info.bio = $('div.body').text()
        info.model = $('ul.tags', '#organization').find('li.model').text()
        info.roles = {}
        info.roles.primary = $('ul.focus', '#organization').find('li.primary').find('img').attr('alt')
        info.roles.secondary = $('ul.focus', '#organization').find('li.secondary').find('img').attr('alt')
        info.intro = $('div.join-us', '#organization').find('div.markitup-text').html()
        info.history = $('h2:contains("History")', '#organization').next().html()
        info.manifesto = $('h2:contains("Manifesto")', '#organization').next().html()
        info.charter = $('h2:contains("Charter")', '#organization').next().html()
        info.founders = await fetchOrgFounders(org)
        //info.members = await fetchMembers(org)
        
        info.tag = org

        return info
    } catch (error) {
        console.error(error)
        return {error: "Org Not found!"}
    }
}

async function fetchOrgFounders(org) {
    try {
        const resp = await axios.post('https://robertsspaceindustries.com/api/orgs/getOrgMembers', {
            symbol: org,
            search: "",
            role: "1"
        });
        const $ = cheerio.load(resp.data.data.html)
        founders = []
        $('li.member-item').each(function (i, el) {
            let handle = $(el).find('span.nick').text()
            let name = $(el).find('span.name').text()
            founders[i] = {}
            founders[i]['name'] = name
            founders[i]['handle'] = handle
        })
        return founders
    } catch (error) {
        console.error(error)
        return {error: "Org not found!"}
    }
}

async function getOrgFounders(org) {
    return await fetchOrgFounders(org)
}

async function getOrganization(org) {
    return await fetchOrg(org)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  

async function getOrgMembers(org, page) {
    if (!page) {
        page = 1
    }
    members = await fetchMembers(org, page)
    console.log(members.count)
    console.log(members.members.length)
    total = members.count
    current = members.members.length
    /*while(current < total) {
        page += 1
        next = await fetchMembers(org, page)
        members.members.concat(next.members)
        current = members.members.length
    }*/
    await sleep(1000)
    return members
}


module.exports = {
    getOrganization,
    getOrgFounders,
    getOrgMembers
};