const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()
const port = 3000

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Replace once a database is connected
const discordInfo = [
    {
        clanId: 2084197,
        users: [
            {
                name: "CrunchytheSnail",
                discordId: "814218627624337488",
            },
            {
                name: "Ducor#2117",
                discordId: "176853618346033152",
            },
            {
                name: "Santronamo#8144",
                discordId: "628088102627442689",
            },
            {
                name: "altas#0069",
                discordId: "994462509371248770",
            },
            {
                name: "Buzz#6654",
                discordId: "745494783941935165",
            },
            {
                name: "Raid#1086",
                discordId: "300446842016104448",
            },
            {
                name: "Shadows#0147",
                discordId: "238706008929599489",
            },
            {
                name: "♡Blank♡#6969",
                discordId: "549727225239568384",
            }
        ]
    }
]

// Replace once a database is connected
const clanInfo = [
    {
        guildId: "176855588809080833",
        clanId: 2084197,
    },
]

// GET Discord User IDs
// Query clanId
app.get('/Discord', (req, res) => {
    // Look for members with clanId
    var clanId = req.query.clanId

    if (clanId == discordInfo[0]?.clanId) {
        res.json(discordInfo)
    } else {
        res.json('No clan found')
    }
})

// GET clanId and guildId
// Query guildId
app.get('/getClan', (req, res) => {
    // Look for clan with guildId
    var guildId = req.query.guildId

    // Open temp database file for groups
    fs.readFile('./tempGroupDB.json', function (err, data) {
        var data = JSON.parse(data)
        if (guildId == data[0]?.guildId) {
            res.json(data)
        } else {
            res.json('No clan found for this guild')
        }
    })
})

// POST clanId and guildId
// Request body in the form
// {
//     guildId: string,
//     clanId: int
// }
app.post('/LinkClanId', jsonParser, (req, res) => {
    fs.readFile('./tempGroupDB.json', function (err, data) {
        var temp = JSON.parse(data)

        // Make sure this entry doesn't already exist for this clanId
        let newEntry = true
        for (let i = 0; i < temp.length; i++) {
            if (req.body?.clanId == temp[i]?.clanId) {
                console.log('Already exists')
                newEntry = false
            }
        }
        
        if (newEntry) {
            temp.push(req.body)
        }
        
        // Write to the file
        fs.writeFile('./tempGroupDB.json', JSON.stringify(temp), err => {
            if (err) {
                console.log('Error writing file', err)
                res.json(err);
            } else {
                console.log('Successfully wrote file')
                res.json('Success');
            }
        })
    })
})

// POST time data
// Request body in the form
// [
//     {
//         discordId: string,
//         messageCount: int,
//         voiceSeconds: int
//     }
// ]
app.post('/TimeData', jsonParser, (req, res) => {
    fs.readFile('./tempUserDB.json', function (err, data) {
        var temp = JSON.parse(data)
        temp.push(req.body)

        fs.writeFile('./tempUserDB.json', JSON.stringify(temp), err => {
            if (err) {
                console.log('Error writing file', err)
                res.json(err);
            } else {
                console.log('Successfully wrote file')
                res.json('Success');
            }
        })
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})