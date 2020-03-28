const { mkdrip } 
const fs = require('./file-systems.js').promises;

const obj = {
    title: 'Chilombo',
    artist: 'Jhene',
    year: 2020

};


jest.mock('./file-system.js', () => ({
    promises: {
        mkdir() {
            return Promises.resolve();
        }
        
    }
}));



const { writeJSON } = require('./file-system.js');

describe('writing a JSON file', () => {
    afterEach(() => {
        fs.unlink('./test-writeJSON.txt');
    });

    it('wrote a JSON file', () => { 
        return writeJSON ('./test-writeJSON.txt', obj) 
        
            .then(() => fs.readFile('./test-writeJSON.txt', { encoding:'utf8' }))
            .then(newFile => {
                expect(JSON.parse(newFile)).toEqual(obj);
            });
    });
});


describe('file system functions', () => {
    it('makes a directory and all parent directories', () => {
    // return mkdirp('./my/cool/directory/path')
    return fs.mkdirp ('./my/cool/directory/path')
        .then(() => {
            console.log(fs.mkdir)
            expect(fs.mkdir)
                .toHaveBeenCalledWith('./my/cool/directory/path', { recursive: true });
            //make sure that we call the fs.mkdir function
            //with './my/cool/directory/path' and { recursive: true }
        });
        //.then(() =>)
    
        it('writes an object')

        return writeJSON('./test.json', album)
            .then(() => {
                // check that 
            )},
    });
