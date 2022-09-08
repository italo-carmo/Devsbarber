import React, {useState} from 'react';
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
import PersonIcon from '../../assets/person.svg'
import Api from '../../Api';
import AsyncStorage from '@react-native-community/async-storage';
import {UserContext} from '../../contexts/UserContext'


const SignIn = () =>{
    const [emailField, setEmailField] = useState('')
    const [passwordField, setPasswordField] = useState('')
    const [nameField, setNameField] = useState('')
    const navigation = useNavigation()
    const  {dispatch} = useContext(UserContext)


    const handleSignButton = () => {
        navigation.reset({
            routes: [{name: 'SignIn'}]
        })
    }

    const handleSubmit = async () => {
        if(emailField != '' && nameField != '' && passwordField != '') {
            let json = await Api.signUp(nameField, emailField, passwordField)
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
                alert('Erro: '+res.error)
            }
        } else{
            alert('Preencha todos os campos!')
        }
    }

    return (
        <Container>
            <BarberLogo width="100%" height="160px"/>

            <InputArea>
            <SignInput 
                    IconSvg={PersonIcon} 
                    placeholder="Digite sua nome" 
                    value={nameField}
                    onChangeText={setNameField}
                    />
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

                <CustomButton onPress={handleSubmit}>
                    <CustomButtonText>CADASTRAR</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleSignButton}>
                <SignMessageButtonText>Já possui uma conta? </SignMessageButtonText>
                <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    )
} 

export default SignIn