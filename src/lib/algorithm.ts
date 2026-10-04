import { Phone, Answers } from "../types";

export function recommendPhones(phones: Phone[], answers: Answers): { best: Phone | null, secondBest: Phone | null } {
  // 1. Filter
  let filtered = phones.filter(p => p.priceBucket === answers.priceBucket);
  if (answers.brandPreference && answers.brandPreference !== 'Any') {
    filtered = filtered.filter(p => p.brand.toLowerCase() === answers.brandPreference.toLowerCase());
  }
  
  if (filtered.length === 0) {
     return { best: null, secondBest: null };
  }

  // 2. Score
  const scored = filtered.map(phone => {
    let score = 0;
    
    answers.useCases.forEach(useCase => {
      switch (useCase) {
        case 'light gaming':
          score += (phone.performance * 1.5) + (phone.battery * 1.2);
          break;
        case 'heavy gaming':
          score += (phone.performance * 3) + (phone.battery * 1.5) + (phone.display * 1.2);
          break;
        case 'basic use':
          score += (phone.battery * 2) + phone.display;
          break;
        case 'multimedia consumption':
          score += (phone.display * 3) + (phone.battery * 2);
          break;
        case 'content creation':
          score += (phone.camera * 3) + (phone.performance * 2);
          break;
      }
    });
    
    return { ...phone, matchScore: score };
  });

  // 3. Sort descending
  scored.sort((a, b) => b.matchScore - a.matchScore);

  return {
    best: scored[0],
    secondBest: scored.length > 1 ? scored[1] : null
  };
}
