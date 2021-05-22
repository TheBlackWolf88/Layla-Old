module.exports = {
    name: 'test',
    async execute(client, message, args, Discord) {

        function splitterino(str) {
            str = str.match(/[A-Z][a-z]+/g)
            str = str.join(" ")
            return str
        }

        console.log(splitterino(args[0]))


    }
}