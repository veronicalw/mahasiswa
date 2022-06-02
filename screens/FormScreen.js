import React , { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    StatusBar
} from 'react-native';
import { Header, Left, Right, Icon, Footer, Label} from 'native-base';
import Button from 'react-native-button';
import t from 'tcomb-form-native';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField }  from 'react-native-material-textfield';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import * as firebase from 'firebase';
import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';
const PUSH_ENDPOINT = 'http://192.168.43.181:8000/api/notifs';

class FormScreens extends Component {
    static navigationOptions = {
        drawerIcon : ({tintColor})=>(
            <Icon name="paper" style={{ fontSize: 24, color: tintColor }}/>
        )
     }

     async componentDidMount(){
        this.registerForPushNotificationsAsync();
    }

     registerForPushNotificationsAsync = async() => {
        const { status: existingStatus } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
      
        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
          // Android remote notification permissions are granted during the app
          // install, so this will only ask on iOS
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
      
        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
          return;
        }
      
        // Get the token that uniquely identifies this device
        let token = await Notifications.getExpoPushTokenAsync();
        // POST the token to your backend server from where you can retrieve it to send push notifications.
        return fetch(PUSH_ENDPOINT,{
            method:'POST',
            headers:{
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify({
                token_expo: token,
            })
        })
        .then((result) => {
            result.json().then((resp) => {
                console.warn("resp", resp)
                alert("Token is Received")
                // this.registerPushNotificationsAsync();
            })
        })
      };

      
    constructor(){
        super();
        this.state = {
        ketua_kegiatan: '',
        email:'',
        lab: '',
        level: '',
        perangkat: '',
        keterangan:'',
        tanggal_mulai: '',
        tanggal_selesai: '',
        jam_mulai: '',
        jam_selesai: '',
        daftar_nama: '',
        keperluan: '',
        kontak_ketua:'',
        dosen_pembina: '',
        app_laboran: '',
        app_kalab: '',
        app_kajur: '',
        app_pudir: '',
        }
           }
    
    submit(){
        //Handler for the Submit onPress
        if (this.state.ketua_kegiatan == '' || this.state.email == '' || this.state.lab == '' ||
            this.state.level == '' || this.state.perangkat == '' ||this.state.tanggal_mulai == '' ||
            this.state.tanggal_selesai == '' || this.state.jam_mulai == '' || this.state.jam_selesai == '' ||
            this.state.daftar_nama == '' || this.state.keperluan == '' || this.state.kontak_ketua == '' ||
            this.state.dosen_pembina == '') {
            alert('Please Fill Out The Require Form')
        } else {
            let url = "http://192.168.43.181:8000/api/pinjams";
            let data = this.state;
            fetch(url,{
                method:'POST',
                headers:{
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                },
                body: JSON.stringify(data)
            })
            .then((result) => {
                result.json().then((resp) => {
                    console.warn("resp", resp)
                    alert("Data is Submitted")
                    this.SendPushNotifications();
                })
            })
        };
    } 
    SendPushNotifications = ()  => {
        let response = fetch('https://exp.host/--/api/v2/push/send',{
            method: 'POST',
            headers: {
                Accept:'application/json',
                'Content-type':'application/json',
            },
            body: JSON.stringify({
                //Mahasiswa ke Laboran
                to:'ExponentPushToken[iOKij5DCO68TviDm2P2WMO]',
                title:'Peminjaman Laboratorium',
                body:'Pengajuan peminjaman lab terbaru',
            })
        });
      }
    // handleLevelNotif(level){
    //     if (level == 1){
        
    //     } else if (level == 2){

    //     } else {
            
    //     }
    // }

