interface TimeOptions {
  startTime: Date,
  endTime: Date
}

interface GroupedTimeOptions {
  [string]: TimeOptions[]
}
