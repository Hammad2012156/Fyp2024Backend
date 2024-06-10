const express = require("express");
const router = express.Router();
const {
  CreateCity,
  SoftDeleteCity,
  HardDeleteCity,
  GetDeletedCity,
  GetSingleCity,
  GetCityListing,
  CityWithRespectToCountry,
  EditCity,
  RestoreSoftDeleteCity
} = require("../Controller/CityController");

router.route("/CreateCity").post(CreateCity);
router.route("/SoftDeleteCity/:id").delete(SoftDeleteCity);
router.route("/HardDeleteCity/:id").delete(HardDeleteCity);
router.route("/GetSingleCity/:id").get(GetSingleCity);
router.route("/GetCityListing").get(GetCityListing);
router.route("/CityWithRespectToCountry").get(CityWithRespectToCountry);
router.route("/GetDeletedCity/deleted").get(GetDeletedCity);
router.route("/EditCity/:id").put(EditCity);
router.route("/RestoreSoftDeleteCity/:id").get(RestoreSoftDeleteCity);

module.exports = router;
