import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Button } from './Button';

describe('<Button />', () => {
  test('renders children', () => {
    const { getByText } = render(<Button onClick={jest.fn()}>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  test('handles click', () => {
    const mockClickHandler = jest.fn();
    const { getByText } = render(
      <Button onClick={mockClickHandler}>Click me</Button>
    );
    userEvent.click(getByText('Click me'));
    expect(mockClickHandler).toHaveBeenCalledTimes(1);
  });
});
