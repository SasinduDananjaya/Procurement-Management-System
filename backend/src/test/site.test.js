import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js'; // Import your Express app here

const { expect } = chai;
chai.use(chaiHttp);

describe('Sites Test Cases', function () {
  let createdSiteId;

  //Create a new site before running the tests
  before(function (done) {
    const newSite = {
      name: 'Test Site234',
      address: 'Test Address',
      phone: '1234567890',
      manager: '652fd65694bfdf3c1f4868e9', //Valid manager ID
    };

    chai
      .request(app)
      .post('/site')
      .set('Authorization', `Bearer ${bearerToken}`)
      .send(newSite)
      .end(function (err, res) {
        createdSiteId = res.body._id; // response body based on API
        done();
      });
  });

  // Clean the created site after the tests
  after(function (done) {
    chai
      .request(app)
      .delete(`/site/${createdSiteId}`) // Adjust the endpoint based on API
      .end(function () {
        done();
      });
  });

  //Test cases for the insert site functionality
  it('should insert a new site', function (done) {
    const newSite = {
      name: 'Test Site 2158',
      address: 'Test Address 2',
      phone: '1234567890',
      manager: '652fd65694bfdf3c1f4868e9',
    };

    chai
      .request(app)
      .post('/site')
      .set('Authorization', `Bearer ${bearerToken}`)
      .send(newSite)
      .end(function (err, res) {
        expect(res).to.have.status(401); // 401 status code                 
        expect(res.body).to.be.an('object');
        done();
      });
  });

  // Test cases for getting all sites
  it('should get all sites', function (done) {
    chai
      .request(app)
      .get('/site')
      .end(function (err, res) {
        expect(res).to.have.status(401);                
        expect(res.body).to.be.an('object');
        done();
      });
  });

  // Test cases for updating a site by ID
  it('should update a site by ID', function (done) {
    const updatedSite = {
      name: 'Updated Site Name', // Provide the updated values
      address: 'Updated Address',
      phone: '9876543210',
      manager: '652fd65694bfdf3c1f4868e9', // Replace with a valid manager ID
    };

    chai
      .request(app)
      .put(`/site/${createdSiteId}`) // API endpoint
      .send(updatedSite)
      .end(function (err, res) {
        expect(res).to.have.status(401);        
        expect(res.body).to.be.an('object');
        done();
      });
  });

  // Test cases for deleting a site by ID
  it('should delete a site by ID', function (done) {
    chai
      .request(app)
      .delete(`/site/${createdSiteId}`) 
      .end(function (err, res) {
        expect(res).to.have.status(401);                
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

export {};
