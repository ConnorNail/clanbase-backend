const express = require('express')
const app = express()
const port = 3000

// Replace once a database is connected
const data = [
    {
        name: "CrunchytheSnail",
        discordId: 814218627624337488,
    },
    {
        name: "Ducor#2117",
        discordId: 176853618346033152,
    },
    {
        name: "Santronamo#8144",
        discordId: 628088102627442689,
    },
    {
        name: "altas#0069",
        discordId: 994462509371248770,
    },
    {
        name: "Buzz#6654",
        discordId: 745494783941935165,
    },
    {
        name: "Raid#1086",
        discordId: 300446842016104448,
    },
    {
        name: "Shadows#0147",
        discordId: 238706008929599489,
    },
    {
        name: "♡Blank♡#6969",
        discordId: 549727225239568384,
    }
]

app.get('/', (req, res) => {
    res.json(data)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})