import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {LineDivider, NumberField, SubmitBtn, UserListScroll} from '../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UsersList = () => {
  const [name, setName] = useState('');
  const [allUserList, setAllUserList] = useState([]);
  const addUser = async () => {
    if (name.length > 3) {
      const newUserList = [...allUserList, name];
      await AsyncStorage.setItem('usersList', JSON.stringify(newUserList));
      setName('');
    }
  };

  const nameHandler = (value: string) => {
    setName(value);
  };

  useEffect(() => {
    AsyncStorage.getItem('usersList').then((list: any) => {
      console.log('list', typeof JSON.parse(list), JSON.parse(list));
      setAllUserList(JSON.parse(list) ?? []);
    });
  }, [AsyncStorage.getItem('usersList')]);
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          marginTop: 70,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 50,
        }}>
        <NumberField
          value={name}
          placeholder="Enter your your name"
          onChangeText={nameHandler}
        />
        <SubmitBtn
          IconColor={name.length > 3 ? 'white' : '#666666'}
          onPress={() => addUser()}
          backgroundColor={name.length > 3 ? '#73B34E' : 'white'}
          borderColor={name.length > 3 ? '#73B34E' : '#666666'}
          shadowColor={name.length > 3 ? '#73B34E' : 'transparent'}
        />
      </View>
      <UserListScroll
        style={
          {
            // maxHeight: allUserList?.length >= 6 ? 400 : '100%',
          }
        }>
        {allUserList &&
          allUserList?.map((item: any, index: number) => (
            <View
              key={index}
              style={{
                marginTop: 10,
              }}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: '600',
                  color: 'black',
                }}>
                {item}
              </Text>
              {allUserList.length - 1 != index && (
                <LineDivider borderTopWidth="1px" borderColor="#979797" />
              )}
            </View>
          ))}
      </UserListScroll>
    </View>
  );
};

export default UsersList;
