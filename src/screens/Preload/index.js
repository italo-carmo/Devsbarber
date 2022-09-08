import React, {useEffect, useContext} from 'react';
import {useNavigation} from '@react-navigation/native'
import {Container, LoadingIcon} from './styles';
import BarberLogo from '../../assets/barber.svg';
import AsyncStorage from '@react-native-community/async-storage';
import Api from '../../Api';
import {UserContext} from '../../contexts/UserContext'


const Preload = () =>{
    const navigation = useNavigation()
    const  {dispatch} = useContext(UserContext)

    useEffect(()=> {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token')
            if (token) {
                console.log(token)
                let res = await Api.checkToken(token)
                if(res.token) {
                    await AsyncStorage.setItem('token', res.token)
                    dispatch({
                        type: 'SET_AVATAR',
                        payload: {
                            avatar: res.data.avatar
                        }
                    });
                    navigation.reset({
                        routes: [{name: 'MainTab'}]
                    })
                } else {
                    navigation.navigate('SignIn')
                }
            } else {
                navigation.navigate('SignIn')
            }
        }

        checkToken()
    },[])

    return (
        <Container>
            <BarberLogo width="100%" height="160px"/>
            <LoadingIcon size="large" color="#fff"/>
        </Container>
    )
} 

export default Preload