import { Locale } from "@/context/LocaleContext";

const DATE_FORMAT: Record<string, Intl.DateTimeFormatOptions> = {
  default: {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
  short: {
    year: "numeric",
    month: "short",
    day: "numeric",
  },
  numeric: {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  },
};

export function formatDate(
  date: Date,
  format: "default" | "short" | "numeric" = "default",
  locale: string = "uk-UA",
): string {
  return date.toLocaleDateString(locale, DATE_FORMAT[format]);
}

const dayMap = {
  "en-US": {
    Mon: "Mon",
    Tue: "Tue",
    Wed: "Wed",
    Thu: "Thu",
    Fri: "Fri",
    Sat: "Sat",
    Sun: "Sun",
    Weekdays: "Weekdays",
    Everyday: "Every day",
  },
  "uk-UA": {
    Mon: "Пн",
    Tue: "Вт",
    Wed: "Ср",
    Thu: "Чт",
    Fri: "Пт",
    Sat: "Сб",
    Sun: "Нд",
    Weekdays: "По буднях",
    Everyday: "Щодня",
  },
};

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const ALLDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function formatReminderDays(days: string, locale: Locale): string {
  const dayList = days.split(",").filter(Boolean);

  const isEveryday = ALLDAYS.every((d) => dayList.includes(d));
  if (isEveryday) return dayMap[locale].Everyday;

  const isWeekdays = WEEKDAYS.every((d) => dayList.includes(d)) && dayList.length === 5;
  if (isWeekdays) return dayMap[locale].Weekdays;

  return dayList.map((d) => dayMap[locale][d as keyof typeof dayMap["en-US"]]).join(", ");
}
