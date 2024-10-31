
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