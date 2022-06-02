import React, { Component } from 'react';
import {  View, Text, StyleSheet, StatusBar} from 'react-native';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardContent, CardImage } from 'react-native-material-cards';
import { withNavigation } from 'react-navigation';
import Button from 'react-native-button';
import { ScrollView } from 'react-native-gesture-handler';
class ListKajur extends Component {
  static propTypes = {
    pinjams: PropTypes.array.isRequired
}; 
  _OnButtonPress(no_pengajuan) {
    Alert.alert(no_pengajuan.toString());
  }
  handleDelete(id){
    let url = "http://192.168.43.181:8000/api/pinjams/"+id ;
    let data = this.state;
    fetch(url,{
        method:'DELETE',
        headers:{
          "Content-Type" : "application/json",
          "Accept" : "application/json"
      },
      body: JSON.stringify(data)
    })
    .then((result) => {
        result.json().then((resp) => {
            console.warn("resp", resp)
            alert("Data is Removed")
        })
    })
}

moveToForm = (id,ketua_kegiatan,email,lab,level,perangkat,keterangan,tanggal_mulai,tanggal_selesai,jam_mulai,jam_selesai,daftar_nama,keperluan,
  kontak_ketua,dosen_pembina,app_laboran,app_kalab,app_kajur,app_pudir) =>{
  this.props.navigation.navigate('FormKajur',{
    id: id,
    ketua_kegiatan: ketua_kegiatan,
    email: email,
    lab: lab,
    level: level,
    perangkat:perangkat,
    keterangan:keterangan,
    tanggal_mulai: tanggal_mulai,
    tanggal_selesai: tanggal_selesai,
    jam_mulai: jam_mulai,
    jam_selesai: jam_selesai,
    daftar_nama: daftar_nama,
    keperluan: keperluan,
    kontak_ketua: kontak_ketua,
    dosen_pembina: dosen_pembina,
    app_laboran: app_laboran,
    app_kalab:app_kalab,
    app_kajur:app_kajur,
    app_pudir:app_pudir,
  });
}

  render() {
    return (
      <View style={styles.pinjamList}>
        <StatusBar hidden />
        <ScrollView>
        {this.props.pinjams.map((pinjam) => {
            return (
                <ScrollView key={pinjam.id}>
                  {/* Baru nambah data */}
                  <Card >
                  {/* <CardImage 
                    source={{uri: 'http://www.rset.edu.in/pages/uploads/images/computerLab-img1.jpg'}} 
                    title={pinjam.lab } 
                  /> */}
                  <CardTitle 
                    title={ pinjam.ketua_kegiatan }
                    subtitle={ pinjam.keperluan }
                  />
                  <CardContent><Text>{ pinjam.lab}</Text></CardContent>
                  <CardContent><Text>{ pinjam.tanggal_mulai} s/d  {pinjam.tanggal_selesai }</Text></CardContent>
                  <CardContent><Text>{ pinjam.jam_mulai } - {pinjam.jam_selesai }</Text></CardContent>
                </Card>
                <Button
                    style={{fontSize:20, color:'red'}}
                    styleDisabled={{color:'grey'}}
                    onPress ={()=>{this.handleDelete(pinjam.id)}}
                    > {"\n"} Delete
                </Button>
                <Button
                    style={{fontSize:20, color:'green'}}
                    styleDisabled={{color:'grey'}}
                    onPress ={() => this.moveToForm(pinjam.id, pinjam.ketua_kegiatan,pinjam.email, pinjam.lab, pinjam.level, pinjam.perangkat,pinjam.ketua_kegiatan,
                      pinjam.tanggal_mulai, pinjam.tanggal_selesai, pinjam.jam_mulai, pinjam.tanggal_selesai, pinjam.daftar_nama,
                      pinjam.keperluan,pinjam.kontak_ketua, pinjam.dosen_pembina, pinjam.app_laboran, pinjam.app_kalab,
                      pinjam.app_kajur,pinjam.app_pudir)}
                    > {"\n"} Update
                </Button>
                <Text>{"\n"}{"\n"}{"\n"}{"\n"}</Text>
                </ScrollView>
            )
        })}
        </ScrollView>
      </View>
    );
  }

}
export default withNavigation(ListKajur);
const styles = StyleSheet.create({
    pinjamList: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    pinjamtext: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cardImg: {
        width:50,
        height: 60
    }
});
