import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  LineDivider,
  NumberField,
  SubmitBtn,
  UserListScroll,
  UserUpdateBtn,
  UserUpdateBtnText,
} from '../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';

const UsersList = () => {
  const [name, setName] = useState('');
  const [editOn, setEditOn] = useState(false);
  const [allUserList, setAllUserList] = useState<any[]>([]);
  const [updateToggle, setUpdateToggle] = useState(false);
  const toggleHandler = () => {
    setUpdateToggle(!updateToggle);
  };
  const addUser = async () => {
    if (name.length > 3) {
      const newUserList = [...allUserList, name];
      await AsyncStorage.setItem('usersList', JSON.stringify(newUserList));
      setName('');
      toggleHandler();
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
  }, [updateToggle]);

  const updateAsyncHandler = async () => {
    await AsyncStorage.setItem('usersList', JSON.stringify(allUserList));
    toggleHandler();
    setEditOn(false);
  };
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
          placeholder="Enter your name"
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
        {console.log('allUserList', allUserList)}
        {allUserList &&
          allUserList?.map((item: any, index: number) => (
            <View
              key={index}
              style={{
                marginTop: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: '600',
                    color: 'black',
                  }}>
                  {item}
                </Text>
                {editOn && (
                  <Entypo
                    onPress={() => {
                      const tempList = allUserList.filter(data => data != item);
                      console.log('tempList', tempList);
                      setAllUserList(tempList);
                    }}
                    name="circle-with-cross"
                    size={30}
                    color="red"
                  />
                )}
              </View>
              {allUserList.length - 1 != index && (
                <LineDivider borderTopWidth="1px" borderColor="#979797" />
              )}
            </View>
          ))}
      </UserListScroll>
      {allUserList.length ? (
        <UserUpdateBtn
          onPress={() => (editOn ? updateAsyncHandler() : setEditOn(true))}>
          <UserUpdateBtnText>{editOn ? 'SAVE' : 'EDIT'}</UserUpdateBtnText>
        </UserUpdateBtn>
      ) : null}
    </View>
  );
};

export default UsersList;
