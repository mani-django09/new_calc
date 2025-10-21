const express = require('express');
const router = express.Router();
const calculatorController = require('../controllers/calculatorController');
const { validate } = require('../middleware/validator');
const schemas = require('../middleware/validationSchemas');

// Calculator Routes
router.post('/cgpa-calculator', validate(schemas.cgpaSchema), calculatorController.calculateCGPA);
router.post('/name-numerology', validate(schemas.nameNumerologySchema), calculatorController.calculateNameNumerology);
router.post('/share-average', validate(schemas.shareAverageSchema), calculatorController.calculateShareAverage);
router.post('/cgpa-to-percentage', validate(schemas.cgpaToPercentageSchema), calculatorController.cgpaToPercentage);
router.post('/marks-percentage', validate(schemas.marksPercentageSchema), calculatorController.calculateMarksPercentage);
router.post('/percentage-to-cgpa', validate(schemas.percentageToCGPASchema), calculatorController.percentageToCGPA);
router.post('/snow-day', validate(schemas.snowDaySchema), calculatorController.calculateSnowDay);
router.post('/mortgage-payoff', validate(schemas.mortgagePayoffSchema), calculatorController.calculateMortgagePayoff);
router.post('/palworld-breeding', validate(schemas.palworldBreedingSchema), calculatorController.calculatePalworldBreeding);
router.post('/mortgage-overpayment', validate(schemas.mortgageOverpaymentSchema), calculatorController.calculateMortgageOverpayment);
router.post('/crs-calculator', validate(schemas.crsSchema), calculatorController.calculateCRS);
router.post('/crs-score', validate(schemas.crsScoreSchema), calculatorController.calculateCRSScore);

// Get calculator metadata (for SEO)
router.get('/metadata/:calculator', calculatorController.getMetadata);

module.exports = router;