import React from 'react';
import { StyleSheet, Text, View, SafeAreaView,ScrollView, Dimensions, Image, BackHandler } from 'react-native';
import { createDrawerNavigator, DrawerItems, createAppContainer } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import FormScreen from './screens/FormScreen';
import SigninScreen from './screens/SigninScreen';
import DetailScreen from './screens/DetailScreen';
import * as firebase from "firebase";
import OpeningScreen from './screens/OpeningScreen';
import HomeScreenLaboran from '././screens/laboran/HomeScreenLaboran';
import SigninScreenLaboran from './screens/laboran/SigninScreenLaboran';
import SigninScreenKalab from './screens/kalab/SigninScreenKalab';
import SigninScreenKajur from './screens/kajur/SigninScreenKajur';
import SigninScreenPudir from './screens/pudir/SigninScreenPudir';
import HomeScreenPudir from './screens/pudir/HomeScreenPudir';
import HomeScreenKalab from './screens/kalab/HomeScreenKalab';
import FormScreenKalab from './screens/kalab/FormScreenKalab';
import HomeScreenKajur from './screens/kajur/HomeScreenKajur';
import FormScreenKajur from './screens/kajur/FormScreenKajur';
import FormScreenPudir from './screens/pudir/FormScreenPudir';
import FormScreenLaboran from './screens/laboran/FormScreenLaboran';
import {Notifications} from 'expo';
const { width } = Dimensions.get('window');
var firebaseConfig = {
  apiKey: "AIzaSyAYYStUWcgSYQMdR2J4rTmK9SJ0mUWRBTk",
  authDomain: "pa-leony.firebaseapp.com",
  databaseURL: "https://pa-leony.firebaseio.com",
  projectId: "pa-leony",
  storageBucket: "pa-leony.appspot.com",
  messagingSenderId: "695705581227",
  appId: "1:695705581227:web:e0e56a6c754c26fdec29ee"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default class App extends React.Component{
  ComponentWillMount(){
    BackHandler.addEventListener('hardwareBackPress',()=>{   
      if (!this.onMainScreen()) {
        this.goBack();
        return true;
      }
      return false;
    });
  }    
  render() {
    return (
      <Apps/>
    );
    // if(){
    //   return (
    //     <Apps/>
    //   );
    // }else if(){
    //   return (
    //     <Mhss/>
    //   );
    // }else if(){
    //   return (
    //     <Labs/>
    //   );
    // }else if(){
    //   return (
    //     <Kalabs/>
    //   );
    // }else if(){
    //   return (
    //     <Kajurs/>
    //   );
    // }else if(){
    //   return (
    //     <Pudirs/>
    //   );
    // }
  }
}

const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{ flex:1 }}>
    <View style={{height:150, backgroundColor: 'white', alignItems :'center', justifyContent:'center'}}>
      <Image source={require('./assets/up2.png')} style={{height:50, width:50,borderRadius:35 }}/>
    </View>
    <ScrollView>
      <DrawerItems {...props}/>
    </ScrollView>
  </SafeAreaView>
) 

const AppDrawerNavigator = createDrawerNavigator({
  Opening:OpeningScreen, 
  Login:SigninScreen,
  LoginLab: SigninScreenLaboran,
  LoginKalab: SigninScreenKalab,
  LoginKajur: SigninScreenKajur,
  LoginPudir: SigninScreenPudir,
  Home:HomeScreen,
  Form:FormScreen,
  HomeLab: HomeScreenLaboran,
  FormLab: FormScreenLaboran,
  HomeKalab: HomeScreenKalab,
  FormKalab: FormScreenKalab,
  HomeKajur:HomeScreenKajur,
  FormKajur:FormScreenKajur,
  HomePudir:HomeScreenPudir,
  FormPudir:FormScreenPudir,
  Detail:DetailScreen,
}, {
  contentComponent: CustomDrawerComponent,
  drawerWidth: width,
  contentOptions:{
    activeTintColor:'orange'
  }
})

// const AppDrawerNavigator = createDrawerNavigator({
//   Opening:OpeningScreen,
//   Login:SigninScreen,
//   LoginLab: SigninScreenLaboran,
//   LoginKalab: SigninScreenKalab,
//   LoginKajur: SigninScreenKajur,
//   LoginPudir: SigninScreenPudir,
// })

// const Mhs = createDrawerNavigator({
//   Home:HomeScreen,
//   Form:FormScreen,
// }, {
//   contentComponent: CustomDrawerComponent,
//   drawerWidth: width,
//   contentOptions:{
//     activeTintColor:'orange'
//   }
// })

// const Lab = createDrawerNavigator({
//   HomeLab: HomeScreenLaboran,
// })

// const Kalab = createDrawerNavigator({
//   HomeKalab: HomeScreenKalab,
// })

// const kajur = createDrawerNavigator({
//   HomeKajur:HomeScreenKajur,
// })

// const Pudir = createDrawerNavigator({
//   HomePudir:HomeScreenPudir,
// })

const Apps = createAppContainer(AppDrawerNavigator)
// const Mhss = createAppContainer(Mhs)
// const Labs = createAppContainer(Lab)
// const Kalabs = createAppContainer(Kalab)
// const Kajurs = createAppContainer(kajur)
// const Pudirs = createAppContainer(Pudir)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});