    render() {
        let lab = [{
                value: '313',
            }, {
                value: '316',
            }, {
                value: '317',
            }, {
                value: '319',
            }, {
                value: '320',
            }, {
                value: '324',
            }, {
                value: '325',
            }, {
                value: '329',
            }, {
                value: '330',
            }, {
                value: '234',
            }, {
                value: '283',
            }, {
                value: '218',
            }, {
                value: '224',
            }, {
                value: '225',
            }, {
                value: '230',
            }, {
                value: '233',
            }, {
                value: '135',
            }, {
                value: '136',
            }, {
                value: '137',
            }, {
                value: 'Workshop',
            }, {
                value: 'Lab Bahasa',
          }];  
          let level = [{
                value: 1,
            }, {
                value: 2,
            }, {
                value: 3,
          }]; 
          let perangkat = [{
                value: 'Mesin Render 317',
            }, {
                value: 'Router Mikrotik',
            }, {
                value: 'PC',
            }, {
                value: 'Headphone',
            }, {
                value: 'PC MAC',
            }, {
                value: 'Switch',
            }, {
                value: 'Solder',
            }, {
                value: 'Arduino',
            }, {
                value: 'IP Phone',
            }, {
                value: 'Multimeter',
            }, {
                value: 'Tang Ampere',
            }, {
                value: 'Mega Ohm',
            }, {
                value: 'Tang Press',
            }, {
                value: 'Kunci Pas',
            }, {
                value: 'Gerinda',
            }, {
                value: 'Mesin Bor',
        }]; 
          
        return (
            //08-08-2019 (Ubah view menjadi ScrollView)
            <ScrollView style={styles.container}>
                <StatusBar hidden />
                <Header style={{backgroundColor:'orange', flex:0.8}}>
                    <Left style={{justifyContent:"flex-start",flex:1,marginTop:5}}>
                        <Icon name="menu" onPress={()=>this.props.navigation.openDrawer()} />
                    </Left>
                </Header>
                <View style={{padding:20}}>
                <Text style={{fontSize:20,textAlign: 'center',paddingLeft:20,fontWeight: 'bold'}}>{"\n"}Halaman Pengajuan</Text>
                <TextField
                    label = 'Ketua Kegiatan'
                    // value = {ketua_kegiatan}
                    onChangeText={ (ketua_kegiatan) => this.setState({ ketua_kegiatan }) }
                    // onChange={(data) => { this.setState({ketua_kegiatan:data.target.value}) }}
                    value = {this.state.ketua_kegiatan}
                />
                <TextField
                    label = 'Email'
                    // value = {ketua_kegiatan}
                    onChangeText={ (email) => this.setState({ email }) }
                    // onChange={(data) => { this.setState({ketua_kegiatan:data.target.value}) }}
                    value = {this.state.email}
                />
               <Dropdown
                    label='Laboratorium'
                    data={lab}
                    onChangeText={ (lab) => this.setState({ lab }) }
                />
                
                <Dropdown
                    label='Level'
                    data={level}
                    onChangeText={ (level) => this.setState({ level }) }
                />
                <Dropdown
                    label='Perangkat yang Dipinjam'
                    data={perangkat}
                    onChangeText={ (perangkat) => this.setState({ perangkat }) }
                />
                <TextField
                    label = 'Keterangan Tambahan (Perangkat yang Dipinjam)'
                    // value = {ketua_kegiatan}
                    onChangeText={ (keterangan) => this.setState({ keterangan }) }
                    // onChange={(data) => { this.setState({ketua_kegiatan:data.target.value}) }}
                    value = {this.state.keterangan}
                />
                <Text>{"\n"}</Text>
                <DatePicker
                    label="Tanggal Mulai"
                    style={{width: 300}}
                    date={this.state.tanggal_mulai}
                    mode="date"
                    placeholder="Tanggal Mulai"
                    format="YYYY-MM-DD"
                    minDate="2016-05-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    }}
                    onDateChange={(tanggal_mulai) => {this.setState({tanggal_mulai})}}
                    value = {this.state.tanggal_mulai}
                    
                />
                <Text>{"\n"}</Text>
                <DatePicker
                    label="Tanggal Selesai"
                    style={{width: 300}}
                    date={this.state.tanggal_selesai}
                    mode="date"
                    placeholder="Tanggal Selesai"
                    format="YYYY-MM-DD"
                    minDate="2016-05-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    }}
                    onDateChange={(tanggal_selesai) => {this.setState({tanggal_selesai})}}
                    value = {this.state.tanggal_selesai}
                />
                
                <TextField
                    label = 'Jam Mulai Format (HH.MM)'
                    // value = {jam_mulai}
                    onChangeText={ (jam_mulai) => this.setState({ jam_mulai }) }
                    // onChange={(data) => { this.setState({jam_mulai:data.target.value}) }}
                    value = {this.state.jam_mulai}
                />
                
                <TextField
                    label = 'Jam Selesai Format (HH.MM)'
                    // value = {jam_selesai}
                    onChangeText={ (jam_selesai) => this.setState({ jam_selesai }) }
                    // onChange={(data) => { this.setState({jam_selesai:data.target.value}) }}
                    value = {this.state.jam_selesai}
                />

                <TextField
                    label = 'Keperluan'
                    // value = {keperluan}
                    onChangeText={ (keperluan) => this.setState({ keperluan }) }
                    // onChange={(data) => { this.setState({keperluan:data.target.value}) }}
                    value = {this.state.keperluan}
                />

                <TextField
                    label = 'Daftar Nama'
                    // value = {daftar_nama}
                    onChangeText={ (daftar_nama) => this.setState({ daftar_nama }) }
                    // onChange={(data) => { this.setState({daftar_nama:data.target.value}) }}
                    value = {this.state.daftar_nama}
                />

                <TextField
                    label = 'kontak_ketua'
                    // value = {kontak_ketua}
                    onChangeText={ (kontak_ketua) => this.setState({ kontak_ketua }) }
                    // onChange={(data) => { this.setState({kontak_ketua:data.target.value}) }}
                    value = {this.state.kontak_ketua}
                />

                <TextField
                    label = 'Dosen Pembina'
                    // value = {dosen_pembina}
                    onChangeText={ (dosen_pembina) => this.setState({ dosen_pembina }) }
                    // onChange={(data) => { this.setState({dosen_pembina:data.target.value}) }}
                    value = {this.state.dosen_pembina}
                />
               
                <Button
                    style={{fontSize:20, color:'orange'}}
                    styleDisabled={{color:'grey'}}
                    onPress ={()=>{this.submit()}}
                    > {"\n"} Submit
                </Button>
                </View>
                {/* <Form type={Pengajuan}/> */}

                <Footer style={{backgroundColor:'white'}}>
                    <Text style={{paddingTop:10,color:'grey'}}>{"\n"}Copyright reserved to @Leony_vw</Text>
                </Footer>
            </ScrollView>

            
        );
    }
    
}

export default FormScreens;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      
    //   ...Platform.select({
    //     android: {
    //         marginTop: StatusBar.currentHeight
    //     }
    // })
    },
  });