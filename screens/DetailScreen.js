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

class FormScreens extends Component {
    static navigationOptions = {
        drawerIcon : ({tintColor})=>(
            <Icon name="paper" style={{ fontSize: 24, color: tintColor }}/>
        )
     }
    constructor(){
        super();
        this.state = {
            TextFieldid: '',
            TextFieldketua_kegiatan: '',
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
        }
    }
    componentDidMount(){
        // Received Student Details Sent From Previous Activity and Set Into State.
        this.setState({ 
            TextFieldid : this.props.navigation.state.params.id,
            TextFieldketua_kegiatan: this.props.navigation.state.params.ketua_kegiatan,
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
            TextFieldapp_kalab: this.props.navigation.state.params.app_kalab,
            TextFieldapp_kajur: this.props.navigation.state.params.app_kajur,
            TextFieldapp_pudir: this.props.navigation.state.params.app_pudir,
        })
   
       }

    render() {
        let labs = [{
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
          let levels = [{
                value: 1,
            }, {
                value: 2,
            }, {
                value: 3,
          }]; 
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
                    label = 'Jam Mulai'
                    // value = {jam_mulai}
                    onChangeText={ (TextInputValue) => this.setState({ TextFieldjam_mulai: TextInputValue }) }
                    // onChange={(data) => { this.setState({jam_mulai:data.target.value}) }}
                    value={this.state.TextFieldjam_mulai}
                    editable={false}
                />

                <TextField
                    label = 'Jam Selesai'
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
                    label = 'Dosen Pembina'
                    // value = {dosen_pembina}
                    onChangeText={ (TextInputValue) => this.setState({ TextFielddosen_pembina: TextInputValue }) }
                    // onChange={(data) => { this.setState({dosen_pembina:data.target.value}) }}
                    value={this.state.TextFielddosen_pembina}
                    editable={false}
                />
                <TextField
                    label='Persetujuan Laboran'
                    onChangeText={ (TextInputValue) => this.setState({ TextFieldapp_laboran: TextInputValue }) }
                    value={this.state.TextFieldapp_laboran}
                    editable={false}
                />
                <TextField
                    label='Persetujuan Kepala Laboran'
                    onChangeText={ (TextInputValue) => this.setState({ TextFieldapp_kalab: TextInputValue }) }
                    value={this.state.TextFieldapp_kalab}
                    editable={false}
                />
                <TextField
                    label='Persetujuan Kepala Jurusan'
                    onChangeText={ (TextInputValue) => this.setState({ TextFieldapp_kajur: TextInputValue }) }
                    value={this.state.TextFieldapp_kajur}
                    editable={false}
                />
                <TextField
                    label='Persetujuan Pembantu Direktur'
                    onChangeText={ (TextInputValue) => this.setState({ TextFieldapp_pudir: TextInputValue }) }
                    value={this.state.TextFieldapp_pudir}
                    editable={false}
                />
                </View>
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
      
    },
  });