import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, AsyncStorage} from 'react-native';

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

export default class LoginScreen extends Component {
  constructor (props) {
    super (props);
    this.state = {
      username: '',
      password: ''
    };
  }

  submitLogin(){
    const {username, password} = this.state;
    jumlah = 0;
    username!=''?(jumlah+=1):null;
    password!=''?(jumlah+=1):null;

    if(jumlah!=2){
      alert('Periksa kembali form login');
    }else{
      fetch('https://kumpulan-soal-toefl.000webhostapp.com/api_soal/Login.php',{
        method:'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          username: username,
          password: password,
        })
      }).then((response)=>response.json())
        .then((responseJson) => {
          //console.log(responseJson);
          if(responseJson=='Tidak'){
            alert('Wrong username or password');
          }else {
            alert('Selamat datang');
            AsyncStorage.setItem('User',JSON.stringify(responseJson));
            this.props.navigation.navigate('Home');
          }
        })
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
          <Form style={{paddingTop: 30, padding: 10}}>
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
                onChangeText={(password)=>this.setState({password})}
                secureTextEntry={true}
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
              onPress={() => this.submitLogin()}
              style={{
                height: 50,
                width: 200,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#E9B34F',
              }}
            >
              <Text style={{color: 'white'}}>Login</Text>
            </Button>
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}
            >
              <Text style={{fontSize: 16}}>Dont have an account ?</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate ('Register')}
              >
                <Text style={{fontSize: 16, color: 'black'}}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
