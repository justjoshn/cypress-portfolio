import PageObjects from '../support/page-objects/pageObjects';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

describe('REST API Tests', () => {
  const pageObjects = new PageObjects();
  it('get all posts', () => {
    pageObjects.getAllPosts().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length(100);
      response.body.forEach((item: Post) => {
        expect(item).to.have.all.keys('id', 'title', 'body', 'userId');
      });
    });
  });
  it('get first post', () => {
    pageObjects.getFirstPost().then((response) => {
      expect(response.status).to.eq(200);
      const item: Post = response.body;
      expect(item).to.have.all.keys('id', 'title', 'body', 'userId');
    });
  });
  it('get first post comments', () => {
    pageObjects.getFirstPostComments().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length(5);
      response.body.forEach((item: Post) => {
        expect(item).to.have.all.keys('postId', 'id', 'name', 'email', 'body');
      });
    });
  });
  it('delete first post', () => {
    pageObjects.deleteFirstPost().then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
