import { StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Image,
    Alert } from 'react-native';
    import {Form} from 'native-base';
    import React, { Component } from 'react';
    import GradientButton from 'react-native-gradient-buttons';
import Button from 'react-native-button';
import * as firebase from 'firebase';

  export default class SigninScreenKajur extends Component {
    constructor(props) {
      super(props);
      this.state = {email:'', password:''};
    }

    
    SignUp = (email,password) => {
      try {
        firebase.auth().createUserWithEmailAndPassword(email,password);
      } catch (error){
        console.log(error.toString(error));
      }
    };

    SignIn = (email,password) => {
      try{
        firebase.auth().signInWithEmailAndPassword(email,password);
        firebase.auth().onAuthStateChanged(user => {
          Alert.alert("Alert", "Successfully Login "+user.email);
          if (user){
            this.props.navigation.navigate('HomeKajur');
          }else{
            Alert.alert("Alert", "Sign In First! ");
          }
        })
      } catch (error){
        console.log(error.toString(error));
      }
    }
    onClickListener = (viewId) => {
      Alert.alert("Alert", "Button pressed "+viewId);
    }

    render() {
      return (
        <View style={styles.container}>
          <Form>
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/64/000000/badge.png'}}/>
            <TextInput style={styles.inputs}
                placeholder="Email"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(email) => this.setState({email})}
                />
          </View>
          
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/64/000000/password.png'}}/>
            <TextInput style={styles.inputs}
                placeholder="Password"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(password) => this.setState({password})}/>
          </View>

          <GradientButton blueViolet style={[styles.buttonContainer, styles.loginButton]} onPressAction={() => this.SignIn(this.state.email, this.state.password)}>
              <Text style={{fontSize:18,alignItems:"center",justifyContent:"center"}}>Login</Text>
          </GradientButton>

          {/* <Button style={styles.buttonContainer} onPress={() => this.SignIn(this.state.email, this.state.password)}>
              <Text>Sign In</Text>
          </Button> */}
          <Button style={styles.buttonContainer} onPress={() => this.SignUp(this.state.email, this.state.password)}>
              <Text>Register</Text>
          </Button>
        </Form>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ECAF00',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputIcon:{
      width:30,
      height:30,
      marginLeft:15,
      justifyContent: 'center'
    },
    buttonContainer: {
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
    },
    loginButton: {
      backgroundColor: "#00b5ec",
    },
    loginText: {
      fontSize:16,
      color: 'white',
    }
  });