import styled from 'styled-components/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const SubmitContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: ${(props: {marginTop: any}) => props.marginTop || '20px'} 0px;
`;

export const SubmitText = styled.Text`
  font-size: 16px;
  color: #000000;
`;

export const SubmitBtnTouchable = styled.TouchableOpacity`
  border: 1px solid;
  border-color: ${(props: {borderColor: any}) => props.borderColor};
  margin-left: 20px;
  border-radius: 100px;
  width: 60px;
  height: 60px;
  background-color: ${(props: {backgroundColor: any}) => props.backgroundColor};
  elevation: 9;
  shadowcolor: ${(props: {shadowColor: any}) => props.shadowColor || '#73B34E'};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubmitBtn = ({
  IconColor,
  onPress,
  marginTop,
  backgroundColor,
  borderColor,
  shadowColor,
}: any) => {
  return (
    <>
      <SubmitContainer marginTop={marginTop}>
        <SubmitBtnTouchable
          borderColor={borderColor}
          backgroundColor={backgroundColor}
          onPress={onPress}
          shadowColor={shadowColor}>
          <AntDesign name="arrowright" size={30} color={IconColor} />
        </SubmitBtnTouchable>
      </SubmitContainer>
    </>
  );
};

export const NumberField = styled.TextInput`
  font-weight: 700;
  font-size: 15px;
  color: black;
  width: 80%;
  padding-left: 20px;
  border: 1px solid grey;
  border-radius: 50px;
`;

export const LineDivider = styled.View`
  width: ${(props: {width: any}) => props.width || 'auto'};
  height: ${(props: {height: any}) => props.height || '2px'};
  border-top-width: ${(props: {borderTopWidth: any}) =>
    props.borderTopWidth || '1.5px'};
  border-top-style: ${(props: {borderStyle: any}) =>
    props.borderStyle || 'solid'};
  border-color: ${(props: {borderColor: any}) => props.borderColor || 'black'};
  margin: ${(props: {margins: any}) => props.margins || '13px 0px 0px 0px'};
`;
export const UserListScroll = styled.ScrollView`
  margin: 0 50px;
  border: 1px solid green;
  border-radius: 20px;
  padding: 0 20px;
  max-height: 400px;
`;
