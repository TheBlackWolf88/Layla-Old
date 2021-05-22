const fs = require('fs')
require("module-alias/register")
let mainFolder = "commands"
module.exports = (client, Discord) => {
        let commandDirs = fs.readdirSync(mainFolder)
            //console.log(commandDirs)
        for (const dirs of commandDirs) {
            const command_files = fs.readdirSync(`${mainFolder}/${dirs}`).filter(file => file.endsWith('js'))
                //console.log(command_files)

            for (const file of command_files) {
                //console.log(`../${mainFolder}/${dirs}/${file}`)
                const command = require(`../${mainFolder}/${dirs}/${file}`)
                if (command.name) {
                    client.commands.set(command.name, command)
                } else {
                    continue
                }
            }

        }
    }
    //console.log("Commands loaded")