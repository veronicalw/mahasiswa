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
import { withNavigation } from 'react-navigation';

class OpeningScreen extends React.Component{
//cobas
    render() {
        return (
          <View style={styles.container}>
            <Form>
            <View >
                <GradientButton blueViolet style={[styles.buttonContainer, styles.loginButton]} onPressAction={() => this.props.navigation.navigate('Login')}>
                    <Text style={{fontSize:18,alignItems:"center",justifyContent:"center"}}>Mahasiswa </Text>
                </GradientButton>
                <GradientButton blueViolet style={[styles.buttonContainer, styles.loginButton]} onPressAction={() => this.props.navigation.navigate('LoginLab')}>
                    <Text style={{fontSize:18,alignItems:"center",justifyContent:"center"}}>Laboran</Text>
                </GradientButton>
                <GradientButton blueViolet style={[styles.buttonContainer, styles.loginButton]} onPressAction={() => this.props.navigation.navigate('LoginKalab')}>
                    <Text style={{fontSize:18,alignItems:"center",justifyContent:"center"}}>Kepala Laboran</Text>
                </GradientButton>
                <GradientButton blueViolet style={[styles.buttonContainer, styles.loginButton]} onPressAction={() => this.props.navigation.navigate('LoginKajur')}>
                    <Text style={{fontSize:18,alignItems:"center",justifyContent:"center"}}>Kepala Jurusan</Text>
                </GradientButton>
                <GradientButton blueViolet style={[styles.buttonContainer, styles.loginButton]} onPressAction={() => this.props.navigation.navigate('LoginPudir')}>
                    <Text style={{fontSize:18,alignItems:"center",justifyContent:"center"}}>Pembantu Direktur I</Text>
                </GradientButton>
            </View>
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

    export default OpeningScreen;