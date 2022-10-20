import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import orderSlice, {Order} from '../slices/order';
import {useAppDispatch} from '../store';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../AppInner';

const EachOrder = ({item}: {item: Order}) => {
  const dispatch = useAppDispatch();
  // 로그인 한 상태에서의 타입은 LoggedInParamList 안한 타입은 RootStackParamList 이다.
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const [detail, setDetail] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggleDetail = useCallback(() => {
    setDetail(!detail);
  }, [detail]);

  const onAccept = useCallback(async () => {
    // 남이 수락한걸 내가 수락하면 안되고 내가 수락한걸 남이 수락하면 안된다
    // 그래서 서버에게 수락을 알려줘야한다.
    try {
      setLoading(false);
      await axios.post(
        `${Config.API_URL}/accept`,
        {orderId: item.orderId},
        {headers: {authorization: `Bearer ${accessToken}`}},
      );
      dispatch(orderSlice.actions.acceptOrder(item.orderId));
      navigation.navigate('Delivery');
    } catch (error) {
      let errorResponse = (error as AxiosError).response;
      if (errorResponse?.status === 400) {
        // 타인이 수락한 경우
        Alert.alert('알림', errorResponse.data.message);
        dispatch(orderSlice.actions.rejectOrder(item.orderId));
      }
    } finally {
      setLoading(true);
    }
    dispatch(orderSlice.actions.acceptOrder(item.orderId));
  }, [dispatch, item.orderId, accessToken, navigation]);
  const onReject = useCallback(() => {
    dispatch(orderSlice.actions.rejectOrder(item.orderId));
  }, [dispatch, item.orderId]);

  return (
    <View key={item.orderId} style={styles.orderContainer}>
      <Pressable onPress={toggleDetail} style={styles.info}>
        <Text style={styles.eachInfo}>
          {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
        </Text>
        <Text>삼성동</Text>
        <Text>홍길동</Text>
      </Pressable>
      {detail && (
        <View>
          <View>
            <Text>네이버맵이 들어갈 장소</Text>
          </View>
          <View style={styles.buttonWrapper}>
            <Pressable
              onPress={onAccept}
              style={styles.acceptButton}
              disabled={loading}>
              <Text style={styles.buttonText}>수락</Text>
            </Pressable>
            <Pressable
              onPress={onReject}
              style={styles.rejectButton}
              disabled={loading}>
              <Text style={styles.buttonText}>거절</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

export default EachOrder;

const styles = StyleSheet.create({
  orderContainer: {
    borderRadius: 5,
    margin: 5,
    padding: 10,
    backgroundColor: 'lightgray',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eachInfo: {},
  buttonWrapper: {
    flexDirection: 'row',
  },
  acceptButton: {
    backgroundColor: 'blue',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    flex: 1,
  },
  rejectButton: {
    backgroundColor: 'red',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
