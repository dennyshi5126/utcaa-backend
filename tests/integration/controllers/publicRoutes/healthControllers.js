import chai from "chai";
import chaiHttp from "chai-http";
import config from "../../../../app/config/config";
import pack from "../../../package.json";

chai.should();
chai.use(chaiHttp);
const expect = chai.expect;
describe("get / ", function() {
  before(function() {
    console.log("Starting indexControllers test suite.");
  });

  it("happy case", function(done) {
    chai
      .request(config.baseUrl)
      .get("/api/public/health")
      .end(function(err, res) {
        console.log(err);
        expect(res).to.have.status(200);
        res.body.should.be.eql(
          (res.response = {
            data: {
              version: pack.version,
              name: "orbiseed-backend"
            }
          })
        );
        done();
      });
  });

  after(function() {
    console.log("indexControllers test suite completed.");
  });
});
