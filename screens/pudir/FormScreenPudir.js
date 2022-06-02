import React , { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    StatusBar
} from 'react-native';
import PropTypes from 'prop-types';
import { Header, Left, Right, Icon, Footer, Label} from 'native-base';
import Button from 'react-native-button';
import t from 'tcomb-form-native';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField }  from 'react-native-material-textfield';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';


class FormScreenPudir extends Component {
    
    static navigationOptions = {
        drawerIcon : ({tintColor})=>(
            <Icon name="paper" style={{ fontSize: 24, color: tintColor }}/>
        )
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

     ReturnPushNotificationToLab = ()  => {
        let response = fetch('https://exp.host/--/api/v2/push/send',{
            method: 'POST',
            headers: {
                Accept:'application/json',
                'Content-type':'application/json',
            },
            body: JSON.stringify({
                //Return Notif ke Laboran abis Update :D
                to:'ExponentPushToken[iOKij5DCO68TviDm2P2WMO]',
                title:'Peminjaman Laboratorium',
                body:'Pengajuan peminjaman lab Diterima Pudir'
            })
        });
      }
      ReturnPushNotificationToLaboranDitolak = ()  => {
        let response = fetch('https://exp.host/--/api/v2/push/send',{
            method: 'POST',
            headers: {
                Accept:'application/json',
                'Content-type':'application/json',
            },
            body: JSON.stringify({
                //Return Notif ke Laboran
                to:'ExponentPushToken[iOKij5DCO68TviDm2P2WMO]',
                title:'Peminjaman Laboratorium',
                body:'Peminjaman Laboratorium Ditolak Pudir karena ' + this.state.TextFieldAlasanTolak,
            })
        });
      }
    constructor(){
        super();
        this.state = {
        TextFieldid: '',
        TextFieldketua_kegiatan: '',
        TextFieldemail:'',
        TextFieldlab: '',
        TextFieldlevel: '',
        TextFieldperangkat:'',
        TextFieldketerangan:'',
        TextFieldtanggal_mulai: '',
        TextFieldtanggal_selesai: '',
        TextFieldjam_mulai: '',
        TextFieldjam_selesai: '',
        TextFielddaftar_nama: '',
        TextFieldkeperluan: '',
        TextFieldkontak_ketua:'',
        TextFielddosen_pembina: '',
        TextFieldapp_laboran: '',
        TextFieldapp_kalab: '',
        TextFieldapp_kajur: '',
        TextFieldapp_pudir: '',
        TextFieldAlasanTolak: '',
        }
    }

    componentDidMount(){
        const { navigation } = this.props;  
        // Received Student Details Sent From Previous Activity and Set Into State.
        this.setState({ 
            TextFieldid : this.props.navigation.state.params.id,
            TextFieldketua_kegiatan: this.props.navigation.state.params.ketua_kegiatan,
            TextFieldemail:this.props.navigation.state.params.email,
            TextFieldlab: this.props.navigation.state.params.lab,
            TextFieldlevel: this.props.navigation.state.params.level,
            TextFieldperangkat: this.props.navigation.state.params.perangkat,
            TextFieldketerangan: this.props.navigation.state.params.keterangan,
            TextFieldtanggal_mulai: this.props.navigation.state.params.tanggal_mulai,
            TextFieldtanggal_selesai : this.props.navigation.state.params.tanggal_selesai,
            TextFieldjam_mulai: this.props.navigation.state.params.jam_mulai,
            TextFieldjam_selesai: this.props.navigation.state.params.jam_selesai,
            TextFielddaftar_nama: this.props.navigation.state.params.daftar_nama,
            TextFieldkeperluan: this.props.navigation.state.params.keperluan,
            TextFieldkontak_ketua : this.props.navigation.state.params.kontak_ketua,
            TextFielddosen_pembina: this.props.navigation.state.params.dosen_pembina,
            TextFieldapp_laboran: this.props.navigation.state.params.app_laboran,
            TextFieldapp_kalab:this.props.navigation.state.params.app_kalab,
            TextFieldapp_kajur: this.props.navigation.state.params.app_kajur,
            TextFieldapp_pudir: this.props.navigation.state.params.app_pudir,
        })
   
       }

    Update(TextFieldid){
        fetch('http://192.168.43.181:8000/api/pinjams/'+TextFieldid, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ketua_kegiatan : this.state.TextFieldketua_kegiatan,
              email: this.state.TextFieldemail,
              lab : this.state.TextFieldlab,
              level : this.state.TextFieldlevel,
              perangkat: this.state.TextFieldperangkat,
              keterangan: this.state.TextFieldketerangan,
              tanggal_mulai: this.state.TextFieldtanggal_mulai,
              tanggal_selesai : this.state.TextFieldtanggal_selesai,
              jam_mulai : this.state.TextFieldjam_mulai,
              jam_selesai : this.state.TextFieldjam_selesai,
              daftar_nama : this.state.TextFielddaftar_nama,
              keperluan: this.state.TextFieldkeperluan,
              kontak_ketua : this.state.TextFieldkontak_ketua,
              dosen_pembina : this.state.TextFielddosen_pembina,
              app_pudir : this.state.TextFieldapp_pudir,
      
            })
            }).then((result) => {
                result.json().then((resp) => {
                    console.warn("resp", resp)
                    alert("Data is Updated")
                    if(this.state.TextFieldlevel == 1 || this.state.TextFieldlevel == 2 ||  this.state.TextFieldlevel == 3 && this.state.TextFieldapp_kalab == "Diterima"){
                        this.ReturnPushNotificationToLab();
                    // yg method return nti optional aja coba dulu yg level 1 ntr baru buka comment nya
                    } else if(this.state.TextFieldlevel == 1 && this.state.TextFieldapp_kalab == "Ditolak"){
                        this.ReturnPushNotificationToLaboranDitolak();
                    }
                })
            })
    } 

    render() {
          let approval = [{
            value: 'Diterima',
            }, {
            value: 'Ditolak',
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
                
                <Text>ID:   {this.state.TextFieldid}    Level:   {this.state.TextFieldlevel}</Text>
                <TextField
                    label = 'ketua_kegiatan'
                    onChangeText={ (TextInputValue) => this.setState({ TextFieldketua_kegiatan: TextInputValue }) }
                    value={this.state.TextFieldketua_kegiatan}
                    editable={false}
                />
               <TextField
                    label = 'Email'
                    onChangeText={ (TextInputValue) => this.setState({ TextFieldemail: TextInputValue }) }
                    value={this.state.TextFieldemail}
                    editable={false}
                />
               <TextField
                    label='Laboratorium'
                    onChangeText={ (TextInputValue) => this.setState({ TextFieldlab: TextInputValue }) }
                    value={this.state.TextFieldlab}
                    editable={false}
                />
                <TextField
                    label='Perangkat yang Dipinjam'
                    onChangeText={ (TextInputValue) => this.setState({ TextFieldperangkat: TextInputValue }) }
                    value={this.state.TextFieldperangkat}
                    editable={false}
                />
                <TextField
                    label='Keterangan Tambahan (Perangkat yang Dipinjam)'
                    onChangeText={ (TextInputValue) => this.setState({ TextFieldketerangan: TextInputValue }) }
                    value={this.state.TextFieldketerangan}
                    editable={false}
                />
                <TextField
                    label = 'Tanggal Mulai'
                    // value = {tanggal_mulai}
                    onChangeText={ (TextInputValue) => this.setState({ TextFieldtanggal_mulai: TextInputValue }) }
                    // onChange={(data) => { this.setState({tanggal_mulai:data.target.value}) }}
                    value={this.state.TextFieldtanggal_mulai}
                    editable={false}
                />
                
                <TextField
                    label = 'Tanggal Selesai'
                    // value = {tanggal_selesai}
                    onChangeText={ (TextInputValue) => this.setState({ TextFieldtanggal_selesai: TextInputValue }) }
                    // onChange={(data) => { this.setState({tanggal_selesai:data.target.value}) }}
                    value={this.state.TextFieldtanggal_selesai}
                    editable={false}
                />

                <TextField
                    label = 'Jam Mulai (Format HH.MM)'
                    // value = {jam_mulai}
                    onChangeText={ (TextInputValue) => this.setState({ TextFieldjam_mulai: TextInputValue }) }
                    // onChange={(data) => { this.setState({jam_mulai:data.target.value}) }}
                    value={this.state.TextFieldjam_mulai}
                    editable={false}
                />

                <TextField
                    label = 'Jam Selesai (Format HH.MM)'
                    // value = {jam_selesai}
                    onChangeText={ (TextInputValue) => this.setState({ TextFieldjam_selesai: TextInputValue }) }
                    // onChange={(data) => { this.setState({jam_selesai:data.target.value}) }}
                    value={this.state.TextFieldjam_selesai}
                    editable={false}
                />

                <TextField
                    label = 'Keperluan'
                    // value = {keperluan}
                    onChangeText={ (TextInputValue) => this.setState({ TextFieldkeperluan: TextInputValue }) }
                    // onChange={(data) => { this.setState({keperluan:data.target.value}) }}
                    value={this.state.TextFieldkeperluan}
                    editable={false}
                />

                <TextField
                    label = 'Daftar Nama'
                    // value = {daftar_nama}
                    onChangeText={ (TextInputValue) => this.setState({ TextFielddaftar_nama: TextInputValue }) }
                    // onChange={(data) => { this.setState({daftar_nama:data.target.value}) }}
                    value={this.state.TextFielddaftar_nama}
                    editable={false}
                />

                <TextField
                    label = 'kontak_ketua'
                    // value = {kontak_ketua}
                    onChangeText={ (TextInputValue) => this.setState({ TextFieldkontak_ketua: TextInputValue }) }
                    // onChange={(data) => { this.setState({kontak_ketua:data.target.value}) }}
                    value={this.state.TextFieldkontak_ketua}
                    editable={false}
                />
                <TextField
                    label = 'Persetujuan Laboran'
                    // value = {kepala laboran}
                    onChangeText={ (TextInputValue) => this.setState({ TextFieldapp_laboran: TextInputValue }) }
                    // onChange={(data) => { this.setState({kontak_ketua:data.target.value}) }}
                    value={this.state.TextFieldapp_laboran}
                    editable={false}
                />
                <TextField
                    label = 'Persetujuan Kepala Laboratorium'
                    // value = {kepala laboran}
                    onChangeText={ (TextInputValue) => this.setState({ TextFieldapp_kalab: TextInputValue }) }
                    // onChange={(data) => { this.setState({kontak_ketua:data.target.value}) }}
                    value={this.state.TextFieldapp_kalab}
                    editable={false}
                />
                <TextField
                    label = 'Persetujuan Kepala Jurusan'
                    // value = {kepala laboran}
                    onChangeText={ (TextInputValue) => this.setState({ TextFieldapp_kajur: TextInputValue }) }
                    // onChange={(data) => { this.setState({kontak_ketua:data.target.value}) }}
                    value={this.state.TextFieldapp_kajur}
                    editable={false}
                />
                <Dropdown
                    label='Persetujuan Pudir I'
                    data={approval}
                    onChangeText={ (TextInputValue) => this.setState({ TextFieldapp_pudir: TextInputValue }) }
                    value={this.state.TextFieldapp_pudir}
                />
                <TextField
                    label = 'Alasan Penolakan'
                    // value = {kepala laboran}
                    onChangeText={ (TextInputValue) => this.setState({ TextFieldAlasanTolak: TextInputValue }) }
                    // onChange={(data) => { this.setState({kontak_ketua:data.target.value}) }}
                    value={this.state.TextFieldAlasanTolak}
                />
                <Button
                    style={{fontSize:20, color:'orange'}}
                    styleDisabled={{color:'grey'}}
                    onPress ={()=>{this.Update(this.state.TextFieldid)}}
                    > {"\n"} Submit
                </Button>
                </View>
                <Footer style={{backgroundColor:'white'}}>
                    <Text style={{paddingTop:10,color:'grey'}}>{"\n"}Copyright reserved to @Leony_vw</Text>
                </Footer>
            </ScrollView>
           
        );
    }
    
}

export default FormScreenPudir;

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