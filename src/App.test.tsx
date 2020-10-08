import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { App } from './App';

const mockedGetUserName = jest
  .fn()
  .mockImplementation(() => Promise.resolve('Aleksey'));

jest.mock('./services/getUserName', () => ({
  getUserName: () => mockedGetUserName(),
}));

describe('<App />', () => {
  beforeEach(() => {
    render(<App />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('displays button "Click me"', () => {
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe('Click me');
  });

  test('fetch user name on button click', async () => {
    const button = screen.getByRole('button');
    expect(mockedGetUserName).not.toHaveBeenCalled();
    button.click();
    await waitFor(() => {
      expect(mockedGetUserName).toHaveBeenCalledTimes(1);
    });
  });

  test('fetch user name once', async () => {
    const button = screen.getByRole('button');
    // show greeting
    button.click();
    // hide greeting
    button.click();
    // show greeting
    button.click();
    await waitFor(() => {
      expect(mockedGetUserName).toHaveBeenCalledTimes(1);
    });
  });

  test('displays greeting', async () => {
    const button = screen.getByRole('button');
    button.click();
    await waitFor(() => {
      expect(screen.getByText('Hello, Aleksey!')).toBeInTheDocument();
    });
  });

  test('notifies about error', async () => {
    mockedGetUserName.mockImplementationOnce(() => Promise.reject());
    const button = screen.getByRole('button');
    button.click();
    await waitFor(() => {
      expect(screen.getByText(/failed/i)).toBeInTheDocument();
    });
  });

  test('hides greeting on second click', async () => {
    const button = screen.getByRole('button');
    button.click();
    await waitFor(() => {
      expect(screen.getByText('Hello, Aleksey!')).toBeInTheDocument();
    });
    button.click();
    await waitFor(() => {
      expect(screen.queryByText('Hello, Aleksey!')).not.toBeInTheDocument();
    });
  });
});
