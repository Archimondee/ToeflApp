import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Card, CardItem, Button, Right, Left, Body} from 'native-base';
import Reinput from 'reinput';

export default class InfoScreen extends Component {
  constructor (props) {
    super (props);
    this.state = {
      jenis_soal : this.props.navigation.getParam('jenis_soal'),
      soal:[]
    };
  }

  getSoal(){
    fetch('https://kumpulan-soal-toefl.000webhostapp.com/api_soal/getSoal.php',{
      method:'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        jenis_soal: this.state.jenis_soal
      })
    }).then((response)=>response.json())
      .then((responseJson) => {
        //console.log(responseJson);
        this.setState({
          soal: responseJson,
        })
        console.log(this.state.soal[0]);
      })
  }
  componentDidMount(){
    this.getSoal();
  }

  render () {
    return (
      <View style={{paddingTop: 30, flex: 1}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 15,
            paddingRight: 15,
          }}
        >
          <Card style={{height: 600, width: '100%'}}>
            <CardItem
              header
              style={{justifyContent: 'center', alignItems: 'center'}}
            >
              <Text style={{fontSize: 20}}>
                Latihan soal {this.state.jenis_soal}
              </Text>
            </CardItem>
            <CardItem style={{flexDirection: 'column', marginLeft:10, marginRight:10}}>
              <Reinput label="No Pendaftaran" />
              <Reinput label="Nama" />
              <Reinput label="Kelas" />
              <Reinput label="Sekolah" />
              <Button onPress={()=>this.props.navigation.navigate('SoalText',{
                jenis_soal:this.state.jenis_soal,
                soal: this.state.soal
              })} style={{width: 150, justifyContent:'center', backgroundColor:'#E9B34F'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                  }}
                >
                  Submit
               </Text>
              </Button>
            </CardItem>
          </Card>
        </View>
      </View>
    );
  }
}
