import React from 'react'
import renderer from 'react-test-renderer'
import HomeScreen from '../components/HomeScreen'

describe('HomeScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  }

  it('renders without crashing', () => {
    const tree = renderer.create(<HomeScreen navigation={mockNavigation} />)
    expect(tree.toJSON()).toBeTruthy()
  })

  it('displays the home view text', () => {
    const tree = renderer.create(<HomeScreen navigation={mockNavigation} />)
    const instance = tree.root
    const texts = instance.findAllByType('Text')
    const textContents = texts.map(t => t.props.children)
    expect(textContents).toContain('This is the Home view')
  })

  it('displays the dashboard navigation text', () => {
    const tree = renderer.create(<HomeScreen navigation={mockNavigation} />)
    const instance = tree.root
    const texts = instance.findAllByType('Text')
    const textContents = texts.map(t => t.props.children)
    expect(textContents).toContain('Press here for the Dashboard')
  })

  it('navigates to Details on press', () => {
    const tree = renderer.create(<HomeScreen navigation={mockNavigation} />)
    const instance = tree.root
    const touchable = instance.findByType('TouchableOpacity')
    touchable.props.onPress()
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Details')
  })
})
