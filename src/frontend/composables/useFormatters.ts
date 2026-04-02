export function formatCurrency(value: number | string): string {
  const numValue = typeof value === 'string' ? parseFloat(value) : value
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(numValue)
}

export function formatDate(date: string | Date, format: 'short' | 'long' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  
  if (format === 'long') {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(d)
  }
  
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(d)
}

export function formatMonth(month: number, year: number): string {
  const date = new Date(year, month - 1)
  return new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
    year: 'numeric'
  }).format(date)
}

export function getDayName(day: number): string {
  const date = new Date()
  date.setDate(day)
  return new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(date)
}

export function getOrdinalSuffix(day: number): string {
  if (day === 1 || day === 31) return 'º'
  if (day >= 2 && day <= 30) return 'º'
  return 'º'
}
