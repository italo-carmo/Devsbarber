import React, {useEffect, useContext} from 'react';
import {useNavigation} from '@react-navigation/native'
import {Container, LoadingIcon} from './styles';
import BarberLogo from '../../assets/barber.svg';
import AsyncStorage from '@react-native-community/async-storage';
import Api from '../../Api';
import {UserContext} from '../../contexts/UserContext'


const Favorites = () =>{
    const navigation = useNavigation()
    const  {dispatch} = useContext(UserContext)
    return (
        <Container>
            <BarberLogo width="100%" height="160px"/>
            <LoadingIcon size="large" color="#fff"/>
        </Container>
    )
} 

export default Favorites