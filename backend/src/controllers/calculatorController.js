// CGPA Calculator
exports.calculateCGPA = (req, res) => {
  try {
    const { grades, credits } = req.body;

    let totalPoints = 0;
    let totalCredits = 0;
    const breakdown = [];

    for (let i = 0; i < grades.length; i++) {
      const grade = parseFloat(grades[i]);
      const credit = parseFloat(credits[i]);
      const points = grade * credit;
      
      totalPoints += points;
      totalCredits += credit;

      breakdown.push({
        grade: grade.toFixed(2),
        credit: credit.toFixed(0),
        points: points.toFixed(2)
      });
    }

    const cgpa = (totalPoints / totalCredits).toFixed(2);

    res.json({
      success: true,
      data: {
        cgpa,
        totalCredits: totalCredits.toFixed(0),
        breakdown
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Calculation failed',
      message: error.message 
    });
  }
};

// CGPA to Percentage Calculator
exports.cgpaToPercentage = (req, res) => {
  try {
    const { cgpa, scale } = req.body;

    const cgpaValue = parseFloat(cgpa);
    const scaleValue = parseFloat(scale);

    let percentage;
    let formula;
    
    // 10-point scale conversion
    if (scaleValue === 10) {
      percentage = (cgpaValue * 9.5).toFixed(2);
      formula = 'Percentage = CGPA × 9.5';
    } 
    // 4-point scale conversion
    else if (scaleValue === 4) {
      percentage = ((cgpaValue / 4) * 100).toFixed(2);
      formula = 'Percentage = (CGPA ÷ 4) × 100';
    } 
    else {
      return res.status(400).json({ 
        success: false,
        error: 'Only 10-point and 4-point scales are supported' 
      });
    }

    // Determine letter grade and classification
    const percentageNum = parseFloat(percentage);
    let letterGrade, performance, classification;
    
    if (percentageNum >= 85) {
      letterGrade = 'A+';
      performance = 'Outstanding';
      classification = 'First Class with Distinction';
    } else if (percentageNum >= 75) {
      letterGrade = 'A';
      performance = 'Excellent';
      classification = 'First Class';
    } else if (percentageNum >= 65) {
      letterGrade = 'B+';
      performance = 'Very Good';
      classification = 'Second Class (Upper Division)';
    } else if (percentageNum >= 55) {
      letterGrade = 'B';
      performance = 'Good';
      classification = 'Second Class (Lower Division)';
    } else if (percentageNum >= 50) {
      letterGrade = 'C';
      performance = 'Average';
      classification = 'Third Class';
    } else if (percentageNum >= 40) {
      letterGrade = 'D';
      performance = 'Satisfactory';
      classification = 'Pass Class';
    } else {
      letterGrade = 'F';
      performance = 'Not Satisfactory';
      classification = 'Fail';
    }

    res.json({
      success: true,
      data: {
        cgpa: cgpaValue.toFixed(2),
        scale: scaleValue,
        percentage: parseFloat(percentage),
        letterGrade,
        performance,
        classification,
        formula
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Calculation failed',
      message: error.message 
    });
  }
};

// Marks Percentage Calculator
exports.calculateMarksPercentage = (req, res) => {
  try {
    const { obtainedMarks, totalMarks } = req.body;

    const obtained = parseFloat(obtainedMarks);
    const total = parseFloat(totalMarks);

    const percentage = ((obtained / total) * 100).toFixed(2);
    const percentageNum = parseFloat(percentage);

    // Determine grade
    let grade, status;
    if (percentageNum >= 90) {
      grade = 'A+';
      status = 'Outstanding';
    } else if (percentageNum >= 80) {
      grade = 'A';
      status = 'Excellent';
    } else if (percentageNum >= 70) {
      grade = 'B';
      status = 'Very Good';
    } else if (percentageNum >= 60) {
      grade = 'C';
      status = 'Good';
    } else if (percentageNum >= 50) {
      grade = 'D';
      status = 'Average';
    } else if (percentageNum >= 40) {
      grade = 'E';
      status = 'Pass';
    } else {
      grade = 'F';
      status = 'Fail';
    }

    res.json({
      success: true,
      data: {
        obtainedMarks: obtained,
        totalMarks: total,
        percentage: parseFloat(percentage),
        grade,
        status
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Calculation failed',
      message: error.message 
    });
  }
};

// Percentage to CGPA Calculator
exports.percentageToCGPA = (req, res) => {
  try {
    const { percentage, scale } = req.body;

    const percentageValue = parseFloat(percentage);
    const scaleValue = parseFloat(scale);

    let cgpa;
    let formula;
    
    // 10-point scale conversion
    if (scaleValue === 10) {
      cgpa = (percentageValue / 9.5).toFixed(2);
      formula = 'CGPA = Percentage ÷ 9.5';
    } 
    // 4-point scale conversion
    else if (scaleValue === 4) {
      cgpa = ((percentageValue / 100) * 4).toFixed(2);
      formula = 'CGPA = (Percentage ÷ 100) × 4';
    }

    // Ensure CGPA doesn't exceed scale
    if (parseFloat(cgpa) > scaleValue) {
      cgpa = scaleValue.toFixed(2);
    }

    res.json({
      success: true,
      data: {
        percentage: percentageValue,
        scale: scaleValue,
        cgpa: parseFloat(cgpa),
        formula
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Calculation failed',
      message: error.message 
    });
  }
};

// Name Numerology Calculator
exports.calculateNameNumerology = (req, res) => {
  try {
    const { name } = req.body;

    const numerologyMap = {
      a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
      j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
      s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
    };

    const cleanName = name.toLowerCase().replace(/[^a-z]/g, '');
    let sum = 0;
    const breakdown = [];

    for (let char of cleanName) {
      const value = numerologyMap[char] || 0;
      sum += value;
      breakdown.push({ letter: char.toUpperCase(), value });
    }

    // Reduce to single digit (except master numbers 11, 22, 33)
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
    }

    const meanings = {
      1: 'Leadership, independence, and originality',
      2: 'Cooperation, balance, and diplomacy',
      3: 'Creativity, communication, and expression',
      4: 'Stability, organization, and practicality',
      5: 'Freedom, adventure, and versatility',
      6: 'Responsibility, nurturing, and harmony',
      7: 'Spirituality, analysis, and wisdom',
      8: 'Power, success, and material abundance',
      9: 'Compassion, idealism, and service',
      11: 'Intuition, inspiration, and spiritual insight (Master Number)',
      22: 'Master builder, practical idealism (Master Number)',
      33: 'Master teacher, spiritual guidance (Master Number)'
    };

    res.json({
      success: true,
      data: {
        name,
        nameNumber: sum,
        meaning: meanings[sum],
        breakdown
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Calculation failed',
      message: error.message 
    });
  }
};

// Share Average Calculator
exports.calculateShareAverage = (req, res) => {
  try {
    const { purchases } = req.body;

    let totalShares = 0;
    let totalInvestment = 0;
    const purchaseDetails = [];

    purchases.forEach((purchase, index) => {
      const quantity = parseFloat(purchase.quantity);
      const price = parseFloat(purchase.price);
      const investment = quantity * price;

      totalShares += quantity;
      totalInvestment += investment;

      purchaseDetails.push({
        purchaseNumber: index + 1,
        quantity,
        price,
        investment: investment.toFixed(2)
      });
    });

    const averagePrice = (totalInvestment / totalShares).toFixed(2);

    res.json({
      success: true,
      data: {
        totalShares,
        totalInvestment: totalInvestment.toFixed(2),
        averagePrice,
        purchaseDetails
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Calculation failed',
      message: error.message 
    });
  }
};

// Snow Day Calculator
exports.calculateSnowDay = (req, res) => {
  try {
    const { snowfall, temperature, windSpeed, location } = req.body;

    let probability = 0;

    // Snowfall factor (0-40 points)
    if (snowfall >= 12) probability += 40;
    else if (snowfall >= 8) probability += 30;
    else if (snowfall >= 6) probability += 20;
    else if (snowfall >= 4) probability += 10;
    else if (snowfall >= 2) probability += 5;

    // Temperature factor (0-25 points)
    if (temperature <= 10) probability += 25;
    else if (temperature <= 20) probability += 15;
    else if (temperature <= 25) probability += 10;
    else if (temperature <= 30) probability += 5;

    // Wind speed factor (0-20 points)
    if (windSpeed >= 40) probability += 20;
    else if (windSpeed >= 30) probability += 15;
    else if (windSpeed >= 20) probability += 10;
    else if (windSpeed >= 15) probability += 5;

    // Location factor (0-15 points)
    const locationFactors = {
      rural: 15,
      suburban: 10,
      urban: 5
    };
    probability += locationFactors[location] || 0;

    // Cap at 100%
    probability = Math.min(probability, 100);

    let likelihood, message;
    if (probability >= 80) {
      likelihood = 'Very High';
      message = 'Pack your sleds! Snow day is very likely!';
    } else if (probability >= 60) {
      likelihood = 'High';
      message = 'Good chance of a snow day! Keep your fingers crossed!';
    } else if (probability >= 40) {
      likelihood = 'Moderate';
      message = 'There\'s a decent chance. Have a backup plan!';
    } else if (probability >= 20) {
      likelihood = 'Low';
      message = 'Unlikely, but stranger things have happened!';
    } else {
      likelihood = 'Very Low';
      message = 'Better pack your backpack. School is on!';
    }

    res.json({
      success: true,
      data: {
        probability,
        likelihood,
        message,
        factors: {
          snowfall: `${snowfall} inches`,
          temperature: `${temperature}°F`,
          windSpeed: `${windSpeed} mph`,
          location: location.charAt(0).toUpperCase() + location.slice(1)
        }
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Calculation failed',
      message: error.message 
    });
  }
};

// Mortgage Payoff Calculator
exports.calculateMortgagePayoff = (req, res) => {
  try {
    const { loanAmount, interestRate, loanTerm, extraPayment } = req.body;

    const principal = parseFloat(loanAmount);
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const numberOfPayments = parseFloat(loanTerm) * 12;
    const extra = parseFloat(extraPayment);

    // Standard monthly payment
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // Without extra payment
    const totalPaid = monthlyPayment * numberOfPayments;
    const totalInterest = totalPaid - principal;

    // With extra payment
    let balance = principal;
    let monthsWithExtra = 0;
    let totalPaidWithExtra = 0;

    while (balance > 0 && monthsWithExtra < numberOfPayments * 2) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment + extra;
      
      if (balance < principalPayment) {
        totalPaidWithExtra += balance + interestPayment;
        balance = 0;
      } else {
        balance -= principalPayment;
        totalPaidWithExtra += monthlyPayment + extra;
      }
      
      monthsWithExtra++;
    }

    const totalInterestWithExtra = totalPaidWithExtra - principal;
    const interestSaved = totalInterest - totalInterestWithExtra;
    const monthsSaved = numberOfPayments - monthsWithExtra;
    const yearsSaved = (monthsSaved / 12).toFixed(1);

    res.json({
      success: true,
      data: {
        monthlyPayment: monthlyPayment.toFixed(2),
        totalPaid: totalPaid.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        withExtraPayment: {
          monthlyPayment: (monthlyPayment + extra).toFixed(2),
          totalPaid: totalPaidWithExtra.toFixed(2),
          totalInterest: totalInterestWithExtra.toFixed(2),
          monthsToPayoff: monthsWithExtra,
          yearsToPayoff: (monthsWithExtra / 12).toFixed(1)
        },
        savings: {
          interestSaved: interestSaved.toFixed(2),
          monthsSaved,
          yearsSaved
        }
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Calculation failed',
      message: error.message 
    });
  }
};

// Mortgage Overpayment Calculator
exports.calculateMortgageOverpayment = (req, res) => {
  try {
    const { loanAmount, interestRate, loanTerm, monthlyOverpayment, yearlyOverpayment } = req.body;

    const principal = parseFloat(loanAmount);
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const numberOfPayments = parseFloat(loanTerm) * 12;
    const monthlyOver = parseFloat(monthlyOverpayment);
    const yearlyOver = parseFloat(yearlyOverpayment);

    // Calculate standard monthly payment
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // Calculate with overpayments
    let balance = principal;
    let month = 0;
    let totalPaid = 0;

    while (balance > 0 && month < numberOfPayments * 2) {
      month++;
      const interestPayment = balance * monthlyRate;
      let principalPayment = monthlyPayment - interestPayment + monthlyOver;
      
      // Add yearly overpayment every 12 months
      if (month % 12 === 0) {
        principalPayment += yearlyOver;
      }

      if (balance <= principalPayment) {
        totalPaid += balance + interestPayment;
        balance = 0;
      } else {
        balance -= principalPayment;
        totalPaid += monthlyPayment + monthlyOver + (month % 12 === 0 ? yearlyOver : 0);
      }
    }

    const totalInterest = totalPaid - principal;
    const standardTotal = monthlyPayment * numberOfPayments;
    const standardInterest = standardTotal - principal;
    const saved = standardInterest - totalInterest;

    res.json({
      success: true,
      data: {
        monthlyPayment: monthlyPayment.toFixed(2),
        monthsToPayoff: month,
        yearsToPayoff: (month / 12).toFixed(1),
        totalInterest: totalInterest.toFixed(2),
        interestSaved: saved.toFixed(2),
        totalSaved: saved.toFixed(2)
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Calculation failed',
      message: error.message 
    });
  }
};

// Palworld Breeding Calculator (Mock data - replace with actual breeding logic)
exports.calculatePalworldBreeding = (req, res) => {
  try {
    const { parent1, parent2 } = req.body;

    // This is mock data - you'll need to implement actual Palworld breeding logic
    res.json({
      success: true,
      data: {
        parent1,
        parent2,
        offspring: 'Mixed Pal',
        rarity: 'Uncommon',
        message: 'Breeding calculation completed'
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Calculation failed',
      message: error.message 
    });
  }
};

// CRS Calculator
exports.calculateCRS = (req, res) => {
  try {
    const data = req.body;
    
    // This is a simplified CRS calculation
    // You'll need to implement the full CRS points system
    
    let score = 0;
    
    // Age points (max 110 for single, 100 for married)
    // Education points (max 150 for single, 140 for married)
    // Language points (max 136 for single, 128 for married)
    // Work experience points (max 80 for single, 70 for married)
    
    // Placeholder calculation
    score = Math.floor(Math.random() * 600);

    res.json({
      success: true,
      data: {
        totalScore: score,
        breakdown: {
          coreHumanCapital: Math.floor(score * 0.5),
          spouseFactors: Math.floor(score * 0.1),
          skillTransferability: Math.floor(score * 0.2),
          additionalPoints: Math.floor(score * 0.2)
        }
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Calculation failed',
      message: error.message 
    });
  }
};

// CRS Score Calculator (Simplified)
exports.calculateCRSScore = (req, res) => {
  try {
    const { age, education, workExperience, languageScore } = req.body;
    
    let score = 0;
    
    // Age points (simplified)
    if (age >= 18 && age <= 35) score += 110;
    else if (age <= 39) score += 105;
    else if (age <= 44) score += 95;
    else score += 50;
    
    // Education (simplified mapping)
    const eduPoints = {
      'secondary': 30,
      'one-year': 90,
      'two-year': 98,
      'bachelor': 120,
      'master': 135,
      'phd': 150
    };
    score += eduPoints[education] || 0;
    
    // Work experience
    score += Math.min(workExperience * 15, 80);
    
    // Language
    score += Math.min(languageScore, 136);

    res.json({
      success: true,
      data: {
        totalScore: score,
        breakdown: {
          age: age >= 18 && age <= 35 ? 110 : 50,
          education: eduPoints[education] || 0,
          workExperience: Math.min(workExperience * 15, 80),
          language: Math.min(languageScore, 136)
        }
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Calculation failed',
      message: error.message 
    });
  }
};

// Get Calculator Metadata
exports.getMetadata = (req, res) => {
  const { calculator } = req.params;
  
  const metadata = {
    'cgpa-calculator': {
      title: 'CGPA Calculator',
      description: 'Calculate your cumulative grade point average',
      category: 'education'
    },
    'cgpa-to-percentage': {
      title: 'CGPA to Percentage Calculator',
      description: 'Convert CGPA to percentage instantly',
      category: 'education'
    }
    // Add more metadata as needed
  };

  if (metadata[calculator]) {
    res.json({ success: true, data: metadata[calculator] });
  } else {
    res.status(404).json({ success: false, error: 'Calculator not found' });
  }
};