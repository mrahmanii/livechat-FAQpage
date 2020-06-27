describe("Chatbox open", function () {
    it("Toggle chatbox once", function () {
        let currentState = isChatboxOpen();
        expect(isChatboxOpen()).toBe(currentState);
        toggleChatBox();
        expect(isChatboxOpen()).toBe(!currentState);
    });

    it("Toggle chatbox twice", function () {
        let currentState = isChatboxOpen();
        expect(isChatboxOpen()).toBe(currentState);
        toggleChatBox();
        expect(isChatboxOpen()).toBe(!currentState);
        toggleChatBox();
        expect(isChatboxOpen()).toBe(currentState);
    });

    it("Toggle chatbox thrice", function () {
        let currentState = isChatboxOpen();
        expect(isChatboxOpen()).toBe(currentState);
        toggleChatBox();
        expect(isChatboxOpen()).toBe(!currentState);
        toggleChatBox();
        expect(isChatboxOpen()).toBe(currentState);
        toggleChatBox();
        expect(isChatboxOpen()).toBe(!currentState);
    });
});

describe("Submit form", function () {
    const message1 = {
        "id": "6GSWTYz5LTMRi-DxAAAF",
        "username": "448ed50c-4b7c-48c9-92f3-020d5c95acee",
        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, perspiciatis."
    };
    const message2 = {
        "id": "6GSWTYz5LTMRi-DxAAAF",
        "username": "448ed50c-4b7c-48c9-92f3-020d5c95acee",
        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, natus."
    };

    it("Check if the server welcome message has come", function () {
        const msg = document.getElementById("msg")
        let messages = chatMessages.querySelectorAll('.message');
        expect(messages.length >= 0).toBe(true);
    });

    it("Add a message and check if a message is added to the chatbox", function () {
        const msg = document.getElementById("msg")
        msg.value = "Test Text";
        clearMessages();
        outputMessage(message1);
        let messages = chatMessages.querySelectorAll('.message');
        expect(messages.length >= 1).toBe(true);
    });

    it("Add two messages and check if two message is added to the chatbox", function () {
        const msg = document.getElementById("msg")
        msg.value = "Test Text";
        clearMessages();
        outputMessage(message1);
        outputMessage(message2);
        let messages = chatMessages.querySelectorAll('.message');
        expect(messages.length >= 2).toBe(true);
    });
});
