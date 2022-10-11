import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useState} from 'react';

const Settings = () => {
  const [count, setCount] = useState(1);
  return (
    <View>
      <Pressable onPress={() => setCount(p => p + 1)}>
        <Text>{count}</Text>
      </Pressable>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
