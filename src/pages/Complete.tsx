import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Complete = () => {
  const [count, setCount] = useState(1);
  return (
    <View>
      <Pressable onPress={p => setCount(p + 1)}>{count}</Pressable>
    </View>
  );
};

export default Complete;

const styles = StyleSheet.create({});
