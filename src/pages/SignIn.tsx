import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import DismissKeyboardView from '../components/DismissKeyboardView';
type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignIn = ({navigation}: SignInScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 위에서 밑으로 읽어갈때 처음 Ref는 null 이다가 밑에 TextInput을 읽으면 Ref가 TextInput이 되므로
  // 기본값은 null로 하고 연결 되었을때 TextInput으로 변환된다.
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const onChangeEmail = useCallback((text: any) => {
    setEmail(text);
  }, []);

  const onChangePassword = useCallback((text: any) => {
    setPassword(text);
  }, []);

  const handleSignIn = useCallback(() => {
    // trim 을 통해서 뛰어쓰기도 미입력으로 설정한다.
    if (!email || !email.trim()) {
      return Alert.alert('이메일을 입력해 주세요!!');
    }
    if (!password || !password.trim()) {
      return Alert.alert('패스워드를 입력해 주세요 !!');
    }
    Alert.alert('로그인이 되었습니다. !!');
  }, [email, password]);

  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const canGoNext = email && password;

  return (
    <DismissKeyboardView>
      <View style={styles.inputWrapper}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder="이메일을 입력해주세요!!"
            value={email}
            onChangeText={onChangeEmail}
            importantForAutofill="yes"
            //지문 인식으로 자동완성
            autoComplete="email"
            // 골뱅이가 있는 키보드 타입 설정
            keyboardType="email-address"
            textContentType="emailAddress"
            // 엔터키를 눌렀을때 다음으로 가면서 패스워드에 커서 이동
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordRef.current?.focus();
            }}
            // 패스워드로 넘어갔을때 키보드 내려가지 않기
            blurOnSubmit={false}
            ref={emailRef}
            // 텍스트를 입력할때 우측에 x표시가 뜨면서 누리면 입력중인 텍스트 전체 삭제
            clearButtonMode="while-editing"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.textInput}
            value={password}
            placeholder="패스워드를 입력해주세요!!"
            onChangeText={onChangePassword}
            secureTextEntry
            importantForAutofill="yes"
            autoComplete="password"
            textContentType="password"
            ref={passwordRef}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          onPress={handleSignIn}
          style={
            !canGoNext
              ? styles.loginButton
              : StyleSheet.compose(styles.loginButton, styles.loginButtonActive)
          }
          disabled={!canGoNext}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </Pressable>
        <Pressable onPress={toSignUp}>
          <Text>회원가입</Text>
        </Pressable>
      </View>
    </DismissKeyboardView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  inputWrapper: {padding: 20},
  inputContainer: {padding: 20},
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  textInput: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
});
