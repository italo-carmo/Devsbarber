import React, {useEffect, useContext} from 'react';
import {useNavigation} from '@react-navigation/native'
import {Button} from 'react-native'
import {Container, LoadingIcon} from './styles';
import BarberLogo from '../../assets/barber.svg';
import AsyncStorage from '@react-native-community/async-storage';
import Api from '../../Api';
import {UserContext} from '../../contexts/UserContext'


const Profile = () =>{
    const navigation = useNavigation()
    const  {dispatch} = useContext(UserContext)

    const handleLogout = async () => {
        await Api.logout()
        navigation.reset({routes:[{name: 'SignIn'}]})
    }

    return (
        <Container>
            <Button title="Fazer Logout" onPress={handleLogout}/>
        </Container>
    )
} 

export default Profile