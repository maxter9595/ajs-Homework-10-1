import read from './reader.js';
import json from './parser.js';

class GameSaving {
    constructor(id, created, userInfo) {
        this.id = id;
        this.created = created;
        this.userInfo = userInfo;
    }
}

export default class GameSavingLoader {
    static load() {
        return read()
            .then(json)
            .then((parsedData) => {
                try {
                    const parsedObject = JSON.parse(parsedData);
                    return new GameSaving(
                        parsedObject.id,
                        parsedObject.created,
                        parsedObject.userInfo
                    );
                } catch (error) {
                    throw new Error(
                        'Error while parsing JSON data'
                    );
                }
            })
            .catch((error) => {
                throw error;
            });
    }
}
