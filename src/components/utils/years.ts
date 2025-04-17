const currentYear = new Date().getFullYear()
export const years = Array.from({ length: 120 }, (_, i) => currentYear - i)
