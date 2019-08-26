import React, {Component} from 'react';
import {Text, View, Dimensions, TouchableOpacity, AsyncStorage} from 'react-native';
import {Card} from 'native-base';
import {FontAwesome5,MaterialIcons, Ionicons} from 'react-native-vector-icons';

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state={
      nama: ''
    }
  }

  _logout(){
    AsyncStorage.clear();
    this.props.navigation.navigate('Login');
  }

  getDataDiri(){
    AsyncStorage.getItem('User',(err, result)=>{
      if(result){
        let hasil = JSON.parse(result);
        this.setState({
          nama: hasil[0].nama
        })
      }
    })
  }

  componentDidMount(){
    this.getDataDiri();
  }
  render () {
    const {width, height} = Dimensions.get ('screen');
    return (
      <View style={{flex: 1, paddingTop: 30}}>
        <View
          style={{
            paddingTop: 30,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            flex:1
          }}
        >
          <View style={{justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize: 25}}>Toefl App</Text>
            <Text style={{fontSize: 20}}>Hello, {this.state.nama}</Text>
          </View>
          <View
            style={{
              paddingTop: 20,
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center', marginLeft:20, marginRight:20
            }}
          >
            <Card
                style={{
                  height: 100,
                  width: '100%',
                  marginRight: 15,
                  marginTop: 10,
                  borderRadius: 10,
                  backgroundColor:'#2F954E',
                  marginLeft:20, marginRight:20
                }}
              >
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Soal')} style={{ flex: 1, flexDirection: 'column' }}>
                  <View
                    style={{
                      flex: 2,
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <FontAwesome5 name="pencil-alt" size={32} color="white"/>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, textAlign: 'center', color:'white' }}>
                      Latihan soal text
                    </Text>
                  </View>
                </TouchableOpacity>
              </Card>
              <Card
                style={{
                  height: 100,
                  width: '100%',
                  marginRight: 15,
                  marginTop: 10,
                  borderRadius: 10,
                  backgroundColor:'#2F954E',
                  marginLeft:20, marginRight:20
                }}
              >
                <TouchableOpacity  style={{ flex: 1, flexDirection: 'column' }}>
                  <View
                    style={{
                      flex: 2,
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <MaterialIcons name="audiotrack" size={32} color="white"/>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, textAlign: 'center', color:'white' }}>
                      Latihan soal audio
                    </Text>
                  </View>
                </TouchableOpacity>
              </Card>
              <Card
                style={{
                  height: 100,
                  width: '100%',
                  marginRight: 15,
                  marginTop: 10,
                  borderRadius: 10,
                  backgroundColor:'#2F954E',
                  marginLeft:20, marginRight:20
                }}
              >
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('History')} style={{ flex: 1, flexDirection: 'column' }}>
                  <View
                    style={{
                      flex: 2,
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <FontAwesome5 name="history" size={32} color="white"/>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, textAlign: 'center', color:'white' }}>
                      History
                    </Text>
                  </View>
                </TouchableOpacity>
              </Card>
              <Card
                style={{
                  height: 100,
                  width: '100%',
                  marginRight: 15,
                  marginTop: 10,
                  borderRadius: 10,
                  backgroundColor:'#2F954E',
                  marginLeft:20, marginRight:20
                }}
              >
                <TouchableOpacity 
                 onPress={()=>this._logout()}
                 style={{ flex: 1, flexDirection: 'column' }}>
                  <View
                    style={{
                      flex: 2,
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Ionicons name="ios-log-out" size={32} color="white"/>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, textAlign: 'center', color:'white' }}>
                      Logout
                    </Text>
                  </View>
                </TouchableOpacity>
              </Card>
          </View>
        </View>
      </View>
    );
  }
}
