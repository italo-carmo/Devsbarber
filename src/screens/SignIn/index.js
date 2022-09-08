import React, {useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native'
import {
    Container, 
    InputArea, 
    CustomButton, 
    CustomButtonText, 
    SignMessageButton, 
    SignMessageButtonText, 
    SignMessageButtonTextBold} from './styles'
import {Text} from 'react-native'
import SignInput from '../../components/SignInput';
import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg'
import LockIcon from '../../assets/lock.svg'
import Api from '../../Api';
import AsyncStorage from '@react-native-community/async-storage';
import {UserContext} from '../../contexts/UserContext'

const SignIn = () =>{
    const [emailField, setEmailField] = useState('')
    const [passwordField, setPasswordField] = useState('')
    const navigation = useNavigation()
    const  {dispatch} = useContext(UserContext)

    const handleSignButton = () => {
        navigation.reset({
            routes: [{name: 'SignUp'}]
        })
    }

    const handleLogin = async () => {
        if(emailField != '' && passwordField != '') {
            let json = await Api.signIn(emailField, passwordField)
            if (json.token) {
                await AsyncStorage.setItem('token', json.token)
                dispatch({
                    type: 'SET_AVATAR',
                    payload: {
                        avatar: json.data.avatar
                    }
                });
                navigation.reset({
                    routes: [{name: 'MainTab'}]
                })
            } else {
                alert('E-mail e/ou senha inválidos!')
            }
        } else {
            alert('Preencha todos os campos!')
        }
    }

    return (
        <Container>
            <BarberLogo width="100%" height="160px"/>

            <InputArea>
                <SignInput 
                    IconSvg={EmailIcon} 
                    placeholder="Digite seu e-mail" 
                    value={emailField}
                    onChangeText={setEmailField}
                    />
                <SignInput 
                    IconSvg={LockIcon} 
                    placeholder="Digite sua senha" 
                    value={passwordField}
                    onChangeText={setPasswordField}
                    password={true}
                    />

                <CustomButton onPress={handleLogin}>
                    <CustomButtonText>LOGIN</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleSignButton}>
                <SignMessageButtonText>Ainda não possui uma conta? </SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    )
} 

export default SignIn