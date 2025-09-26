import { defineStore } from 'pinia'

interface Notification {
  id: string
  title: string
  content: string
  read: boolean
  timestamp: Date
}

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [] as Notification[],
    lastChecked: null as Date | null,
  }),
  getters: {
    unreadCount: (state) => state.notifications.filter((n) => !n.read).length,
    // hasUnread: (state) => state.unreadCount > 0,
  },
  actions: {
    async fetchNotifications() {
      // 这里替换为实际的API调用
      const res = await fetch('/api/notifications')
      this.notifications = await res.json()
    },
    markAsRead(id?: string) {
      if (id) {
        const notification = this.notifications.find((n) => n.id === id)
        if (notification) notification.read = true
      } else {
        this.notifications.forEach((n) => (n.read = true))
        this.lastChecked = new Date()
      }
    },
  },
})
