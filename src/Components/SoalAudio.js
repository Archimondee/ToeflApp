import React, {Component} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import {
  Container,
  Header,
  View,
  DeckSwiper,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Body,
  Icon,
  Button,
  Radio,
  ListItem,
  Right,
  List,
  Content,
} from 'native-base';
import { Audio } from 'expo-av';
import {RadioGroup} from 'react-native-btr';
import {Ionicons,Entypo} from 'react-native-vector-icons';

const cards = [
  {
    uri: 'https://freesound.org/data/previews/413/413854_4337854-hq.mp3',
    id: '1',
    soal: 'Card One',
    jawaban_a: 'Jawaban A',
    jawaban_b: 'Jawbaan B',
    jawaban_c: 'Jawaban C',
    jawaban_d: 'Jawaban D',
    jawab: 'A',
  },
  {
    uri: 'https://freesound.org/data/previews/266/266626_2115985-lq.mp3',
    id: '2',
    soal: 'Card Two',
    jawaban_a: 'Jawaban A',
    jawaban_b: 'Jawbaan B',
    jawaban_c: 'Jawaban C',
    jawaban_d: 'Jawaban D',
    jawab: 'B',
  },
];



data = [];
export default class SoalAudio extends Component {
  constructor (props) {
    super (props);
    this.state = {
      hasil: '',
      ja: true,
      jb: false,
      jc: false,
      jd: false,
      ans: 'A',
      //soal akan di ganti cards
      soal: this.props.navigation.getParam('soal'),
      done: false,
      hasil: 0,
      nomor_soal: 0,
      //jenis soal akan di ganti
      jenis_soal: this.props.navigation.getParam('jenis_soal'),
      username: '',
      playingStatus: 'nosound',
      isEnabled: false
    };
  }

  toggle_a () {
    this.setState ({
      ja: true,
      jb: false,
      jc: false,
      jd: false,
      ans: 'A',
    });
  }
  toggle_b () {
    this.setState ({
      ja: false,
      jb: true,
      jc: false,
      jd: false,
      ans: 'B',
    });
  }
  toggle_c () {
    this.setState ({
      ja: false,
      jb: false,
      jc: true,
      jd: false,
      ans: 'C',
    });
  }
  toggle_d () {
    this.setState ({
      ja: false,
      jb: false,
      jc: false,
      jd: true,
      ans: 'D',
    });
  }

  resetAns () {
    this.setState ({
      ja: true,
      jb: false,
      jc: false,
      jd: false,
      ans: 'A',
    });
  }

  checkJawaban (id, c) {
    const {ans} = this.state;
    
    this.state.soal.map ((items, i) => {
      
      if (items.id == id) {
        console.log (items.id);
        console.log (id);
        console.log()
        if (items.jawaban_soal == ans) {
          //alert('Benar');
          this.setState ({
            hasil: this.state.hasil + 1,
          });
          console.log("Hasil : "+this.state.hasil)
          this.resetAns ();
          this._stopAudio();
          this._deckSwiper._root.swipeLeft ();
          
        } else {
          //alert('Salah');
          this.resetAns ();
          this._stopAudio();
          this._deckSwiper._root.swipeLeft ();
          
        }
      }
    });
  }

  getUsername () {
    AsyncStorage.getItem ('User', (err, result) => {
      if (result) {
        let hasil = JSON.parse (result);
        this.setState ({
          username: hasil[0].username,
        });
      }
    });
  }

