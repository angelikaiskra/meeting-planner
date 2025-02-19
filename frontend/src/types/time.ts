import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export interface TimeOption {
  startTime: Date,
  endTime: Date
}

export type TimeOptionError = Merge<FieldError, FieldErrorsImpl<{ startTime: Date; endTime: Date }>>;

// Time options in object grouped by dates, in format YYYY-MM-DD
export interface GroupedTimeOptions {
  [key: string]: TimeOption[]
}

export interface TimeValue {
  hours: number,
  minutes: number
}