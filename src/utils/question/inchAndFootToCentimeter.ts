export function inchAndFootToCentimeter(inch: any, foot: any): boolean {
  // 1 foot = 30.48 centimeters
  // 1 inch = 2.54 centimeters
  const totalInches: number = Number(inch) + Number(foot) * 12; // Convert foot to inches
  const totalCentimeters: number = totalInches * 2.54; 
  // Convert inches to centimeters
  return totalCentimeters >= 90;
}
