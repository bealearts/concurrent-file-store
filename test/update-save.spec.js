
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import cfs from '../';

chai.use(chaiAsPromised);
const expect = chai.expect;


describe('update and save', () => {
    let store;
    let id;

    beforeEach(() => {
        store = cfs('./store');

        return store.create({
            count: 0
        })
            .then((obj) => {
                id = obj.id;
            });
    });

    it('returns an obj for an id', () => {
        const result = store.update(id)
            .then(store.save);

        return expect(result).to.become({
            id,
            count: 0
        });
    });

    it('saves an object to the store', () => {
        const result = store.update(id)
            .then((obj) => {
                obj.count++; // eslint-disable-line no-param-reassign
                return obj;
            })
            .then(store.save);

        return expect(result).to.become({
            id,
            count: 1
        });
    });
});
