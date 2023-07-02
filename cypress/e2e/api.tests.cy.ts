import PageObjects from '../support/page-objects/pageObjectsApi';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

describe('REST API Tests', () => {
  const pageObjects = new PageObjects();

  it('GET /posts: verify status code is 200', () => {
    pageObjects.requestGetAllPosts().then((response) => {
      expect(response.status).to.eq(200);
    });
  });
  it('GET /posts: verify the response payload contains the expected keys', () => {
    pageObjects.requestGetAllPosts().then((response) => {
      response.body.forEach((item: Post) => {
        expect(item).to.have.all.keys('id', 'title', 'body', 'userId');
      });
    });
  });
  it('GET /posts: verify the response time is less than 200', () => {
    pageObjects.requestGetAllPosts().then((response) => {
      expect(response.duration).to.be.lessThan(200);
    });
  });
  it('GET /postss: verify the server returns a 404 status code for invalid endpoint', () => {
    pageObjects.requestGetInvalidEndpoint().then((response) => {
      expect(response.status).to.eq(404);
    });
  });
  it('GET /posts/1: verify the status code is 200', () => {
    pageObjects.requestGetFirstPost().then((response) => {
      expect(response.status).to.eq(200);
    });
  });
  it('GET /posts/1: verify the response payload contains the expected keys', () => {
    pageObjects.requestGetFirstPost().then((response) => {
      const item: Post = response.body;
      expect(item).to.have.all.keys('id', 'title', 'body', 'userId');
    });
  });
  it('GET /posts/1: verify the response time is less than 200', () => {
    pageObjects.requestGetFirstPost().then((response) => {
      expect(response.duration).to.be.lessThan(200);
    });
  });
  it('GET /posts/999999: request a post with an id that doesnt exist and verify the server returns a 404 status code', () => {
    pageObjects.requestGetInvalidPost().then((response) => {
      expect(response.status).to.eq(404);
    });
  });
  it('POST /posts: verify the status code is 201', () => {
    pageObjects.requestPostPosts().then((response) => {
      expect(response.status).to.eq(201);
    });
  });
  it('POST /posts: verify the response payload reflects the data posted', () => {
    pageObjects.requestPostPosts().then((response) => {
      const item: Post = response.body;
      expect(item).to.have.all.keys('id', 'title', 'body', 'userId');
      expect(item.id).to.not.be.null;
      expect(item.title).to.not.be.null;
      expect(item.body).to.not.be.null;
      expect(item.userId).to.not.be.null;
      expect(item.id).to.not.eq(0);
      expect(item.title).to.not.be.empty;
      expect(item.body).to.not.be.empty;
      expect(item.userId).to.not.eq(0);
      expect(item.id).to.be.a('number');
      expect(item.title).to.be.a('string');
      expect(item.body).to.be.a('string');
      expect(item.userId).to.be.a('number');
    });
  });
  it('PUT /posts/1: verify the status code is 200', () => {
    pageObjects.requestPutPosts().then((response) => {
      expect(response.status).to.eq(200);
    });
  });
  it('PUT /posts/1: verify the updated data is correctly reflected ', () => {
    pageObjects.requestPutPosts().then((response) => {
      const item: Post = response.body;
      expect(item).to.have.all.keys('id', 'title', 'body', 'userId');
      expect(item.id).to.eq(1);
      expect(item.title).to.eq('foo');
      expect(item.body).to.eq('bar');
      expect(item.userId).to.eq(1);
    });
  });
  it('DELETE /posts/1: verify the status code is 200', () => {
    pageObjects.requestDeleteFirstPost().then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
