import React from 'react';
import renderer from 'react-test-renderer';
import EnergySource from '../../components/energy_source';

describe('energy source component tests', () => {
  test('renders all energy types correctly', () => {
    const solarTree = renderer.create(
      <EnergySource type="solar"/>,
    ).toJSON();
    expect(solarTree).toMatchSnapshot();

    const fireTree = renderer.create(
      <EnergySource type="fire"/>,
    ).toJSON();
    expect(fireTree).toMatchSnapshot();

    const gridTree = renderer.create(
      <EnergySource type="grid"/>,
    ).toJSON();
    expect(gridTree).toMatchSnapshot();

    const consumptionTree = renderer.create(
      <EnergySource type="consumption"/>,
    ).toJSON();
    expect(consumptionTree).toMatchSnapshot();

    const prodStatTree = renderer.create(
      <EnergySource type="prodStat"/>,
    ).toJSON();
    expect(prodStatTree).toMatchSnapshot();

    const consStatTree = renderer.create(
      <EnergySource type="consStat"/>,
    ).toJSON();
    expect(consStatTree).toMatchSnapshot();

    const autarchyTree = renderer.create(
      <EnergySource type="autarchy"/>,
    ).toJSON();
    expect(autarchyTree).toMatchSnapshot();
  });

  test('renders left/right positions correctly', () => {
    const leftTree = renderer.create(
      <EnergySource type="solar" position="left"/>,
    ).toJSON();
    expect(leftTree).toMatchSnapshot();

    const rightTree = renderer.create(
      <EnergySource type="solar" position="right"/>,
    ).toJSON();
    expect(rightTree).toMatchSnapshot();
  });

  test('renders stat and autarchy values correctly', () => {
    const prodStatTree = renderer.create(
      <EnergySource type="prodStat" value={ 1000 }/>,
    ).toJSON();
    expect(prodStatTree).toMatchSnapshot();

    const consStatTree = renderer.create(
      <EnergySource type="constStat" value={ 1000 }/>,
    ).toJSON();
    expect(consStatTree).toMatchSnapshot();

    const autarchyTree = renderer.create(
      <EnergySource type="autarchy" value={ 0.88 }/>,
    ).toJSON();
    expect(autarchyTree).toMatchSnapshot();
  });
});
