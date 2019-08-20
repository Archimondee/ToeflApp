import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, ScrollView, Dimensions, AsyncStorage } from 'react-native';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Left, Body, Icon, Button, Radio, ListItem, Right, List, Content } from 'native-base';
import {RadioGroup} from 'react-native-btr';
import {Ionicons} from 'react-native-vector-icons'

  const cards = [
    {
      id:'1',
      soal: 'Card One',
      jawaban_a: 'Jawaban A',
      jawaban_b: 'Jawbaan B',
     jawaban_c: 'Jawaban C',
      jawaban_d: 'Jawaban D',
      jawab:'A'
    },
    {
      id:'2',
      soal: 'Card Two',
      jawaban_a: 'Jawaban A',
      jawaban_b: 'Jawbaan B',
      jawaban_c: 'Jawaban C',
      jawaban_d: 'Jawaban D',
      jawab:'B'
    },
  ];

  data = [];
export default class SoalText extends Component {
  constructor(props){
    super(props);
    this.state={
      hasil: '',
      ja:true,
      jb:false,
      jc:false,
      jd:false,
      ans: 'A',
      soal:this.props.navigation.getParam('soal'),
      done:false,
      hasil:0,
      nomor_soal:0,
      jenis_soal: this.props.navigation.getParam('jenis_soal'),
      username: ''
    }
  }

  toggle_a(){
    this.setState({
      ja:true,
      jb:false,
      jc:false,
      jd:false,
      ans:'A'
    });
  }
  toggle_b(){
    this.setState({
      ja:false,
      jb:true,
      jc:false,
      jd:false,
      ans:'B'
    });
  }
  toggle_c(){
    this.setState({
      ja:false,
      jb:false,
      jc:true,
      jd:false,
      ans:'C'
    });
  }
  toggle_d(){
    this.setState({
      ja:false,
      jb:false,
      jc:false,
      jd:true,
      ans:'D'
    });
  }

  resetAns(){
    this.setState({
      ja:true,
      jb:false,
      jc:false,
      jd:false,
      ans:'A'
    })
  }


  checkJawaban(id,c){
    const {ans}=this.state;
    this.state.soal.map((items,i)=>{
      if(items.id == id){
        if(items.jawaban==ans){
          //alert('Benar');
          this.setState({
            hasil:this.state.hasil + 1
          })
          this.resetAns();
          this._deckSwiper._root.swipeLeft();
        }else{
          //alert('Salah');
          this.resetAns();
          this._deckSwiper._root.swipeLeft();
        }
      }
    })
  }

  getUsername(){
    AsyncStorage.getItem('User',(err, result)=>{
      if(result){
        let hasil = JSON.parse(result);
        this.setState({
          username: hasil[0].username
        })
      }
    })
  }

  submitData(){
    const {hasil, jenis_soal} = this.state;
    nilai = hasil;
    AsyncStorage.getItem('User',(err, result)=>{
      if(result){
        let hasil = JSON.parse(result);
        
        no_ujian = hasil[0].no_ujian;
        username = hasil[0].username;
        password = hasil[0].password;
        nama = hasil[0].nama;
        kelas = hasil[0].kelas;
        nilai_audio = hasil[0].nilai_audio;
        nilai_structure = hasil[0].nilai_structure;
        nilai_writing = hasil[0].nilai_writing;

        if(jenis_soal == 'writing'){
          nilai_writing = nilai;
        }else if(jenis_soal == 'structure'){
          nilai_structure = nilai;
        }

        let User = [{
          no_ujian: no_ujian,
          username: username,
          password: password,
          nama: nama,
          kelas: kelas,
          nilai_audio: nilai_audio,
          nilai_structure: nilai_structure,
          nilai_writing: nilai_writing
        }]

        AsyncStorage.setItem('User', JSON.stringify(User));
        this.props.navigation.navigate('Soal');

      }
    })
  }

  componentDidMount(){
    this.getUsername();
  }
  
