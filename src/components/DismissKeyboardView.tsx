import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleProp,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const DismissKeyboardView = ({children, ...props}) => (
  // keyboard.dismiss 빈공간을 클릭하면 키보드가 내려감, accessible:장애인을 위한 웹접근성 준수
  // accessible 웹에서 버튼을 만나면 버튼이라고 시각장애인에게 아무기능도 없는 것으로 고지하는것
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAvoidingView
      {...props}
      // behavior props의 값을 안드로이드면 포지션 , IOS이면 padding 적용
      behavior={Platform.OS === 'android' ? 'position' : 'padding'}
      style={props.style}>
      {children}
    </KeyboardAvoidingView>
  </TouchableWithoutFeedback>
);

export default DismissKeyboardView;