  submitData () {
    const {hasil, jenis_soal} = this.state;
    nilai = hasil;
    AsyncStorage.getItem ('User', (err, result) => {
      if (result) {
        let hasil = JSON.parse (result);

        no_ujian = hasil[0].no_ujian;
        username = hasil[0].username;
        password = hasil[0].password;
        nama = hasil[0].nama;
        kelas = hasil[0].kelas;
        nilai_audio = hasil[0].nilai_audio;
        nilai_structure = hasil[0].nilai_structure;
        nilai_writing = hasil[0].nilai_writing;

        if (jenis_soal == 'audio') {
          nilai_audio = nilai;
        } 

        let User = [
          {
            no_ujian: no_ujian,
            username: username,
            password: password,
            nama: nama,
            kelas: kelas,
            nilai_audio: nilai_audio,
            nilai_structure: nilai_structure,
            nilai_writing: nilai_writing,
          },
        ];

        this.setState ({
          username: username,
        });

        AsyncStorage.setItem ('User', JSON.stringify (User));
        this.props.navigation.navigate ('Home');
      }
    });

    fetch (
      'https://kumpulan-soal-toefl.000webhostapp.com/api_soal/updateNilai.php',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify ({
          username: this.state.username,
          kd_matpel: this.state.jenis_soal,
          nilai: this.state.hasil,
        }),
      }
    )
      .then (response => response.json ())
      .then (responseJson => {
        if (responseJson == 'Berhasil') {
          alert ('Nilai berhasil di tambahkan\nTerimakasih');
          this.props.navigation.navigate ('Home');
        } else {
          alert ('Terjadi galat');
        }
      });
  }

  componentDidMount () {
    this.getUsername ();
  }

  async _playAudio (audio) {
    let a = audio;
    const {sound, status} = await Audio.Sound.createAsync (
      a,
      {
        shouldPlay: true,
        //isLooping: true,
      },
      this._updateScreenForSoundStatus
    );
    this.sound = sound;
    this.setState ({
      playingStatus: 'playing',
      isEnabled: true
    });
  }

  _updateScreenForSoundStatus = status => {
    //console.log(status.isPlaying);
    //console.log(this.state.playingStatus)
    if (status.isPlaying && this.state.playingStatus !== 'playing') {
      this.setState ({playingStatus: 'playing'});
    } else if (!status.isPlaying && this.state.playingStatus === 'playing') {
      this.setState ({playingStatus: 'donepause'});
    }
  };

  async _pauseAndPlayRecording () {
    console.log('Pause and play')
    if (this.sound != null) {
      if (this.state.playingStatus == 'playing') {
        console.log ('pausing...');
        await this.sound.pauseAsync ();
        console.log ('paused!');
        this.setState ({
          playingStatus: 'donepause',
        });
      } else {
        console.log ('playing...');
        await this.sound.playAsync ();
        console.log ('playing!');
        this.setState ({
          playingStatus: 'playing',
        });
      }
    }
  }

  _playAndPause = (audio) => {
    let a = audio;
    //console.log(this.state.playingStatus)
    switch (this.state.playingStatus) {
      case 'nosound':
        this._playAudio (a);
        break;
      case 'donepause':
      case 'playing':
        this._pauseAndPlayRecording();
        break;
    }
  };

  async _stopAudio () {
    if (this.sound != null) {
      if (this.state.playingStatus == 'playing') {
        await this.sound.stopAsync ();
        this.setState ({
          playingStatus: 'nosound',
          isEnabled: false
        });
      }else if(this.state.playingStatus == 'donepause'){
        await this.sound.stopAsync ();
        this.setState ({
          playingStatus: 'nosound',
          isEnabled: false
        });
      }
    }
  }

  back(){
    this._stopAudio();
    this.props.navigation.goBack();
  }

  

  render () {
    const {width} = Dimensions.get ('screen');
    return (
      <Container style={{paddingTop: 30, flex: 1}}>
        <Header style={{backgroundColor: '#E9B34F'}}>
          <Left>
            <TouchableOpacity onPress={() => this.back()}>
              <Ionicons name="ios-arrow-back" size={32} color="white" />
            </TouchableOpacity>
          </Left>
          <Body>
            <Text style={{color: 'white'}}>
              Latihan soal {this.state.jenis_soal}
            </Text>
          </Body>
          <Right />
        </Header>
        <View style={{flex: 2}}>
          <DeckSwiper
            style={{flex: 1}}
            ref={c => (this._deckSwiper = c)}
            dataSource={this.state.soal}
            looping={false}
            renderEmpty={() => (
              <View
                style={{
                  paddingTop: 20,
                  alignSelf: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{fontSize: 20}}>Hasil jawaban benar</Text>
                <Text style={{fontSize: 20, textAlign: 'center'}}>
                  {this.state.hasil}
                </Text>
                {this.state.hasil == 0
                  ? null
                  : <View style={{paddingTop: 30, width: width}}>
                      <View
                        style={{alignContent: 'center', alignItems: 'center'}}
                      >
                        <Button
                          onPress={() => this.submitData ()}
                          style={{
                            width: 150,
                            justifyContent: 'center',
                            backgroundColor: '#E9B34F',
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
                    </View>}
              </View>
            )}
            renderItem={(item, i = 0) => 
            (
              <Card style={{elevation: 3, flex: 1}}>
                <ScrollView
                  style={{flex: 1}}
                  horizontal={false}
                  contentContainerStyle={{flex: 1}}
                >
                
                  <CardItem
                    cardBody
                    style={{
                      paddingBottom: 10,
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  >
                    <ScrollView style={{height: 180, width: '100%', paddingTop:5}}>
                      <View style={{alignItems:'center', justifyContent:'center'}}>
                        <Text>Tekan button di bawah ini untuk memulai.</Text>
                        <View style={{paddingTop:10, height:50, width:100, flexDirection:'row', justifyContent:'space-around'}}>
                        <TouchableOpacity disabled={this.state.isEnabled} onPress={()=>this._playAudio(item)}>
                          <Ionicons name="ios-play" size={32} color="black"/>
                        </TouchableOpacity>
                          <TouchableOpacity onPress={()=>this._stopAudio()} >
                            <Entypo name="controller-stop" size={32} color="black"/>
                          </TouchableOpacity>
                        </View>
                        <Text>{item.soal}</Text>
                      </View>
                    </ScrollView>
                  </CardItem>
                  <Content>
                    <ListItem>
                      <Left>
                        <Text>A. {item.jawaban_a}</Text>
                      </Left>
                      <Right>
                        <Radio
                          selected={this.state.ja}
                          onPress={() => this.toggle_a ()}
                        />
                      </Right>
                    </ListItem>
                    <ListItem>
                      <Left>
                        <Text>B. {item.jawaban_b}</Text>
                      </Left>
                      <Right>
                        <Radio
                          selected={this.state.jb}
                          onPress={() => this.toggle_b ()}
                        />
                      </Right>
                    </ListItem>
                    <ListItem>
                      <Left>
                        <Text>C. {item.jawaban_c}</Text>
                      </Left>
                      <Right>
                        <Radio
                          selected={this.state.jc}
                          onPress={() => this.toggle_c ()}
                        />
                      </Right>
                    </ListItem>
                    <ListItem>
                      <Left>
                        <Text>D. {item.jawaban_d}</Text>
                      </Left>
                      <Right>
                        <Radio
                          selected={this.state.jd}
                          onPress={() => this.toggle_d ()}
                        />
                      </Right>
                    </ListItem>
                  </Content>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      justifyContent: 'space-between',
                      padding: 15,
                    }}
                  >
                    <View />
                    <Button
                      style={{width: 150, backgroundColor: '#E9B34F'}}
                      iconRight
                      onPress={() =>
                        this.checkJawaban (item.id, this._deckSwiper)}
                    >
                      <Icon style={{paddingLeft: 10}} name="arrow-forward" />
                      <Text style={{paddingRight: 10, color: 'white'}}>
                        Next
                      </Text>
                    </Button>
                  </View>
                </ScrollView>
              </Card>
            )}
          />
        </View>
      </Container>
    );
  }
}
