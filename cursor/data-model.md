# Data Model

## User

ts
User {
dateOfBirth: Date
expectedLifespanYears: number
}

LifeEntry {
id: string
type: 'work' | 'education' | 'event' | 'custom'
title: string
description?: string
startDate: Date
endDate?: Date
color?: string
}

Week {
index: number
startDate: Date
endDate: Date
entries: LifeEntry[]
}

Invariants
endDate >= startDate
Weeks are contiguous
A LifeEntry may span multiple weeks
Multiple LifeEntries may overlap a single week
