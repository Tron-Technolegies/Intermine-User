export function getRemainingDays(warrantyEndDate) {
  if (!warrantyEndDate) return 0;

  const now = new Date();
  const endDate = new Date(warrantyEndDate);
  // Difference in milliseconds
  const diffMs = endDate.getTime() - now.getTime();

  // Convert to days
  const remainingDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  // If already expired, return 0
  return remainingDays > 0 ? remainingDays : 0;
}
