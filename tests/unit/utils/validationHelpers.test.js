import { assert } from "chai";
import { isEmptyArray } from "../../../app/utils/validationHelpers";

describe("isEmptyArray()", function() {
  let emptyArray;
  let undefinedArray;
  let nullArray;
  let realArray;

  before(function() {
    console.log("Starting validationHelpers test suite.");
    console.log("Loading testing data...");
    emptyArray = [];
    undefinedArray = undefined;
    nullArray = null;
    realArray = [1, 2, 3];
  });

  describe("error cases", () => {
    it("should return true on empty array.", function() {
      assert.equal(true, isEmptyArray(emptyArray));
    });

    it("should return true on undefined array.", function() {
      assert.equal(true, isEmptyArray(undefinedArray));
    });

    it("should return true on null array.", function() {
      assert.equal(true, isEmptyArray(nullArray));
    });
  });

  it("happy case", function() {
    assert.equal(false, isEmptyArray(realArray));
  });

  after(function() {
    console.log("validationHelpers test suite completed.");
  });
});
