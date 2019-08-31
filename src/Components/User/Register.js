import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView, AsyncStorage} from 'react-native';

import {
  Container,
  Header,
  Content,
  Item,
  Input,
  Icon,
  Form,
  Label,
  Button,
} from 'native-base';

export default class Register extends Component {
  constructor (props) {
    super (props);
    this.state = {
      nama: '',
      kelas: '',
      username: '',
      password:'',
      confirm: '',

    };
  }

  submitRegister(){
    const {nama, kelas, username, password, confirm} = this.state;
    jumlah = 0;
    nama!=''?(jumlah+=1):null;
    kelas!=''?(jumlah+=1):null;
    username!=''?(jumlah+=1):null;
    password!=''?(jumlah+=1):null;
    confirm!=''?(jumlah+=1):null;
    if(jumlah!=5){
      alert('Periksa kembali form pendaftaran');
    }else{
      if(password!=confirm){
        alert('Password tidak sama');
      }else{
        fetch('https://kumpulan-soal-toefl.000webhostapp.com/api_soal/Register.php',{
        method:'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          username: username,
          password: password,
          kelas: kelas,
          nama: nama
        })
      }).then((response)=>response.json())
        .then((responseJson) => {
          //console.log(responseJson);
          if(responseJson=='Ada'){
            alert('Username telah terdaftar');
          }else if(responseJson=='Gagal'){
            alert('Terjadi galat')
          }else{
            alert('Terimakasih telah mendaftar');
            AsyncStorage.setItem('User',JSON.stringify(responseJson));
            this.props.navigation.navigate('Home');
          }
        })
      }
    }
  }

  render () {
    return (
      <View
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
          paddingTop: 30,
          backgroundColor: 'white',
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          }}
        >
          <View style={{height:200, width:200}}>
            <Image 
              style={{height:200, width:200}}
              source={require('../../../assets/logo.jpeg')}
              resizeMode={'contain'}
            />
          </View>
        </View>
        <View style={{flex: 1.5}}>
          <ScrollView style={{flex:1.5, paddingBottom:15}}>
            <Form style={{}}>
            <Item floatingLabel style={{borderBottomWidth: 0}}>
              <Label style={{color: 'black'}}>Username</Label>
              <Input
                onChangeText={(username)=>this.setState({username})}
                style={{borderBottomColor: 'black', borderBottomWidth: 2}}
              />
            </Item>
            <Item floatingLabel style={{borderBottomWidth: 0}}>
              <Label style={{color: 'black'}}>Password</Label>
              <Input
                secureTextEntry={true}
                onChangeText={(password)=>this.setState({password})}
                style={{borderBottomColor: 'black', borderBottomWidth: 2}}
              />
            </Item>
            <Item floatingLabel style={{borderBottomWidth: 0}}>
              <Label style={{color: 'black'}}>Confirm Password</Label>
              <Input
                secureTextEntry={true}
                onChangeText={(confirm)=>this.setState({confirm})}
                style={{borderBottomColor: 'black', borderBottomWidth: 2}}
              />
            </Item>
            <Item floatingLabel style={{borderBottomWidth: 0}}>
              <Label style={{color: 'black'}}>Nama</Label>
              <Input
                onChangeText={(nama)=>this.setState({nama})}
                style={{borderBottomColor: 'black', borderBottomWidth: 2}}
              />
            </Item>
            <Item floatingLabel style={{borderBottomWidth: 0}}>
              <Label style={{color: 'black'}}>Kelas</Label>
              <Input
                onChangeText={(kelas)=>this.setState({kelas})}
                style={{borderBottomColor: 'black', borderBottomWidth: 2}}
              />
            </Item>
          </Form>
          <View
            style={{
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              paddingTop: 30,
            }}
          >
            <Button
              onPress={()=>this.submitRegister()}
              style={{
                height: 50,
                width: 200,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#E9B34F',
              }}
            >
              <Text style={{color: 'white'}}>Register</Text>
            </Button>
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}
            >
              <Text style={{fontSize: 16}}>Already have an account ?</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate ('Login')}
              >
                <Text style={{fontSize: 16, color: 'black'}}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
          </ScrollView>
          
        </View>
      </View>
    );
  }
}
