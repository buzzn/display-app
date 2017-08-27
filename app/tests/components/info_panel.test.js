import React from 'react';
import renderer from 'react-test-renderer';
import InfoPanel from '../../components/info_panel';

describe('info panel component tests', () => {
  test('renders in text correctly', () => {
    const tree = renderer.create(
      <InfoPanel type="in"/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders out text correctly', () => {
    const tree = renderer.create(
      <InfoPanel type="out"/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders data correctly', () => {
    const tree = renderer.create(
      <InfoPanel data={ 10000 }/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
