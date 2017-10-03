import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import BubblesLayout from '../../components/bubbles_layout';

describe('bubbles layout component tests', () => {
  const renderer = new ShallowRenderer();

  test('should render proper styles', () => {
    renderer.render(<BubblesLayout Bubbles={ () => <div/> } registers={{}} Chart={ () => <div/> }/>);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
