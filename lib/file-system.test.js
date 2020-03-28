  
const fs = require('fs').promises;

const {
    mkdirp,
    writeJSON,
    readJSON,
    readDirectoryJSON,
    updateJSON,
    deleteFile
} = require('./file-system');

jest.mock('fs', () => ({
    promises: {
        mkdir: jest.fn(() => Promise.resolve()),
        writeFile: jest.fn(() => Promise.resolve()),
        readFile: jest.fn(() => Promise.resolve('{"name":"spot"}')),
        readdir: jest.fn(() => Promise.resolve(['dog.json', 'dog2.json'])),
        unlink: jest.fn(() => Promise.resolve())
    }
}));

describe('file system testing', () => {

    it('writes an object to a file', () => {
        const dog = {
            name: 'spot',
            age: 5,
            weight: '20 lbs'
        };

        return writeJSON('./dog.json', dog)
            .then(() => {
                expect(fs.writeFile)
                    .toHaveBeenCalledWith('./dog.json', JSON.stringify(dog));
            });
    });

    it('can read an object from a file', () => {
        return readJSON('./dog.json')
            .then(data => {
                expect(fs.readFile)
                    .toHaveBeenCalledWith('./dog.json');
                expect(data).toEqual({
                    name: 'spot'
                });
            });
    });

    it('updates a files json', () => {
        return updateJSON('./dog.json', { name: 'rover' })
            .then(data => {
                expect(fs.readFile)
                    .toHaveBeenCalledWith('./dog.json');
                expect(fs.writeFile)
                    .toHaveBeenCalledWith('./dog.json', '{"name":"rover"}');
                expect(data).toEqual({
                    name: 'rover'
                });
            });
    });

    it('makes a directory and all parent directories', () => {
        return mkdirp('./cooldirectory/dirp')
            .then(() => {
                expect(fs.mkdir)
                    .toHaveBeenCalledWith('./cooldirectory/dirp', { recursive: true });
            });
    });


    it('reads a directory of json', () => {
        return readDirectoryJSON('./data')
            .then(data => {
                expect(fs.readdir)
                    .toHaveBeenCalledWith('./data');
                expect(fs.readFile)
                    .toHaveBeenCalledWith('./data/dog.json');
                expect(fs.readFile)
                    .toHaveBeenCalledWith('./data/dog2.json');
                expect(data).toEqual([
                    { name: 'spot' },
                    { name: 'spot' }
                ]);
            });
    });

    it('deletes a file', () => {
        return deleteFile('./dog.json')
            .then(() => {
                expect(fs.unlink).toHaveBeenCalledWith('./dog.json');
            });
    });
});