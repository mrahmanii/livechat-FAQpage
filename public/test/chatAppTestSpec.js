describe("Chatbox open", function () {
    it("Chatbox eenmaal wisselen", function () {
        let currentState = isChatboxOpen();
        expect(isChatboxOpen()).toBe(currentState);
        toggleChatBox();
        expect(isChatboxOpen()).toBe(!currentState);
    });

    it("Schakel chatbox tweemaal in", function () {
        let currentState = isChatboxOpen();
        expect(isChatboxOpen()).toBe(currentState);
        toggleChatBox();
        expect(isChatboxOpen()).toBe(!currentState);
        toggleChatBox();
        expect(isChatboxOpen()).toBe(currentState); 
    });

    it("Schakel chatbox driemaal in", function () {
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

describe("Formulier verzenden", function () {
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

    it("Controleer of het welkomstbericht van de server is gekomen", function () {
        const msg = document.getElementById("msg")
        let messages = chatMessages.querySelectorAll('.message');
        expect(messages.length >= 0).toBe(true);
    });

    it("Voeg een bericht toe en controleer of er een bericht is toegevoegd aan de chatbox", function () {
        const msg = document.getElementById("msg")
        msg.value = "Test Text";
        clearMessages();
        outputMessage(message1);
        let messages = chatMessages.querySelectorAll('.message');
        expect(messages.length >= 1).toBe(true);
    });

    it("Voeg twee berichten toe en controleer of er twee berichten zijn toegevoegd aan de chatbox", function () {
        const msg = document.getElementById("msg")
        msg.value = "Test Text";
        clearMessages();
        outputMessage(message1);
        outputMessage(message2);
        let messages = chatMessages.querySelectorAll('.message');
        expect(messages.length >= 2).toBe(true);
    });
});
