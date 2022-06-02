import React, { Component } from 'react';
import {  View, Text, StyleSheet, Platform, StatusBar, RefreshControl} from 'react-native';
import PropTypes from 'prop-types';
import Button from 'react-native-button';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import { ScrollView } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';

class PinjamList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }

  static propTypes = {
      pinjams: PropTypes.array.isRequired
  }; 
  moveToForm = (id,ketua_kegiatan,email,lab,level,perangkat,keterangan,tanggal_mulai,tanggal_selesai,jam_mulai,jam_selesai,daftar_nama,keperluan,
    kontak_ketua,dosen_pembina,app_laboran,app_kalab,app_kajur,app_pudir) =>{
    this.props.navigation.navigate('Detail',{
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
        {this.props.pinjams.map((pinjam) => {
            return (
                <ScrollView key={pinjam.id} refreshControl={<RefreshControl refreshing ={this.state.refreshing} onRefresh={this.onRefresh}/>}>
                  <Card>
                  {/* <CardImage
                    source={{uri: 'http://www.rset.edu.in/pages/uploads/images/computerLab-img1.jpg'}} 
                    title={pinjam.lab}
                  /> */}
                  <CardTitle 
                    title={ pinjam.ketua_kegiatan }
                    subtitle={ pinjam.keperluan }
                  />
                  <CardContent><Text>{ pinjam.lab}</Text></CardContent>
                  <CardContent><Text>{ pinjam.tanggal_mulai} s/d {pinjam.tanggal_selesai }</Text></CardContent>
                  <CardContent><Text>{ pinjam.jam_mulai } - {pinjam.jam_selesai }</Text></CardContent>
                </Card>
                <Button
                    style={{fontSize:20, color:'green'}}
                    styleDisabled={{color:'grey'}}
                    onPress ={() => this.moveToForm(pinjam.id, pinjam.ketua_kegiatan,pinjam.email, pinjam.lab, pinjam.level, pinjam.perangkat,pinjam.keterangan,
                      pinjam.tanggal_mulai, pinjam.tanggal_selesai, pinjam.jam_mulai, pinjam.jam_selesai, pinjam.daftar_nama,
                      pinjam.keperluan,pinjam.kontak_ketua, pinjam.dosen_pembina, pinjam.app_laboran, pinjam.app_kalab,
                      pinjam.app_kajur,pinjam.app_pudir)}
                    > {"\n"} Detail
                </Button>
                <Text>{"\n"}{"\n"}</Text>
                </ScrollView>
            )
        })}
      </View>
    );
  }

}

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
export default withNavigation(PinjamList);