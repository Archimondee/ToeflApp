import React, { Component } from 'react';
import { Image, Text } from 'react-native';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Left, Body, Icon, Button, Radio, ListItem, Right, List, Content } from 'native-base';
import {RadioGroup} from 'react-native-btr';
//import console = require('console');

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
export default class SoalWriting extends Component {
  constructor(props){
    super(props);
    this.state={
      hasil: '',
      ja:true,
      jb:false,
      jc:false,
      jd:false,
      ans: 'A'
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
    cards.map((items,i)=>{
      if(items.id == id){
        if(items.jawab==ans){
          alert('Benar');
          this.resetAns();
          this._deckSwiper._root.swipeLeft();
        }else{
          alert('Salah');
          this.resetAns();
          this._deckSwiper._root.swipeLeft();
        }
      }
    })
  }
  
  render() {
    return (
      <Container>
        <Header />
        <View>
          <DeckSwiper
            ref={(c) => this._deckSwiper = c}
            dataSource={cards}
            looping={false}
            renderEmpty={() =>
              <View style={{ alignSelf: "center" }}>
                <Text>Hasil Jawaban</Text>
              </View>
            }
            renderItem={(item) =>
              <Card style={{ elevation: 3 }}>
                <CardItem header>
                  <Text>Soal No {item.id}</Text>
                </CardItem>
                <CardItem cardBody style={{paddingBottom:10, paddingLeft:10, paddingRight:10}}>
                  <Text>{item.soal}</Text>
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
                  <Button style={{width:150}} iconRight onPress={() => this.checkJawaban(item.id, this._deckSwiper)}>
                    <Icon style={{paddingLeft:10}} name="arrow-forward" />
                    <Text style={{paddingRight:10, color:'white'}}>Next</Text>
                  </Button>
                </View>
              </Card>
            }
          />
        </View>
      </Container>
    );
  }
}