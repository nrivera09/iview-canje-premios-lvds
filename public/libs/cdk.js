class IViewCoreService {
    constructor() {
        this.displayListener = null;
        this.eventListener = (event) => this.handleIncomingMessage(event);
        this.register();
    }

    register() {
        window.addEventListener("message", this.eventListener);
    }

    handleIncomingMessage(event) {
        const eventData = event.data;
        if (eventData.cmd) {
            const eventType = eventData.cmd.toLowerCase();
            switch (eventType) {
                case 'update-corevariables':
                    console.log("DATA = " + eventData.data);
                    if (this.displayListener) {
                        this.displayListener(eventData.data);
                    }
                    break;
            }
        }
    }

    addListener(listener) {
        this.displayListener = listener;
    }

    removeListener() {
        this.displayListener = null;
    }


    fireAction(url) {
        let data = {};
        url = url.slice(1)
        const paramIdx = url.indexOf('?');
        if (paramIdx != -1) {
            const quaryParams = url.slice(paramIdx + 1);
            url = url.slice(0, paramIdx)
            const urlParams = new URLSearchParams(quaryParams);
            for (const [k, v] of urlParams.entries()) {
                data[k] = v
            }
        }

        this.sendToServer(url, data)
    }

    sendToServer(eventName, data) {
        this.sendToParent({
            $type: eventName,
            ...data
        })
    }

    sendToParent(data) {
        window.parent.postMessage({
            name: window.name,
            cmd: 'sendToCore',
            data: data
        }, '*')
    }


    dispose() {
        window.removeEventListener("message", this.eventListener);
    }
}