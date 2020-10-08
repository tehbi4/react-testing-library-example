import React from 'react';
import { render } from '@testing-library/react';
import { Greeting } from './Greeting';

describe('<Greeting />', () => {
  test('greets user', () => {
    const { getByTestId } = render(<Greeting userName="Anton" />);
    expect(getByTestId('greeting').textContent).toBe('Hello, Anton!');
  });

  test('greets unknown user', () => {
    const { getByTestId } = render(<Greeting />);
    expect(getByTestId('greeting').textContent).toBe('Hello, unknown user!');
  });
});
