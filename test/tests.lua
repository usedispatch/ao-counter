Test = require("@rakis/test-unit")
myTests = Test.new("My Test Suite")

myTests:add("sanity check", function()
    assert(1 + 1 == 2, "Math is broken!")
end)

myTests:add("increment counter",
    function ()
        local counter = Send({Target = ao.id, Action = "getCounter"}).receive().Data
        print(counter)
        local incrementCounter =  Send({Target = ao.id,Action = "incrementCounter"}).receive()
        print(incrementCounter)
    end)