  render() {
    const {width} = Dimensions.get('screen');
    return (
      <Container style={{paddingTop:30, flex:1}}>
        <Header style={{backgroundColor:'#2F954E'}}>
          <Left>
          <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
            <Ionicons name="ios-arrow-back" size={32} color="white"/>
          </TouchableOpacity>
          </Left>
          <Body>
            <Text style={{color:'white'}}>Latihan soal {this.state.jenis_soal}</Text>
          </Body>
          <Right/>
        </Header>
        <View style={{flex:2}}>
          <DeckSwiper
            style={{flex:1}}
            ref={(c) => this._deckSwiper = c}
            dataSource={this.state.soal}
            looping={false}
            renderEmpty={() => (
              <View style={{paddingTop: 20, alignSelf: 'center', alignItems:'center'}}>
                <Text style={{fontSize: 20}}>Hasil jawaban benar</Text>
                <Text style={{fontSize: 20, textAlign: 'center'}}>
                  {this.state.hasil}
                </Text>
                {this.state.hasil == 0
                  ? null
                  : <View style={{paddingTop: 30, width:width}}>
                      <View style={{alignContent:'center', alignItems:'center'}}>
                        <Button
                        onPress={() => this.submitData()}
                        style={{
                          width: 150,
                          justifyContent: 'center',
                          backgroundColor: '#2F954E',
                        }}
                      >
                        <Text
                          style={{
                            textAlign: 'center',
                            color: 'white',
                          }}
                        >
                          Submit
                        </Text>
                      </Button>
                      </View>
                      
                      <ScrollView style={{marginTop:15, paddingBottom:15, paddingTop:15,paddingLeft:10, paddingRight:10, height:'80%', width:'100%'}}>
                        <View style={{width:'100%', borderColor:'black', borderWidth:1, flexDirection:'column'}}>
                          <View style={{flexDirection:'row'}}>
                            <View style={{flex:0.3, borderBottomColor:'black', borderWidth:1, alignContent:'center',alignItems:'center'}}>
                              <Text>No</Text>
                            </View>
                            <View style={{flex:1.5, borderBottomColor:'black', borderWidth:1, alignContent:'center',alignItems:'center'}}>
                              <Text>Soal</Text>
                            </View>
                            <View style={{flex:1, borderBottomColor:'black', borderWidth:1, alignContent:'center',alignItems:'center'}}>
                              <Text>Penjelasan</Text>
                            </View>
                            <View style={{flex:0.5, borderBottomColor:'black', borderWidth:1, alignContent:'center',alignItems:'center'}}>
                              <Text>Jawaban</Text>
                            </View>
                          </View>
                          {
                            this.state.soal.map((items, i)=>{
                              return(
                                <View key={i} style={{flexDirection:'row'}}>
                                  <View style={{flex:0.3, borderBottomColor:'black', borderWidth:1, alignContent:'center',alignItems:'center'}}>
                                    <Text>{i+1}</Text>
                                  </View>
                                  <View style={{flex:1.5, borderBottomColor:'black', borderWidth:1, alignContent:'center',alignItems:'center', padding:5}}>
                                    <Text>{items.pertanyaan}</Text>
                                  </View>
                                  <View style={{flex:1, borderBottomColor:'black', borderWidth:1, alignContent:'center',alignItems:'center', padding:5}}>
                                    <Text>{items.penjelasan}</Text>
                                  </View>
                                  <View style={{flex:0.5, borderBottomColor:'black', borderWidth:1, alignContent:'center',alignItems:'center', padding:5}}>
                                    <Text>{items.jawaban}</Text>
                                  </View>
                                </View>
                              )
                            })
                          }
                        </View>
                      </ScrollView>
                    </View>
                }
              </View>
            )}
            renderItem={(item,i=0) =>
              <Card style={{ elevation: 3, flex:1 }}>
                <ScrollView style={{flex:1}} horizontal={false} contentContainerStyle={{flex:1}}>
                  <CardItem cardBody style={{paddingBottom:10, paddingLeft:10, paddingRight:10}}>
                    <ScrollView style={{height:200, width:200}}>
                      <Text>{item.pertanyaan}</Text>
                    </ScrollView>
                  </CardItem>
                  <Content>
                  <ListItem>
                    <Left>
                      <Text>A. {item.jawaban_a}</Text>
                    </Left>
                    <Right>
                      <Radio selected={this.state.ja} onPress={()=>this.toggle_a()}/>
                    </Right>
                  </ListItem>
                  <ListItem>
                    <Left>
                      <Text>B. {item.jawaban_b}</Text>
                    </Left>
                    <Right>
                      <Radio selected={this.state.jb} onPress={()=>this.toggle_b()}/>
                    </Right>
                  </ListItem> 
                  <ListItem>
                    <Left>
                      <Text>C. {item.jawaban_c}</Text>
                    </Left>
                    <Right>
                      <Radio selected={this.state.jc} onPress={()=>this.toggle_c()}/>
                    </Right>
                  </ListItem> 
                  <ListItem>
                    <Left>
                      <Text>D. {item.jawaban_d}</Text>
                    </Left>
                    <Right>
                      <Radio selected={this.state.jd} onPress={()=>this.toggle_d()}/>
                    </Right>
                  </ListItem> 
                  </Content>
                  <View style={{ flexDirection: "row", flex: 1, justifyContent: 'space-between', padding: 15 }}>
                    <View>

                    </View>
                    <Button style={{width:150, backgroundColor:'#2F954E'}} iconRight onPress={() => this.checkJawaban(item.id, this._deckSwiper)}>
                      <Icon style={{paddingLeft:10}} name="arrow-forward" />
                      <Text style={{paddingRight:10, color:'white'}}>Next</Text>
                    </Button>
                  </View>
                </ScrollView>
              </Card>
            }
          />
        </View>
      </Container>
    );
  }
}