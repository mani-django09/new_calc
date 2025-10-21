const Joi = require('joi');

// CGPA Calculator Schema
const cgpaSchema = Joi.object({
  grades: Joi.array()
    .items(Joi.number().min(0).max(10).required())
    .min(1)
    .required()
    .messages({
      'array.min': 'At least one grade is required',
      'number.min': 'Grade must be at least 0',
      'number.max': 'Grade must not exceed 10'
    }),
  credits: Joi.array()
    .items(Joi.number().min(0.5).required())
    .min(1)
    .required()
    .messages({
      'array.min': 'At least one credit is required',
      'number.min': 'Credit must be at least 0.5'
    })
});

// CGPA to Percentage Schema
const cgpaToPercentageSchema = Joi.object({
  cgpa: Joi.number()
    .min(0)
    .max(10)
    .required()
    .messages({
      'number.base': 'CGPA must be a number',
      'number.min': 'CGPA must be at least 0',
      'number.max': 'CGPA must not exceed 10',
      'any.required': 'CGPA is required'
    }),
  scale: Joi.number()
    .valid(4, 10)
    .required()
    .messages({
      'any.only': 'Scale must be either 4 or 10',
      'any.required': 'Scale is required'
    })
}).custom((value, helpers) => {
  // Validate CGPA is within the selected scale
  if (value.cgpa > value.scale) {
    return helpers.error('any.invalid', { 
      message: `CGPA cannot exceed ${value.scale} for ${value.scale}-point scale` 
    });
  }
  return value;
});

// Marks Percentage Schema
const marksPercentageSchema = Joi.object({
  obtainedMarks: Joi.number()
    .min(0)
    .required()
    .messages({
      'number.base': 'Obtained marks must be a number',
      'number.min': 'Obtained marks cannot be negative',
      'any.required': 'Obtained marks is required'
    }),
  totalMarks: Joi.number()
    .min(1)
    .required()
    .messages({
      'number.base': 'Total marks must be a number',
      'number.min': 'Total marks must be at least 1',
      'any.required': 'Total marks is required'
    })
}).custom((value, helpers) => {
  if (value.obtainedMarks > value.totalMarks) {
    return helpers.error('any.invalid', { 
      message: 'Obtained marks cannot exceed total marks' 
    });
  }
  return value;
});

// Percentage to CGPA Schema
const percentageToCGPASchema = Joi.object({
  percentage: Joi.number()
    .min(0)
    .max(100)
    .required()
    .messages({
      'number.base': 'Percentage must be a number',
      'number.min': 'Percentage must be at least 0',
      'number.max': 'Percentage cannot exceed 100',
      'any.required': 'Percentage is required'
    }),
  scale: Joi.number()
    .valid(4, 10)
    .required()
    .messages({
      'any.only': 'Scale must be either 4 or 10',
      'any.required': 'Scale is required'
    })
});

// Name Numerology Schema
const nameNumerologySchema = Joi.object({
  name: Joi.string()
    .min(1)
    .max(100)
    .pattern(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      'string.pattern.base': 'Name must contain only letters and spaces',
      'string.min': 'Name must be at least 1 character',
      'string.max': 'Name must not exceed 100 characters',
      'any.required': 'Name is required'
    })
});

// Share Average Calculator Schema
const shareAverageSchema = Joi.object({
  purchases: Joi.array()
    .items(
      Joi.object({
        quantity: Joi.number().min(1).required(),
        price: Joi.number().min(0.01).required()
      })
    )
    .min(1)
    .required()
    .messages({
      'array.min': 'At least one purchase is required'
    })
});

// Snow Day Calculator Schema
const snowDaySchema = Joi.object({
  snowfall: Joi.number()
    .min(0)
    .max(100)
    .required()
    .messages({
      'number.min': 'Snowfall cannot be negative',
      'number.max': 'Snowfall value too high'
    }),
  temperature: Joi.number()
    .min(-50)
    .max(50)
    .required(),
  windSpeed: Joi.number()
    .min(0)
    .max(200)
    .required(),
  location: Joi.string()
    .valid('urban', 'suburban', 'rural')
    .required()
});

// Mortgage Payoff Schema
const mortgagePayoffSchema = Joi.object({
  loanAmount: Joi.number()
    .min(1000)
    .required()
    .messages({
      'number.min': 'Loan amount must be at least 1000'
    }),
  interestRate: Joi.number()
    .min(0.1)
    .max(30)
    .required()
    .messages({
      'number.min': 'Interest rate must be at least 0.1%',
      'number.max': 'Interest rate cannot exceed 30%'
    }),
  loanTerm: Joi.number()
    .min(1)
    .max(50)
    .required()
    .messages({
      'number.min': 'Loan term must be at least 1 year',
      'number.max': 'Loan term cannot exceed 50 years'
    }),
  extraPayment: Joi.number()
    .min(0)
    .required()
    .messages({
      'number.min': 'Extra payment cannot be negative'
    })
});

// Mortgage Overpayment Schema
const mortgageOverpaymentSchema = Joi.object({
  loanAmount: Joi.number().min(1000).required(),
  interestRate: Joi.number().min(0.1).max(30).required(),
  loanTerm: Joi.number().min(1).max(50).required(),
  monthlyOverpayment: Joi.number().min(0).required(),
  yearlyOverpayment: Joi.number().min(0).required()
});

// Palworld Breeding Schema
const palworldBreedingSchema = Joi.object({
  parent1: Joi.string().required(),
  parent2: Joi.string().required()
});

// CRS Calculator Schema
const crsSchema = Joi.object({
  age: Joi.number().min(18).max(100).required(),
  education: Joi.string().required(),
  languageTest: Joi.object({
    type: Joi.string().valid('IELTS', 'CELPIP', 'TEF', 'TCF').required(),
    listening: Joi.number().min(0).required(),
    reading: Joi.number().min(0).required(),
    writing: Joi.number().min(0).required(),
    speaking: Joi.number().min(0).required()
  }).required(),
  workExperience: Joi.number().min(0).max(20).required(),
  canadianWorkExperience: Joi.number().min(0).max(10).required(),
  hasJobOffer: Joi.boolean().required(),
  provincialNomination: Joi.boolean().required(),
  spouseInfo: Joi.object({
    hasSpouse: Joi.boolean().required(),
    education: Joi.string().allow('', null),
    languageTest: Joi.object({
      type: Joi.string().valid('IELTS', 'CELPIP', 'TEF', 'TCF', '').allow('', null),
      listening: Joi.number().min(0).allow(null),
      reading: Joi.number().min(0).allow(null),
      writing: Joi.number().min(0).allow(null),
      speaking: Joi.number().min(0).allow(null)
    }).allow(null),
    canadianWorkExperience: Joi.number().min(0).allow(null)
  }).required()
});

// CRS Score Schema (simplified version)
const crsScoreSchema = Joi.object({
  age: Joi.number().min(18).max(100).required(),
  education: Joi.string().required(),
  workExperience: Joi.number().min(0).max(20).required(),
  languageScore: Joi.number().min(0).max(136).required()
});

module.exports = {
  cgpaSchema,
  cgpaToPercentageSchema,
  marksPercentageSchema,
  percentageToCGPASchema,
  nameNumerologySchema,
  shareAverageSchema,
  snowDaySchema,
  mortgagePayoffSchema,
  mortgageOverpaymentSchema,
  palworldBreedingSchema,
  crsSchema,
  crsScoreSchema
};