export const WIP_LIMIT = 6

export const COLUMNS = [
  { id: 'not-started',  label: 'Not Started',       color: 'gray'   },
  { id: 'wip',          label: 'WIP',                color: 'blue',  limit: WIP_LIMIT },
  { id: 'recurring',    label: 'Recurring',          color: 'purple' },
  { id: 'completed',    label: 'Completed',          color: 'green'  },
  { id: 'deferred',     label: 'Deferred / Blocked', color: 'coral'  },
  { id: 'future',       label: 'Future Pick',        color: 'amber'  },
]

export const COLORS = {
  gray: {
    columnBg:   '#F9FAFB',
    headerBg:   '#E5E7EB',
    headerText: '#374151',
    accent:     '#9CA3AF',
    badgeBg:    '#E5E7EB',
    badgeText:  '#374151',
  },
  blue: {
    columnBg:   '#EFF6FF',
    headerBg:   '#DBEAFE',
    headerText: '#1E40AF',
    accent:     '#3B82F6',
    badgeBg:    '#DBEAFE',
    badgeText:  '#1E40AF',
  },
  purple: {
    columnBg:   '#F5F3FF',
    headerBg:   '#EDE9FE',
    headerText: '#5B21B6',
    accent:     '#8B5CF6',
    badgeBg:    '#EDE9FE',
    badgeText:  '#5B21B6',
  },
  green: {
    columnBg:   '#ECFDF5',
    headerBg:   '#D1FAE5',
    headerText: '#065F46',
    accent:     '#10B981',
    badgeBg:    '#D1FAE5',
    badgeText:  '#065F46',
  },
  coral: {
    columnBg:   '#FFF1F2',
    headerBg:   '#FFE4E6',
    headerText: '#9F1239',
    accent:     '#FB7185',
    badgeBg:    '#FFE4E6',
    badgeText:  '#9F1239',
  },
  amber: {
    columnBg:   '#FFFBEB',
    headerBg:   '#FEF3C7',
    headerText: '#92400E',
    accent:     '#F59E0B',
    badgeBg:    '#FEF3C7',
    badgeText:  '#92400E',
  },
}

export const PRIORITY_COLORS = {
  high:   { bg: '#FEE2E2', text: '#DC2626' },
  medium: { bg: '#FEF9C3', text: '#CA8A04' },
  low:    { bg: '#DCFCE7', text: '#16A34A' },
}
