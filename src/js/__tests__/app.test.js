import read from '../reader.js';
import json from '../parser.js';
import GameSavingLoader from '../app.js';

jest.mock(
    '../reader.js', () => 
        jest.fn().mockResolvedValue(
            new ArrayBuffer(100)
    )
);

jest.mock(
    '../parser.js', () => 
        jest.fn().mockResolvedValue(
        `{
            "id": 9,
            "created": 1546300800,
            "userInfo": {
                "id": 1,
                "name": "Hitman",
                "level": 10,
                "points": 2000
            }
        }`
    )
);

test('GameSavingLoader.load should return correct data', async () => {
    const saving = await GameSavingLoader.load();
    expect(saving).toBeDefined();
    expect(saving.id).toBe(9);
    expect(saving.created).toBe(1546300800);
    expect(saving.userInfo).toEqual({
        id: 1,
        name: 'Hitman',
        level: 10,
        points: 2000
    });
});

test('GameSavingLoader.load should throw error', async () => {
    read.mockResolvedValue(
        new ArrayBuffer(100)
    );
    json.mockResolvedValue(
        'invalid JSON'
    );
    await expect(GameSavingLoader.load()).rejects.toThrow(
        'Error while parsing JSON data'
    );
});
