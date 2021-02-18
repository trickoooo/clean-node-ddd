const { expect } = require('chai');
const DeleteUser = require('src/app/user/DeleteUser');

describe('App :: User :: DeleteUser', () => {
  let deleteUser;

  context('when user exists', () => {
    before(() => {
      const MockUsersRepository = {
        remove: () => Promise.resolve()
      };

      deleteUser = new DeleteUser({
        usersRepository: MockUsersRepository
      });

    });

    it('deletes the user and emits SUCCESS with no payload', (done) => {
      deleteUser.on(deleteUser.outputs.SUCCESS, (response) => {
        expect(response).to.be.undefined();
        done();
      });
    
      deleteUser.execute(187);

    });

  });

  context('when user does not exist', () => {
    before(() => {
      const MockUsersRepository = {
        remove: () => Promise.reject(new Error('NotFoundError'))
      };

      deleteUser = new DeleteUser({
        usersRepository: MockUsersRepository
      });

    });

    it('emits NOT_FOUND with the error', (done) => {
      deleteUser.on(deleteUser.outputs.NOT_FOUND, (response) => {
        expect(response.message).to.equal('NotFoundError');
        done();
      });

      deleteUser.execute(187);
    });

  });

});