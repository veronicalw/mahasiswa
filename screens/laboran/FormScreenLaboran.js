import React , { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    StatusBar,
    Platform,
    Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { Header, Left, Right, Icon, Footer, Label} from 'native-base';
import Button from 'react-native-button';
import t from 'tcomb-form-native';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField }  from 'react-native-material-textfield';
import { RNHTMLtoPDF } from 'react-native-html-to-pdf';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';
import email from 'react-native-email';
import * as Print from 'expo-print';

class FormScreenLaboran extends Component {
    
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

      SendPushNotifications = ()  => {
        let response = fetch('https://exp.host/--/api/v2/push/send',{
            method: 'POST',
            headers: {
                Accept:'application/json',
                'Content-type':'application/json',
            },
            body: JSON.stringify({
                to:'ExponentPushToken[4F-P4-B9mdIT9kHtj7AEmt]',
                title:'Peminjaman Laboratorium',
                body:'Pengajuan peminjaman lab terbaru'
            })
        });
      }
      // Ini nanti masukin ke method untuk send PDF, biar notifnya sejalan :D
      ReturnPushNotificationToMHSTolak = ()  => {
        let response = fetch('https://exp.host/--/api/v2/push/send',{
            method: 'POST',
            headers: {
                Accept:'application/json',
                'Content-type':'application/json',
            },
            body: JSON.stringify({
                to:'ExponentPushToken[hjFV99K29MP3iGWVERVR6i]',
                title:'Peminjaman Laboratorium',
                body:'Pengajuan Peminjaman Anda Ditolak Laboran karena ' + this.state.TextFieldAlasanTolak,
            })
        });
      }
      // Ini nanti masukin ke method untuk send PDF, biar notifnya sejalan :D
      ReturnPushNotificationToMHS = ()  => {
        let response = fetch('https://exp.host/--/api/v2/push/send',{
            method: 'POST',
            headers: {
                Accept:'application/json',
                'Content-type':'application/json',
            },
            body: JSON.stringify({
                to:'ExponentPushToken[hjFV99K29MP3iGWVERVR6i]',
                title:'Bukti Peminjaman Laboratorium',
                body:'Pengajuan peminjaman lab anda diterima, Silahkan cek pada email anda'
            })
        });
      }
      handleEmail = () =>{
        // this.askPermission.bind(this);
        const to = (this.state.TextFieldemail) // string or array of email addresses
        email(to, {
            // Optional additional arguments
            subject: 'Peminjaman Laboratorium',
            body: 'Peminjaman Laboratorium Anda Telah Diterima, Silahkan Download Bukti Pengajuan Anda:',
        }).catch(console.error);
        this.ReturnPushNotificationToMHS();
      }
      

