import React from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import { Notifications} from 'expo'
import * as Permissions from 'expo-permissions'

const NOTIFICATION_KEY = 'Deck:notifications'

export function timeToString (time = Date.now()) {
    const date = new Date(time)
    const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    return todayUTC.toISOString().split('T')[0]
  }
  
  export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
  }
  
  function createNotification () {
    return {
      title: 'Log your stats!',
      body: "👋 don't forget to log your stats for today!",
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true,
      }
    }
  }
  
  export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
            console.log("NOTIFICATION SET TIME ")
              if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()
  
                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                tomorrow.setHours(20)
                tomorrow.setMinutes(0)

                let today = new Date()
                today.setDate(today.getDate())
                today.setHours(14)
                today.setMinutes(39)

                console.log("NOTIFICATION SET TIME : ",today.getDate)
  
                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: today,
                    repeat: 'day',
                  }
                )
  
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              }
            })
        }
      })
  }