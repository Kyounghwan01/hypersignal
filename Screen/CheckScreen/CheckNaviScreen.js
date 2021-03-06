import React ,{Component} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
import { FormValidationMessage, Button, CheckBox } from 'react-native-elements';
import {MaterialCommunityIcons,Ionicons} from  '@expo/vector-icons';
import { Constants, ImagePicker, Permissions } from 'expo';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import ElectricCheckScreen from './ElectricCheckScreen';
import BuildingCheckScreen from './BuildingCheckScreen';
import ElevatorCheckScreen from './ElevatorCheckScreen';
import FireSafetyCheckScreen from './FireSafetyCheckScreen';
import GradeFlatScreen from '../FlatScreen';

class GasCheckScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      // name: null,
      error: '',
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: false,
      checked5: false,
      checked6: false,
      checked7: false,
      checked8: false,
      checked9: false,
      checked10: false,
      checked11: false,
      checked12: false,
      checked13: false,
      checked14: false,
      // buttonColor: false,
      facilityNumber: this.props.navigation.getParam('facilityNumber_param'),
      name: this.props.navigation.getParam('name_db')
    }
  }

  state = {
    isDateTimePickerVisible: false,
    image: null
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
  _handleDatePicked = (date) => {
    this._hideDateTimePicker();
    var day = moment.utc(date);
    this.setState({
      day: day
    })
  };
    
  // _username = (name) => {
  //   this.setState({ name });
  // }

  _onButtonPress = () => {
    if(this.state.day == null){
      alert("점검일을 지정 하시오")
    } else if(this.state.name == null){
      alert('이름을 저장 하시오')
    } else if(this.state.image == null){
      alert('사진을 등록 하시오')
    // } else if(this.state.buttonColor == true){
    //   alert('이미 제출하였습니다')
    }
    else{
      // this.setState({buttonColor: true});
      this.props.navigation.navigate('SubmitScreen', {
        facilityNumber: this.state.facilityNumber,
        day: this.state.day,
        check1: this.state.checked1,
        check2: this.state.checked2,
        check3: this.state.checked3,
        check4: this.state.checked4,
        check5: this.state.checked5,
        check6: this.state.checked6,
        check7: this.state.checked7,
        check8: this.state.checked8,
        check9: this.state.checked9,
        check10: this.state.checked10,
        check11: this.state.checked11,
        check12: this.state.checked12,
        check13: this.state.checked13,
        check14: this.state.checked14,
        name : this.state.name,
        image : this.state.image,
        buttonColor : this.state.buttonColor
      });
    }
  }

  showCheckList = (check, title) => {
    console.log(check);
    return (
      <View style={styles.viewCheckStyle}>
        <Text style = {styles.textCheckStyle}>{title}</Text>
        <CheckBox
          title = '불량'
          checkedTitle = '적정'
          iconRight
          containerStyle = {{marginRight: 15}}
          checkedColor = 'rgb(44, 98, 210)'
          checked = {check}
          onPress = {() => this.setState({check: !this.state.check})}
        />
      </View>
    )
  }

  render(){
    let { image } = this.state;
    return (
      <ScrollView>
        <TouchableOpacity 
          style = {{alignItems: 'center'}}
          onPress = {this._pickImage}>
          {(this.state.image) ? <Image source = {{ uri: image }} style = {{ width: 375, height: 210}}/>
           :
          <View style = {{
            width: 375, height: 210, backgroundColor: '#dbdbdb',
            justifyContent: 'center', alignItems: 'center'
          }}>
            {image && <Image source = {{ uri: image }} style={{ width: 375, height: 210 }}/>}
            <Image 
              source = {require('../../assets/rectangle4.png')}
            />
            <Image
                source = {require('../../assets/icAddPhoto.png')}
                // size = {30}
                style = {{
                  // position: 'absolute', 
                  // // Right: 30,
                  // Left: 165, 
                  // top: 115,
                  top: 50,
                  marginLeft: 325,
                  // justifyContent: 'center', 
                  // alignItems: 'center'
                }}
            />
          </View>}
        </TouchableOpacity>
        <Text style = {styles.text1Style}>사진은 최대 8장까지 가능합니다.</Text>

        <View style = {{flexDirection: 'row', justifyContent: 'center', marginTop: 45}}>
          <Text style = {styles.textStyle}>건물 번호: </Text>
          <TouchableOpacity style = {styles.textInputStyle}>
            <Text style = {styles.textStyle}>{`${this.state.facilityNumber}`}</Text>
          </TouchableOpacity>
        </View>

        <View style = {{flexDirection: 'row', justifyContent: 'center', marginTop: 12}}>
          <Text style = {styles.textStyle}>점검자 명: </Text>
          {/* <TextInput
            style = {styles.textInputStyle}
            value = {this.state.name}
            onChangeText = {this._username}
          /> */}
          <TouchableOpacity 
            style = {styles.textInputStyle}
          >
            <Text style = {styles.textStyle}>{`${this.state.name}`}</Text>
          </TouchableOpacity>
        </View>

        <View style = {{flexDirection: 'row', justifyContent: 'center', marginTop: 12}}>
          <Text style = {styles.textStyle}>점검 일시 :</Text>
          <TouchableOpacity style = {styles.textInput2Style} onPress={this._showDateTimePicker}>
            {(this.state.day) ?
              <Text>{this.state.day.format('YYYY[년] MM[월] DD[일]')}</Text>
              : <Text style = {styles.textStyle}>날짜를 선택하시오</Text>
            }
            <Image 
              source = {require('../../assets/6A.png')}
              style = {{margin: 10}}
            />
          </TouchableOpacity>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />
        </View>

        
        <Text style = {styles.textSubStyle}>가스 시설</Text>
        {this.showCheckList(this.state.checked1, "가스 누설 경보기 설치 여부")}
        {this.showCheckList(this.state.checked2, "용기, 배관, 밸브 및 연소기의 파손. 변형. 노후 또는 부식 여부")}
        {this.showCheckList(this.state.checked3, "방화 환경조성 및 주의, 경고 표시 부착 및 파손 부분 여부")}
        {this.showCheckList(this.state.checked4, "가스용기 관리상태 및 가연성물질 방치 여부")}
        {this.showCheckList(this.state.checked5, "가스차단기, 경보기 등 정상작동 여부")}
        {this.showCheckList(this.state.checked6, "가스기기 이용실태 및 시설기준 적정여부")}
        {this.showCheckList(this.state.checked7, "가스보일러의 흡,배기구시설 설치 상태")}
        {this.showCheckList(this.state.checked8, "가스용기의 저장 지하실 환기 및 관리상태 확인")}
        {this.showCheckList(this.state.checked9, "가스사용 시설에 대한 정기 안전점검 실시 여부")}
        <Text style = {styles.textSubStyle}>방화 시설</Text>
        {this.showCheckList(this.state.checked10, "내장재의 불연화 여부")}
        {this.showCheckList(this.state.checked11, "비상구의 폐쇄 또는 다목적으로 사용 여부")}
        {this.showCheckList(this.state.checked12, "비상용 승강기의 적법 설치 여부")}
        <Text style = {styles.textSubStyle}>위험물 저장취급 시설</Text>
        {this.showCheckList(this.state.checked13, "불필요한 가연물의 방치 여부")}
        {this.showCheckList(this.state.checked14, "차광 및 환기 설비 이상 유무")}

        {/* <View style={styles.viewCheckStyle}>
            <Text style = {styles.textCheckStyle}>가스 누설 경보기 설치 여부</Text>
            <CheckBox
              title = '불량'
              checkedTitle = '적정'
              iconRight
              containerStyle = {{marginRight: 15}}
              checkedColor = 'rgb(44, 98, 210)'
              checked = {this.state.checked1}
              onPress = {() => this.setState({checked1: !this.state.checked1})}
            />
        </View> */}
        {/* <View style={styles.viewCheckStyle}>
            <Text style = {styles.textCheckStyle}>용기, 배관, 밸브 및 연소기의 파손. 변형. 노후 또는 부식 여부</Text>
            <CheckBox
              title = {(this.state.checked2) ? '적정' : '불량'}
              iconRight
              containerStyle = {{marginRight: 15}}
              checkedColor = 'rgb(44, 98, 210)'
              checked = {this.state.checked2}
              onPress = {() => this.setState({checked2: !this.state.checked2})}
            />
        </View>
        <View style={styles.viewCheckStyle}>
            <Text style = {styles.textCheckStyle}>방화 환경조성 및 주의, 경고 표시 부착 및 파손 부분 여부</Text>
            <CheckBox
              title={(this.state.checked3) ? '적정' : '불량'}
              iconRight
              containerStyle = {{marginRight: 15}}
              checkedColor = 'rgb(44, 98, 210)'
              checked={this.state.checked3}
              onPress={() => this.setState({checked3: !this.state.checked3})}
            />
        </View>
        <View style={styles.viewCheckStyle}>
            <Text style = {styles.textCheckStyle}>가스용기 관리상태 및 가연성물질 방치 여부</Text>
            <CheckBox
              title={(this.state.checked4) ? '적정' : '불량'}
              iconRight
              containerStyle = {{marginRight: 15}}
              checkedColor = 'rgb(44, 98, 210)'
              checked={this.state.checked4}
              onPress={() => this.setState({checked4: !this.state.checked4})}
            />
        </View>
        <View style={styles.viewCheckStyle}>
            <Text style = {styles.textCheckStyle}>가스차단기, 경보기 등 정상작동 여부</Text>
            <CheckBox
              title={(this.state.checked5) ? '적정' : '불량'}
              iconRight
              containerStyle = {{marginRight: 15}}
              checkedColor = 'rgb(44, 98, 210)'
              checked={this.state.checked5}
              onPress={() => this.setState({checked5: !this.state.checked5})}
            />
        </View>
        <View style={styles.viewCheckStyle}>
            <Text style = {styles.textCheckStyle}>가스기기 이용실태 및 시설기준 적정여부</Text>
            <CheckBox
              title={(this.state.checked6) ? '적정' : '불량'}
              iconRight
              containerStyle = {{marginRight: 15}}
              checkedColor = 'rgb(44, 98, 210)'
              checked={this.state.checked6}
              onPress={() => this.setState({checked6: !this.state.checked6})}
            />
        </View>
        <View style={styles.viewCheckStyle}>
            <Text style = {styles.textCheckStyle}>가스보일러의 흡,배기구시설 설치 상태</Text>
            <CheckBox
              title={(this.state.checked7) ? '적정' : '불량'}
              iconRight
              containerStyle = {{marginRight: 15}}
              checkedColor = 'rgb(44, 98, 210)'
              checked={this.state.checked7}
              onPress={() => this.setState({checked7: !this.state.checked7})}
            />
        </View>
        <View style={styles.viewCheckStyle}>
            <Text style = {styles.textCheckStyle}>가스용기의 저장 지하실 환기 및 관리상태 확인</Text>
            <CheckBox
              title={(this.state.checked8) ? '적정' : '불량'}
              iconRight
              containerStyle = {{marginRight: 15}}
              checkedColor = 'rgb(44, 98, 210)'
              checked={this.state.checked8}
              onPress={() => this.setState({checked8: !this.state.checked8})}
            />
        </View>
        <View style={styles.viewCheckStyle}>
            <Text style = {styles.textCheckStyle}>가스사용 시설에 대한 정기 안전점검 실시 여부</Text>
            <CheckBox
              title={(this.state.checked9) ? '적정' : '불량'}
              iconRight
              containerStyle = {{marginRight: 15}}
              checkedColor = 'rgb(44, 98, 210)'
              checked={this.state.checked9}
              onPress={() => this.setState({checked9: !this.state.checked9})}
            />
        </View>

        
        <Text style = {styles.textSubStyle}>방화 시설</Text>
        
        <View style={styles.viewCheckStyle}>
            <Text style = {styles.textCheckStyle}>내장재의 불연화 여부</Text>
            <CheckBox
              title={(this.state.checked10) ? '적정' : '불량'}
              iconRight
              containerStyle = {{marginRight: 15}}
              checkedColor = 'rgb(44, 98, 210)'
              checked={this.state.checked10}
              onPress={() => this.setState({checked10: !this.state.checked10})}
            />
        </View>
        <View style={styles.viewCheckStyle}>
            <Text style = {styles.textCheckStyle}>비상구의 폐쇄 또는 다목적으로 사용 여부</Text>
            <CheckBox
              title={(this.state.checked11) ? '적정' : '불량'}
              iconRight
              containerStyle = {{marginRight: 15}}
              checkedColor = 'rgb(44, 98, 210)'
              checked={this.state.checked11}
              onPress={() => this.setState({checked11: !this.state.checked11})}
            />
        </View>
        <View style={styles.viewCheckStyle}>
            <Text style = {styles.textCheckStyle}>비상용 승강기의 적법 설치 여부</Text>
            <CheckBox
              title={(this.state.checked12) ? '적정' : '불량'}
              iconRight
              containerStyle = {{marginRight: 15}}
              checkedColor = 'rgb(44, 98, 210)'
              checked={this.state.checked12}
              onPress={() => this.setState({checked12: !this.state.checked12})}
            />
        </View>
        
        <Text style = {styles.textSubStyle}>위험물 저장취급 시설</Text>
        
        <View style={styles.viewCheckStyle}>
            <Text style = {styles.textCheckStyle}>불필요한 가연물의 방치 여부</Text>
            <CheckBox
              title={(this.state.checked13) ? '적정' : '불량'}
              iconRight
              containerStyle = {{marginRight: 15}}
              checkedColor = 'rgb(44, 98, 210)'
              checked={this.state.checked13}
              onPress={() => this.setState({checked13: !this.state.checked13})}
            />
        </View>
        <View style={styles.viewCheckStyle}>
            <Text style = {styles.textCheckStyle}>차광 및 환기 설비 이상 유무</Text>
            <CheckBox
              title={(this.state.checked14) ? '적정' : '불량'}
              iconRight
              containerStyle = {{marginRight: 15}}
              checkedColor = 'rgb(44, 98, 210)'
              checked={this.state.checked14}
              onPress={() => this.setState({checked14: !this.state.checked14})}
            />
        </View> */}

        <View style = {{ marginTop: 20, alignItems: 'center'}}>
          <TouchableOpacity
            style = {[styles.btnStyle, 
              // {backgroundColor : (this.state.buttonColor) ? '#c8c8c8' : 'rgb(111, 155, 248)'}
              {backgroundColor : 'rgb(111, 155, 248)'}
            ]}
            onPress = {this._onButtonPress}
          >
            <Text style = {styles.btnTextStyle}>제출</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.textSubStyle}>
          <FormValidationMessage>{this.state.error}</FormValidationMessage>
        </View>
      </ScrollView>
    );
  }
}

