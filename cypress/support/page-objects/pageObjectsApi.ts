class PageObjects {
  static readonly BASE_URL = 'https://jsonplaceholder.typicode.com';
  static readonly ALL_POSTS_URL = `${PageObjects.BASE_URL}/posts`;
  static readonly INVALID_URL = `${PageObjects.BASE_URL}/postss`;
  static readonly FIRST_POST_URL = `${PageObjects.BASE_URL}/posts/1`;
  static readonly INVALID_POST_URL = `${PageObjects.BASE_URL}/posts/999999`;

  getAllPosts() {
    return cy.api('GET', PageObjects.ALL_POSTS_URL);
  }

  getInvalidEndpoint() {
    return cy.api({
      method: 'GET',
      url: PageObjects.INVALID_URL,
      failOnStatusCode: false,
    });
  }

  getFirstPost() {
    return cy.api('GET', PageObjects.FIRST_POST_URL);
  }

  getInvalidPost() {
    return cy.api({
      method: 'GET',
      url: PageObjects.INVALID_POST_URL,
      failOnStatusCode: false,
    });
  }

  postPosts() {
    return cy.api({
      method: 'POST',
      url: PageObjects.ALL_POSTS_URL,
      body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }

  putPosts() {
    return cy.api({
      method: 'PUT',
      url: PageObjects.FIRST_POST_URL,
      body: JSON.stringify({
        id: 1,
        title: 'foo',
        body: 'bar',
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }

  deleteFirstPost() {
    return cy.api('DELETE', PageObjects.FIRST_POST_URL);
  }
}
export default PageObjects;
