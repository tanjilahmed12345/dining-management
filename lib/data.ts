// Mock data for the dining management system

export type User = {
    id: string
    name: string
    email: string
    role: "user" | "admin"
  }
  
  // Update the MenuItem type to include an "active" field
  export type MenuItem = {
    id: string
    name: string
    description: string
    date: string
    dayOfWeek?: string
    mealType?: string
    active?: boolean
  }
  
  export type Confirmation = {
    id: string
    userId: string
    menuItemId: string
    date: string
    confirmed: boolean
    adminApproval?: boolean
  }
  
  export type Bill = {
    id: string
    userId: string
    month: string
    year: string
    amount: number
    paid: boolean
    mealCount: number
  }
  
  export type MealRating = {
    id: string
    userId: string
    menuItemId: string
    rating: number
    feedback?: string
  }
  
  // New types for Accounts Management
  export type IncomeTransaction = {
    id: string
    date: string
    description: string
    userId: string
    amount: number
    paymentMethod?: string
  }
  
  export type ExpenseTransaction = {
    id: string
    date: string
    description: string
    amount: number
    category?: string
    paymentMethod?: string
  }
  
  // Mock users
  export const users: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "user",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "user",
    },
    {
      id: "3",
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
    },
    {
      id: "4",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "user",
    },
    {
      id: "5",
      name: "Mike Wilson",
      email: "mike@example.com",
      role: "user",
    },
  ]
  
  // Generate dates for the next 7 days
  const getNextDays = (days: number) => {
    return Array.from({ length: days }).map((_, i) => {
      const date = new Date()
      date.setDate(date.getDate() + i + 1)
      return date
    })
  }
  
  const nextDays = getNextDays(7)
  
  // Get day of week
  const getDayOfWeek = (date: Date) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return days[date.getDay()]
  }
  
  // Get meal type based on day of week
  const getMealTypeForDay = (day: string) => {
    switch (day) {
      case "Monday":
        return "Chicken Roast"
      case "Tuesday":
        return "Mutton"
      case "Wednesday":
        return "Beef"
      case "Thursday":
        return "Fish"
      default:
        return "No meal scheduled"
    }
  }
  
  // Update the menuItems array to include the active status
  export const menuItems: MenuItem[] = nextDays.map((date, index) => {
    const dayOfWeek = getDayOfWeek(date)
    const mealType = getMealTypeForDay(dayOfWeek)
    const isWeekend = dayOfWeek === "Friday" || dayOfWeek === "Saturday" || dayOfWeek === "Sunday"
  
    let description = ""
    if (isWeekend) {
      description = "No meal scheduled for weekends"
    } else {
      switch (mealType) {
        case "Chicken Roast":
          description = "Delicious roasted chicken with herbs, served with roasted vegetables and mashed potatoes"
          break
        case "Mutton":
          description = "Slow-cooked mutton curry with aromatic spices, served with steamed rice and naan bread"
          break
        case "Beef":
          description = "Tender beef stew with root vegetables, served with fresh bread and garden salad"
          break
        case "Fish":
          description = "Grilled fish fillet with lemon butter sauce, served with steamed vegetables and rice pilaf"
          break
        default:
          description = "No meal description available"
      }
    }
  
    return {
      id: (index + 1).toString(),
      name: isWeekend ? "Weekend - No Meal" : mealType,
      description,
      date: date.toISOString().split("T")[0],
      dayOfWeek,
      mealType: isWeekend ? "None" : mealType,
      active: !isWeekend, // Meals are active by default on weekdays, inactive on weekends
    }
  })
  
  // Mock confirmations
  export const confirmations: Confirmation[] = [
    {
      id: "1",
      userId: "1",
      menuItemId: "1",
      date: nextDays[0].toISOString().split("T")[0],
      confirmed: true,
      adminApproval: true,
    },
    {
      id: "2",
      userId: "2",
      menuItemId: "1",
      date: nextDays[0].toISOString().split("T")[0],
      confirmed: true,
      adminApproval: true,
    },
    {
      id: "3",
      userId: "4",
      menuItemId: "1",
      date: nextDays[0].toISOString().split("T")[0],
      confirmed: false,
      adminApproval: false,
    },
    {
      id: "4",
      userId: "5",
      menuItemId: "1",
      date: nextDays[0].toISOString().split("T")[0],
      confirmed: true,
      adminApproval: true,
    },
  ]
  
  // Mock bills
  export const bills: Bill[] = [
    {
      id: "1",
      userId: "1",
      month: "04",
      year: "2025",
      amount: 120,
      paid: true,
      mealCount: 20,
    },
    {
      id: "2",
      userId: "2",
      month: "04",
      year: "2025",
      amount: 96,
      paid: true,
      mealCount: 16,
    },
    {
      id: "3",
      userId: "4",
      month: "04",
      year: "2025",
      amount: 108,
      paid: false,
      mealCount: 18,
    },
    {
      id: "4",
      userId: "5",
      month: "04",
      year: "2025",
      amount: 84,
      paid: false,
      mealCount: 14,
    },
  ]
  
  // Mock meal ratings
  export const mealRatings: MealRating[] = [
    {
      id: "1",
      userId: "1",
      menuItemId: "1",
      rating: 4,
      feedback: "The chicken was perfectly cooked and very flavorful.",
    },
    {
      id: "2",
      userId: "2",
      menuItemId: "1",
      rating: 5,
      feedback: "Best chicken roast I've had in a long time!",
    },
    {
      id: "3",
      userId: "4",
      menuItemId: "2",
      rating: 3,
      feedback: "The mutton was a bit tough, but the flavor was good.",
    },
    {
      id: "4",
      userId: "5",
      menuItemId: "3",
      rating: 4,
      feedback: "Excellent beef stew, would like a bit more seasoning next time.",
    },
  ]
  
  // Generate mock income transactions for the past 6 months
  const generateIncomeTransactions = () => {
    const transactions: IncomeTransaction[] = []
    const today = new Date()
  
    // Generate 50 income transactions
    for (let i = 0; i < 50; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)]
      const randomDate = new Date(today)
      randomDate.setDate(today.getDate() - Math.floor(Math.random() * 180)) // Random date within past 6 months
  
      const paymentMethods = ["Cash", "Bank Transfer", "Credit Card", "Mobile Payment"]
      const descriptions = [
        "Monthly bill payment",
        "Advance payment",
        "Special event fee",
        "Additional meal charges",
        "Late payment fee",
      ]
  
      transactions.push({
        id: `income-${i + 1}`,
        date: randomDate.toISOString().split("T")[0],
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        userId: randomUser.id,
        amount: Math.floor(Math.random() * 200) + 50, // Random amount between 50 and 250
        paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      })
    }
  
    // Sort by date, newest first
    return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }
  
  // Generate mock expense transactions for the past 6 months
  const generateExpenseTransactions = () => {
    const transactions: ExpenseTransaction[] = []
    const today = new Date()
  
    // Generate 40 expense transactions
    for (let i = 0; i < 40; i++) {
      const randomDate = new Date(today)
      randomDate.setDate(today.getDate() - Math.floor(Math.random() * 180)) // Random date within past 6 months
  
      const paymentMethods = ["Cash", "Bank Transfer", "Credit Card", "Company Card"]
      const categories = ["Groceries", "Utilities", "Staff", "Equipment", "Maintenance", "Miscellaneous"]
      const descriptions = [
        "Weekly grocery shopping",
        "Monthly utility bill",
        "Kitchen equipment purchase",
        "Staff salary",
        "Maintenance service",
        "Cleaning supplies",
        "Spices and condiments",
        "Meat supplier payment",
        "Vegetable supplier payment",
        "Transport cost",
      ]
  
      transactions.push({
        id: `expense-${i + 1}`,
        date: randomDate.toISOString().split("T")[0],
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        amount: Math.floor(Math.random() * 300) + 20, // Random amount between 20 and 320
        category: categories[Math.floor(Math.random() * categories.length)],
        paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      })
    }
  
    // Sort by date, newest first
    return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }
  
  // Mock income and expense transactions
  export const incomeTransactions: IncomeTransaction[] = generateIncomeTransactions()
  export const expenseTransactions: ExpenseTransaction[] = generateExpenseTransactions()
  
  // Helper functions
  export function getUserById(id: string): User | undefined {
    return users.find((user) => user.id === id)
  }
  
  export function getMenuItemById(id: string): MenuItem | undefined {
    return menuItems.find((item) => item.id === id)
  }
  
  export function getConfirmationsByDate(date: string): Confirmation[] {
    return confirmations.filter((confirmation) => confirmation.date === date)
  }
  
  export function getUserConfirmations(userId: string): Confirmation[] {
    return confirmations.filter((confirmation) => confirmation.userId === userId)
  }
  
  export function getUserBills(userId: string): Bill[] {
    return bills.filter((bill) => bill.userId === userId)
  }
  
  export function getConfirmedUsersByDate(date: string): User[] {
    const confirmedIds = confirmations
      .filter((c) => c.date === date && c.confirmed && c.adminApproval !== false)
      .map((c) => c.userId)
    return users.filter((user) => confirmedIds.includes(user.id))
  }
  
  export function getMealRatingsByMenuItem(menuItemId: string): MealRating[] {
    return mealRatings.filter((rating) => rating.menuItemId === menuItemId)
  }
  
  export function getAverageRatingForMenuItem(menuItemId: string): number {
    const ratings = getMealRatingsByMenuItem(menuItemId)
    if (ratings.length === 0) return 0
  
    const sum = ratings.reduce((total, rating) => total + rating.rating, 0)
    return Number.parseFloat((sum / ratings.length).toFixed(1))
  }
  
  export function getUserMealRatings(userId: string): MealRating[] {
    return mealRatings.filter((rating) => rating.userId === userId)
  }
  
  // New helper functions for Accounts Management
  export function getIncomeTransactionsByDateRange(startDate: string, endDate: string): IncomeTransaction[] {
    return incomeTransactions.filter((transaction) => transaction.date >= startDate && transaction.date <= endDate)
  }
  
  export function getExpenseTransactionsByDateRange(startDate: string, endDate: string): ExpenseTransaction[] {
    return expenseTransactions.filter((transaction) => transaction.date >= startDate && transaction.date <= endDate)
  }
  
  export function getIncomeTransactionsByPeriod(
    period: "weekly" | "monthly" | "yearly",
    date: Date = new Date(),
  ): IncomeTransaction[] {
    const currentDate = new Date(date)
    let startDate: Date
    let endDate: Date = new Date(currentDate)
  
    if (period === "weekly") {
      // Set to beginning of the week (Sunday)
      startDate = new Date(currentDate)
      startDate.setDate(currentDate.getDate() - currentDate.getDay())
  
      // Set to end of the week (Saturday)
      endDate = new Date(startDate)
      endDate.setDate(startDate.getDate() + 6)
    } else if (period === "monthly") {
      // Set to beginning of the month
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  
      // Set to end of the month
      endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
    } else {
      // yearly
      // Set to beginning of the year
      startDate = new Date(currentDate.getFullYear(), 0, 1)
  
      // Set to end of the year
      endDate = new Date(currentDate.getFullYear(), 11, 31)
    }
  
    return getIncomeTransactionsByDateRange(startDate.toISOString().split("T")[0], endDate.toISOString().split("T")[0])
  }
  
  export function getExpenseTransactionsByPeriod(
    period: "weekly" | "monthly" | "yearly",
    date: Date = new Date(),
  ): ExpenseTransaction[] {
    const currentDate = new Date(date)
    let startDate: Date
    let endDate: Date = new Date(currentDate)
  
    if (period === "weekly") {
      // Set to beginning of the week (Sunday)
      startDate = new Date(currentDate)
      startDate.setDate(currentDate.getDate() - currentDate.getDay())
  
      // Set to end of the week (Saturday)
      endDate = new Date(startDate)
      endDate.setDate(startDate.getDate() + 6)
    } else if (period === "monthly") {
      // Set to beginning of the month
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  
      // Set to end of the month
      endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
    } else {
      // yearly
      // Set to beginning of the year
      startDate = new Date(currentDate.getFullYear(), 0, 1)
  
      // Set to end of the year
      endDate = new Date(currentDate.getFullYear(), 11, 31)
    }
  
    return getExpenseTransactionsByDateRange(startDate.toISOString().split("T")[0], endDate.toISOString().split("T")[0])
  }
  
  export function getTotalIncomeByPeriod(period: "weekly" | "monthly" | "yearly", date: Date = new Date()): number {
    const transactions = getIncomeTransactionsByPeriod(period, date)
    return transactions.reduce((total, transaction) => total + transaction.amount, 0)
  }
  
  export function getTotalExpensesByPeriod(period: "weekly" | "monthly" | "yearly", date: Date = new Date()): number {
    const transactions = getExpenseTransactionsByPeriod(period, date)
    return transactions.reduce((total, transaction) => total + transaction.amount, 0)
  }
  