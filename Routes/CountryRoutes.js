const express = require("express");
const router = express.Router();
const {
  CreateCountry,
  SoftDeleteCountry,
  HardDeleteCountry,
  GetDeletedCountry,
  GetSingleCountry,
  GetCountryListing,
  EditCountry,
  RestoreSoftDeleteCountry
} = require("../Controller/CountryController");

router.route("/CreateCountry").post(CreateCountry);
router.route("/SoftDeleteCountry/:id").delete(SoftDeleteCountry);
router.route("/HardDeleteCountry/:id").delete(HardDeleteCountry);
router.route("/GetSingleCountry/:id").get(GetSingleCountry);
router.route("/GetCountryListing").get(GetCountryListing);
router.route("/GetDeletedCountry").get(GetDeletedCountry);
router.route("/EditCountry/:id").put(EditCountry);
router.route("/RestoreSoftDeleteCountry/:id").get(RestoreSoftDeleteCountry);

module.exports = router;
