import React from 'react'

const View = ({ children, style, ...props }) => React.createElement('View', { style, ...props }, children)
const Text = ({ children, style, ...props }) => React.createElement('Text', { style, ...props }, children)
const TextInput = (props) => React.createElement('TextInput', props)
const Button = (props) => React.createElement('Button', props)
const TouchableOpacity = ({ children, onPress, ...props }) => React.createElement('TouchableOpacity', { onPress, ...props }, children)
const Alert = { alert: jest.fn() }
const StatusBar = (props) => React.createElement('StatusBar', props)
const AsyncStorage = {
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
}
const StyleSheet = {
  create: (styles) => styles,
}
const unstable_batchedUpdates = (fn) => fn()

export {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  StatusBar,
  AsyncStorage,
  StyleSheet,
  unstable_batchedUpdates,
}

export default {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  StatusBar,
  AsyncStorage,
  StyleSheet,
  unstable_batchedUpdates,
}
