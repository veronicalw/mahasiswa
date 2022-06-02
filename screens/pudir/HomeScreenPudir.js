import React , { Component } from 'react';
import {
    StatusBar,
    ScrollView,
    View,
    Text,
    StyleSheet
} from 'react-native';
import { Header, Left, Right, Icon, List } from 'native-base';
import ajax from '../../fetchDB/fetchDataPinjam';
import Button from 'react-native-button';
import ListPudir from '../../src/component/ListPudir';
class HomeScreenPudir extends Component {
    
    state = {
        pinjams: [],
        currentUser: null
    }
    async componentDidMount(){
        const pinjams = await ajax.fetchDataPinjam();
        this.setState({pinjams});
    }

    static navigationOptions = {
        drawerIcon : ({tintColor})=>(
            <Icon name="home" style={{ fontSize: 24, color: tintColor }}/>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden />
                <Header style={{backgroundColor:'orange'}} centerComponent={{ text: 'Halaman Utama', style: { color: '#ffffff' } }}>
                    <Left style={{justifyContent:"flex-start",flex:1,marginTop:5}}>
                        <Icon name="menu" onPress={()=>this.props.navigation.openDrawer()} />
                    </Left>
                </Header>
                <View style={{justifyContent:"center", paddingTop:10, paddingBottom:10}} >
                    <ScrollView>
                    <Text style={{alignContent:"center"}}>Aplikasi Pembantu Direktur I</Text>
                    {
                        this.state.pinjams.length > 0
                        ? <ListPudir pinjams={this.state.pinjams} />
                        : <Text>Tidak Ada Peminjaman</Text>
                    }
                    </ScrollView>
                </View>
            </View>
        );    
    }
}
export default HomeScreenPudir;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
  });
 