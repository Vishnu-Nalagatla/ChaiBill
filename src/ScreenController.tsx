import {View, Text, Switch} from 'react-native';
import React, {useEffect, useState} from 'react';
import UsersList from './UsersList/UsersList';
import ChaiBill from './ChaiBill';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScreenController = () => {
  const [userListOn, setUserListOn] = useState(false);
  const [renderDone, setRenderDone] = useState(false);
  const list = [
    'Vishnu',
    'Shekar',
    'Sri Sai',
    'Srinivas',
    'Mahendra',
    'Santoosh',
  ];
  useEffect(() => {
    AsyncStorage.getItem('usersList').then(mainList => {
      if (!mainList) {
        console.log(
          'JSON.stringify(list)',
          JSON.stringify(list),
          typeof JSON.stringify(list),
        );
        (async () =>
          await AsyncStorage.setItem('usersList', JSON.stringify(list)))();
        setRenderDone(true);
      } else {
        setRenderDone(true);
      }
    });
  }, []);
  return (
    <View style={{flex: 1}}>
      {renderDone ? (
        <>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              position: 'absolute',
              top: 30,
              right: 30,
            }}>
            <Text>Start</Text>
            <Switch
              trackColor={{false: '#d5d7dc', true: 'lightgrey'}}
              thumbColor={userListOn ? '#73B34E' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setUserListOn(!userListOn)}
              value={userListOn}
            />
            <Text>UsersList</Text>
          </View>
          <>{userListOn ? <UsersList /> : <ChaiBill />}</>
        </>
      ) : null}
    </View>
  );
};

export default ScreenController;
