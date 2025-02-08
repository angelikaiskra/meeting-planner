export interface TimeValue {
  hours: number;
  minutes: number;
}

export interface TimeOption {
  startTime: TimeValue,
  endTime: TimeValue
}

// Time options in object grouped by dates, in format YYYY-MM-DD
export interface GroupedTimeOptions {
  [key: string]: TimeOption[]
}