makeMaterialNavRouter = (screenName, iconName) => {
  return {
   screen: screenName,
   navigationOptions: {
     tabBarIcon: ({tintColor}) => (
       <MaterialCommunityIcons name = {iconName} size = {25} color = {tintColor}/>
     )
   }
  };
}

export default createAppContainer(createMaterialTopTabNavigator({
    가스 : this.makeMaterialNavRouter(GasCheckScreen, 'gas-cylinder'),
    전기: this.makeMaterialNavRouter(ElectricCheckScreen,'car-battery'),
    승강기: this.makeMaterialNavRouter(ElevatorCheckScreen,'elevator'),
    빌딩: this.makeMaterialNavRouter(BuildingCheckScreen,'office-building'),
    소방: this.makeMaterialNavRouter(FireSafetyCheckScreen,'fire'),
  }, 
  {
    tabBarOptions: {
      activeTintColor: 'rgb(44, 98, 210)',
      inactiveTintColor: '#e1e1e1',
      style: {
        backgroundColor: 'white'
      },
      indicatorStyle: {
        backgroundColor: 'rgb(44, 98, 210)'
      },
      labelStyle:{
        fontSize: 14,
        fontWeight: "500"
      },
      showIcon: true
    },
  })
);

const styles = StyleSheet.create({
  textStyle: {
    // width: 49,
    // height: 18,
    // fontFamily: "NotoSans",
    marginLeft: 5,
    fontSize: 13,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#747272"
  },
  text1Style: {
    // width: 129,
    // height: 14,
    // fontFamily: "NotoSans",
    marginTop: 8,
    textAlign: 'center',
    fontSize: 10,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#a6a6a6"
  },
  text2Style: {
    width: 300,
    // height: 18,
    // fontFamily: "NotoSans",
    marginLeft: 20,
    fontSize: 13,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#747272"
  },
  textCheckStyle: {
    width: '60%', 
    height: 35, 
    marginLeft: 15,
    textAlignVertical: 'center',
    fontSize: 13,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#747272"
  },
  viewCheckStyle: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  textInputStyle: {
    width: 215, 
    height: 30, 
    marginLeft: 27, 
    backgroundColor: 'rgb(248, 248, 248)', 
    borderColor: 'rgb(236, 236, 236)', 
    borderWidth: 1
  },
  textInput2Style: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 215, 
    height: 30, 
    marginLeft: 27, 
    backgroundColor: 'rgb(248, 248, 248)', 
    borderColor: 'rgb(236, 236, 236)', 
    borderWidth: 1
  },
  textSubStyle: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#000000",
    textAlignVertical: 'center', 
    textAlign: 'center'
  },
  btnTextStyle: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 17,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#ffffff"
  },
  btnStyle: {
    width: 320,
    height: 52,
    justifyContent: 'center', 
    borderRadius: 2
  }
});