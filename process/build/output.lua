
counter = 0


function sendReply(msg, data)
    msg.reply({Data = data, Action = msg.Action .. "Response"})
end


function incrementCounter(msg)
    counter = counter + 1
    sendReply(msg, counter)
end

function decrementCounter(msg)
    counter = counter - 1
    sendReply(msg, counter)
end

function getCounter(msg)
    sendReply(msg, counter)
end


Handlers.add("incrementCounter", incrementCounter)
Handlers.add("decrementCounter", decrementCounter)
Handlers.add("getCounter", getCounter)