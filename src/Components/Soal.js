import React, {Component} from 'react';
import {Text, View, Dimensions, TouchableOpacity, AsyncStorage} from 'react-native';
import {Card} from 'native-base';
import {FontAwesome5, MaterialIcons, Ionicons} from 'react-native-vector-icons';

export default class Soal extends Component {
  constructor(props){
    super(props);
    this.state={
      nilai_structure : '',
      nilai_writing: ''
    }
  }

  getSoal(jenis_soal){
    var js = jenis_soal;
    fetch('https://kumpulan-soal-toefl.000webhostapp.com/api_soal/getSoal.php',{
      method:'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        jenis_soal: js
      })
    }).then((response)=>response.json())
      .then((responseJson) => {
        //console.log(responseJson);
        // this.setState({
        //   soal: responseJson,
        // })
        this.props.navigation.navigate('SoalText',{
          soal: responseJson,
          jenis_soal: js
        })
        //console.log(this.state.soal[0]);
      })
  }

  getNilai(){
    AsyncStorage.getItem('User',(err, result)=>{
      if(result){
        let hasil = JSON.parse(result);
        this.setState({
          nilai_structure: hasil[0].nilai_structure,
          nilai_writing: hasil[0].nilai_writing
        })
      }
    })
  }

  componentDidMount(){
    this.getNilai();
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
            flex: 1,
          }}
        >
          <View>
            <Text style={{fontSize: 25}}>Latihan Soal Text</Text>
          </View>
          <View
            style={{
              paddingTop: 20,
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent:'center',
              marginLeft: 20,
              marginRight: 20,
            }}
          >
          
              <Card
              style={{
                height: 100,
                width: '100%',
                marginRight: 15,
                marginTop: 10,
                borderRadius: 10,
                backgroundColor: '#E9B34F',
                marginLeft: 20,
                marginRight: 20,
              }}
            >
              <TouchableOpacity onPress={()=>this.getSoal('writing')} style={{flex: 1, flexDirection: 'column'}}>
                <View
                  style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Ionicons name="ios-hand" size={32} color="white" />
                </View>
                <View style={{flex: 1}}>
                  <Text
                    style={{fontSize: 18, textAlign: 'center', color: 'white'}}
                  >
                    Latihan soal reading
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
                backgroundColor: '#E9B34F',
                marginLeft: 20,
                marginRight: 20,
              }}
            >
              <TouchableOpacity onPress={()=>this.getSoal('structure')} style={{flex: 1, flexDirection: 'column'}}>
                <View
                  style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Ionicons name="ios-bookmarks" size={32} color="white" />
                </View>
                <View style={{flex: 1}}>
                  <Text
                    style={{fontSize: 18, textAlign: 'center', color: 'white'}}
                  >
                    Latihan soal structure
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
