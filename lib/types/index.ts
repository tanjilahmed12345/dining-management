// Domain types — backend-ready, no mock data

export type UserRole = "admin" | "user";

export type User = {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt?: string;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  date: string;
  dayOfWeek: string;
  mealType: string;
  active: boolean;
  averageRating?: number;
};

export type Confirmation = {
  id: string;
  userId: string;
  userName?: string;
  userEmail?: string;
  menuItemId: string;
  date: string;
  confirmed: boolean;
  adminApproval?: boolean;
};

export type Bill = {
  id: string;
  userId: string;
  userName?: string;
  month: string;
  year: string;
  amount: number;
  paid: boolean;
  mealCount: number;
};

export type MealRating = {
  id: string;
  userId: string;
  menuItemId: string;
  rating: number;
  feedback?: string;
};

export type IncomeTransaction = {
  id: string;
  date: string;
  description: string;
  userId: string;
  userName?: string;
  amount: number;
  paymentMethod?: string;
};

export type ExpenseTransaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  category?: string;
  paymentMethod?: string;
};

export type SpecialEvent = {
  id: string;
  name: string;
  date: string;
  type: string;
  description: string;
  status: "upcoming" | "ongoing" | "completed";
  tags: string[];
  confirmedCount?: number;
};

export type PaymentRecord = {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: string;
};

export type MealSchedule = Record<string, { mealType: string; active: boolean }>;
