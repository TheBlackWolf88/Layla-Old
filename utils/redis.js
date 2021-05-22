const redis = require('redis')
const redisPath = "//redis-13683.c250.eu-central-1-1.ec2.cloud.redislabs.com:13683?password=nY2fPh3gPmIwNydu58nwU1ggFVQX4ktX"

module.exports = async() => {
    return await new Promise((resolve, reject) => {
        const client = redis.createClient({
            url: redisPath,
        })

        client.on('error', (err) => {
            console.error('Redis error:', err)
            client.quit()
            reject(err)
        })

        client.on('ready', () => {
            resolve(client)
        })
    })
}

module.exports.expire = (callback) => {
    const expired = () => {
        const sub = redis.createClient({ url: redisPath })
        sub.subscribe('__keyevent@0__:expired', () => {
            sub.on('message', (channel, message) => {
                callback(message)
            })
        })
    }

    const pub = redis.createClient({ url: redisPath })
    pub.send_command('config', ['set', 'notify-keyspace-events', 'Ex'], expired())
}