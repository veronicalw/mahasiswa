import React , { Component } from 'react';
import {
    StatusBar,
    ScrollView,
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native';
import { Header, Left, Right, Icon } from 'native-base';
import ajax from '../fetchDB/fetchDataPinjam';
import PinjamList from '../src/component/PinjamList';
import * as firebase from 'firebase';
class HomeScreen extends Component {

    
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
    
    signOutUser = async () => {
        try {
            await firebase.auth().signOut();
            navigate('Auth');
        } catch (e) {
            console.log(e);
        }
    }
    SignOut () {
        this.props.navigation.navigate('Opening');
        // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        //   .then(function() {
        //     // Existing and future Auth states are now persisted in the current
        //     // session only. Closing the window would clear any existing state even
        //     // if a user forgets to sign out.
        //     // ...
        //     // New sign-in will be persisted with session persistence.
        //     return firebase.auth().signInWithEmailAndPassword(email, password);
        //   })
        //   .catch(function(error) {
        //     // Handle Errors here.
        //     console.log(error.toString(error));
        //   });
      }
    render() {
        const { currentUser } = firebase.auth();
        return (
            <View style={styles.container}>
                <StatusBar hidden />
                <Header style={{backgroundColor:'orange'}} centerComponent={{ text: 'Halaman Utama', style: { color: '#ffffff' } }}>
                    <Left style={{justifyContent:"flex-start",flex:1,marginTop:5}}>
                        <Icon name="menu" onPress={()=>this.props.navigation.openDrawer()} />
                    </Left>
                    <Right>
                        <Button style={{backgroundColor:'white'}} title="Click here to Logout" onPress={ () => this.SignOut() } />
                    </Right>
                </Header>
                <View style={{justifyContent:"center", paddingTop:10, paddingBottom:10}} >
                    <ScrollView>
                    <Text style={{alignContent:"center"}}>Selamat Datang {currentUser && currentUser.email}!</Text>
                    {
                        this.state.pinjams.length > 0
                        ? <PinjamList pinjams={this.state.pinjams} />
                        : <Text>Tidak Ada Peminjaman</Text>
                    }
                    </ScrollView>
                    {/* <View style={styles.MainContainer}>

                        <ListView

                        dataSource={this.state.dataSource}

                        renderSeparator= {this.ListViewItemSeparator}

                        enableEmptySections = {true}

                        renderRow={(rowData) => <Text style={styles.rowViewContainer} 
                        onPress={this.GetItem.bind(this, rowData.ketua_kegiatan_kegiatan)} >{rowData.lab}</Text>}

                        />

                        </View> */}
                </View>
            </View>
        );
        
    }
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
  });