import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import HomePage from '../src/pages/HomePage';
import {Alert} from 'react-native';

jest.mock('react-native-vector-icons/Feather', () => () => <></>);
jest.mock('react-native-vector-icons/AntDesign', () => () => <></>);
jest.mock('react-native-razorpay', () => {
  return {
    default: {
      RazorpayCheckout: jest.fn(),
    },
  };
});

jest.spyOn(Alert, 'alert');

jest.mock('react-native-razorpay', () => {
  return {
    default: {
      RazorpayCheckout: jest.fn(),
    },
  };
});
describe('HomePage component', () => {
  it('Home page', () => {
    render(<HomePage />);
  });

  it('toggle button for modal', () => {
    render(<HomePage />);
    const toggleBtn = screen.getByTestId('toggleBtn');
    expect(toggleBtn).toBeTruthy();
    fireEvent.press(toggleBtn);
    const modal = screen.getByTestId('modal');
    fireEvent.press(modal);
    expect(modal).toBeTruthy();
    // fireEvent.press(toggleBtn)
    const handleName = jest.fn();
    const nameField = screen.getByTestId('name');
    console.log('namefireld==');
    nameField.props.onChangeText('e');
    expect(nameField).toBeDefined();
    fireEvent.changeText(nameField, 'e');
    expect(nameField.props.value).toBe('e');
    const amountField = screen.getByTestId('amount');
    expect(amountField).toBeDefined();
    fireEvent.changeText(amountField, '3000');
    expect(amountField.props.value).toBe('3000');

    const paymentBtn = screen.getByTestId('paymentBtn');
    fireEvent.press(paymentBtn);
    expect(Alert.alert).toHaveBeenCalled();
  });

  it('modal close', () => {
    render(<HomePage />);
    const toggleBtn = screen.getByTestId('toggleBtn');
    fireEvent.press(toggleBtn);
    const closeBtn = screen.getByTestId('close-btn');
    expect(closeBtn).toBeTruthy();
    fireEvent.press(closeBtn);
    // expect(closeBtn).toBeNull()
  });
  it('payment button', () => {
    render(<HomePage />);
    const payButton = screen.getByTestId('pay-button');
    expect(payButton).toBeTruthy();
    fireEvent.press(payButton);

    expect(Alert.alert).toBeCalled();
    
  });

  it('conditionality checking for true', () => {
    render(<HomePage />);
    const state_toggle = true;
    const button = screen.getByTestId('toggleBtn');
    fireEvent.press(button);
    const modal = screen.getByTestId('modal');
    expect(state_toggle).toBe(true);
  });
});
