import {View, Text, Pressable, SafeAreaView, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {ScratchCard} from 'rn-scratch-card';
const ChaiBill = () => {
  const [usersList, setUsersList] = useState([]);
  const clearRef = useRef<any>(null);
  const [paidList, setPaidList] = useState<string[]>([]);
  const [randomPerson, setRandomPerson] = useState('');

  const [secondsLeft, setSecondsLeft] = useState(5);
  const [buttonStart, setButtonStart] = useState(false);
  const [enableGif, setEnableGif] = useState(false);
  const startTimer = () => {
    setButtonStart(true);
    clearRef.current = setInterval(() => {
      setSecondsLeft((secs: any) => {
        if (secs > 0) return secs - 1;
        else return 0;
      });
    }, 1000);
  };

  useEffect(() => {
    if (secondsLeft === 0) {
      addUserPaid();
    }
  }, [secondsLeft]);

  const addUserPaid = () => {
    const filteredUsers = usersList?.filter(
      (item: string) => !paidList.includes(item),
    );

    const randomNumber =
      Math.floor(Math.random() * (filteredUsers.length - 0 + 0)) + 0;
    console.log(
      '!!!!!randomNumber',
      randomNumber,
      filteredUsers,
      filteredUsers[randomNumber],
    );
    const randomValueName = filteredUsers[randomNumber];
    if (filteredUsers.length) {
      setPaidList([...paidList, filteredUsers[randomNumber]]);
      setTimeout(() => {
        setRandomPerson(randomValueName);
      }, 1000);
    } else {
      setTimeout(() => {
        setRandomPerson(randomValueName);
      }, 1000);
      setPaidList([filteredUsers[randomNumber]]);
    }
  };
  const seconds = Math.floor(secondsLeft % 60);
  useEffect(() => {
    AsyncStorage.getItem('usersList').then((list: any) => {
      console.log('list', JSON.parse(list), list);
      setUsersList(JSON.parse(list) ?? []);
    });
  }, []);

  const handleScratch = (value?: any) => {
    console.log('value', value);
    if (value > 15) {
      setEnableGif(true);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Pressable
        onPress={() => startTimer()}
        android_ripple={{color: 'rgba(115, 179, 78,0.6)', borderless: true}}
        style={{
          width: 150,
          height: 150,
          backgroundColor: '#73B34E',
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 10,
          shadowColor: '#73B34E',
          shadowRadius: 50,
          marginTop: 100,
        }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: '600',
            color: 'white',
          }}>
          START
        </Text>
      </Pressable>

      <View
        style={{
          marginTop: 100,
          // borderWidth: 1,
          width: '100%',
          paddingVertical: 30,
          justifyContent: 'center',
          // alignItems: 'center',
          // position: 'relative',
        }}>
        {buttonStart && (
          <>
            {seconds == 0 && (
              <View
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                  alignItems: 'center',
                  borderRadius: 20,
                  overflow: 'hidden',
                  elevation: 999,
                }}>
                {!enableGif ? (
                  <ScratchCard
                    source={require('./assets/images/chai-image.jpeg')}
                    brushWidth={20}
                    onScratch={handleScratch}
                    style={{
                      width: 250,
                      height: 200,
                    }}
                  />
                ) : (
                  <View
                    style={{
                      elevation: 10,
                      backgroundColor: 'white',
                      shadowColor: 'grey',
                      shadowRadius: 50,
                      shadowOpacity: 0.8,
                    }}>
                    <Image
                      source={require('./assets/images/blast-gif.gif')}
                      style={{width: 250, height: 200}}
                    />
                  </View>
                )}
              </View>
            )}
            <View style={{width: '100%', elevation: enableGif ? 999 : 0}}>
              <Text style={{textAlign: 'center', color: 'black', fontSize: 40}}>
                {seconds <= 0 ? randomPerson : seconds}
              </Text>
            </View>
          </>
        )}
      </View>
      {enableGif && (
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            bottom: 40,
          }}>
          <Pressable
            style={{
              width: 100,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'red',
              borderRadius: 10,
            }}
            onPress={() => {
              clearInterval(clearRef.current);
              setSecondsLeft(5);
              setButtonStart(false);
              setEnableGif(false);
              setRandomPerson('');
              setPaidList([]);
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                fontWeight: '600',
              }}>
              CLEAR
            </Text>
          </Pressable>
          <Pressable
            style={{
              width: 100,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#73B34E',
              borderRadius: 10,
              marginLeft: 50,
            }}
            onPress={() => {
              clearInterval(clearRef.current);
              setSecondsLeft(5);
              setButtonStart(false);
              setEnableGif(false);
              setRandomPerson('');
              setPaidList([]);
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                fontWeight: '600',
              }}>
              SAVE
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};
export default ChaiBill;