    async createPDF() {

    let filePath = await Print.printAsync({
      html:  '<h1 style="text-align: center;"><strong>Bukti Peminjaman Laboratorium</strong></h1>' +
                '<Header align="center"><img src="https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiLz-_67q_lAhUJcCsKHaNtAP0QjRx6BAgBEAQ&url=https%3A%2F%2Fid.wikipedia.org%2Fwiki%2FBerkas%3APoliteknik_Caltex_Riau.png&psig=AOvVaw1UYEZsJySh5sbNJsAYQ3WA&ust=1571833694362498"></Header>'+
              '<p style="text-align: center;">Data Peminjaman Lab ID : '+(this.state.TextFieldid)+
              '</p><p style="text-align: center;"><strong>by Lab.Co</strong></p><table>'+
              '<tr><td><strong> Ketua Kegiatan </strong></td><td>:</td><td>'+(this.state.TextFieldketua_kegiatan)+'</td></tr><tr><td></td></tr>'+
              '<tr><td><strong> Laboratorium </strong></td><td>:</td><td>'+(this.state.TextFieldlab)+'</td></tr><tr><td></td></tr>'+
              '<tr><td><strong> Email </strong></td><td>:</td><td>'+(this.state.TextFieldemail)+'</td></tr><tr><td></td></tr>'+
              '<tr><td><strong> Level </strong></td><td>:</td><td>'+(this.state.TextFieldlevel)+'</td></tr><tr><td></td></tr>'+
              '<tr><td><strong> Perangkat </strong></td><td>:</td><td>'+(this.state.TextFieldperangkat)+'</td></tr><tr><td></td></tr>'+
              '<tr><td><strong> Level </strong></td><td>:</td><td>'+(this.state.TextFieldketerangan)+'</td></tr><tr><td></td></tr>'+
              '<tr><td><strong> Tanggal Mulai </strong></td><td>:</td><td>'+(this.state.TextFieldtanggal_mulai)+'</td></tr><tr><td></td></tr>'+
              '<tr><td><strong> Tanggal Selesai </strong></td><td>:</td><td>'+(this.state.TextFieldtanggal_selesai)+'</td></tr><tr><td></td></tr>'+
              '<tr><td><strong> Jam Mulai </strong></td><td>:</td><td>'+(this.state.TextFieldjam_mulai)+'</td></tr><tr><td></td></tr>'+
              '<tr><td><strong> Jam Selesai </strong></td><td>:</td><td>'+(this.state.TextFieldjam_selesai)+'</td></tr><tr><td></td></tr>'+
              '<tr><td><strong> Daftar Nama </strong></td><td>:</td><td>'+(this.state.TextFielddaftar_nama)+'</td></tr><tr><td></td></tr>'+
              '<tr><td><strong> Keperluan </strong></td><td>:</td><td>'+(this.state.TextFieldkeperluan)+'</td></tr><tr><td></td></tr>'+
              '<tr><td><strong> Kontak Ketua </strong></td><td>:</td><td>'+(this.state.TextFieldkontak_ketua)+'</td></tr><tr><td></td></tr>'+
              '<tr><td><strong> Dosen Pembina </strong></td><td>:</td><td>'+(this.state.TextFielddosen_pembina)+'</td></tr><tr><td></td></tr>'+
              '<tr><td><strong> Persetujuan Laboran </strong></td><td>:</td><td>'+(this.state.TextFieldapp_laboran)+'</td></tr><tr><td></td></tr>'+
              '<tr><td><strong> Persetujuan Kepala Laboran </strong></td><td>:</td><td>'+(this.state.TextFieldapp_kalab)+'</td></tr><tr><td></td></tr>'+
              '</table><br><br><br><br>'+
              '<Footer<center>&copy; Copyright 2019 LAB.CO<br><br>'
              +this.state.date+'</center></footer>',
      width : 612,
      height : 792,
      base64 : false
    });

    alert('PDF Generated', filePath.uri);
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
        filepath:'',
        }
    }

    componentDidMount(){
        // Received Student Details Sent From Previous Activity and Set Into State.
        var that = this;
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
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
            date: date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
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
              app_laboran : this.state.TextFieldapp_laboran,
            })
            }).then((result) => {
                result.json().then((resp) => {
                    console.warn("resp", resp)
                    alert("Data is Updated")
                    if(this.state.TextFieldlevel == 1 && this.state.TextFieldapp_kalab == "Diterima"){
                        this.ReturnPushNotificationToMHS();
                    // yg method return nti optional aja coba dulu yg level 1 ntr baru buka comment nya
                    } else if(this.state.TextFieldlevel == 1 && this.state.TextFieldapp_kalab == "Ditolak"){
                        this.ReturnPushNotificationToMHSTolak();      
                    } else if(this.state.TextFieldlevel == 1 || this.state.TextFieldlevel == 2 ||  this.state.TextFieldlevel == 3){
                        this.SendPushNotifications();
                    // yg method direct send notif untuk level 2 dan 3
                    } else if(this.state.TextFieldlevel == 2 ||  this.state.TextFieldlevel == 3 && this.state.TextFieldapp_kalab == "Ditolak" ){
                        this.ReturnPushNotificationToMHSTolak();
                    // yg method direct send notif untuk level 2 dan 3
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
                <Dropdown
                    label='Persetujuan Laboran'
                    data={approval}
                    onChangeText={ (TextInputValue) => this.setState({ TextFieldapp_laboran: TextInputValue }) }
                    value={this.state.TextFieldapp_laboran}
                />
                <TextField
                    label = 'Persetujuan Kepala Laboran'
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
                <TextField
                    label = 'Persetujuan Kepala Pudir'
                    // value = {kepala laboran}
                    onChangeText={ (TextInputValue) => this.setState({ TextFieldapp_pudir: TextInputValue }) }
                    // onChange={(data) => { this.setState({kontak_ketua:data.target.value}) }}
                    value={this.state.TextFieldapp_pudir}
                    editable={false}
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
                <Button
                    style={{fontSize:20, color:'orange'}}
                    styleDisabled={{color:'grey'}}
                    onPress ={()=>{this.createPDF()}}
                    > {"\n"} Generate PDF
                </Button>
                <Button
                    style={{fontSize:20, color:'orange'}}
                    styleDisabled={{color:'grey'}}
                    onPress ={()=>{this.handleEmail()}}
                    > {"\n"} Send to Mhs
                </Button>
                </View>
                <Footer style={{backgroundColor:'white'}}>
                    <Text style={{paddingTop:10,color:'grey'}}>{"\n"}Copyright reserved to @Leony_vw</Text>
                </Footer>
            </ScrollView>
           
        );
    }
    
}

export default FormScreenLaboran;

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