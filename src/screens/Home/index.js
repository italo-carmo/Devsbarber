import React, {useEffect, useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native'
import {Platform, RefreshControl} from 'react-native'
import {
    Container, 
    Scroller, 
    HeaderArea, 
    HeaderTitle, 
    SearchButton,
    LocationArea, 
    LocationInput,
    LocationFinder,
    LoadingIcon,
    ListArea
} from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import BarberItem from '../../components/BarberItem';
import Api from '../../Api';
import {UserContext} from '../../contexts/UserContext'
import SearchIcon from '../../assets/search.svg'
import MyLocationIcon from '../../assets/my_location.svg'
import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';


const Home = () =>{
    const navigation = useNavigation()
    const  {dispatch} = useContext(UserContext)
    const [ locationText, setLocationText] = useState('')
    const [coords, setCoords] = useState(null)
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    useEffect(()=>{
        getBarbers()
    },[])

    const handleLocationFinder = async () => {
        setCoords(null)
        let result = await request(
            Platform.OS == 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE 
            :
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
            )
            
            if (result == 'granted') {
                setLoading(true)
                setLocationText('')
                setList([])
                Geolocation.getCurrentPosition((info)=>{
                    setCoords(info.coords)
                    getBarbers()
                })
            }
    }   

    const getBarbers = async () => {
        setLoading(true)
        setList([])
        let lat = null
        let lng = null
        if(coords) {
            lat = coords.latitude
            lng = coords.longitude
        }

        let res = await Api.getBarbers(lat, lng, locationText)
        if (res.error == '') {
            if (res.loc) {
                setLocationText(res.loc)
            }
            setList(res.data)
            
        } else {
            alert('Erro: '+rees.error)
        }

        setLoading(false)
    }

    const onRefresh = () => {
        setRefreshing(false)
        getBarbers()
    }

    const handleLocationSearch = () => {
        setCoords(null)
        getBarbers()
    }

    return (
        <Container>
            <Scroller refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>

                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Encontre o seu barbeiro favorito</HeaderTitle>
                    <SearchButton onPress={()=>navigation.navigate('Search')}>
                        <SearchIcon width="26"  height="26" fill="#fff"/>
                    </SearchButton>
                </HeaderArea>

                <LocationArea>
                    <LocationInput 
                        placeholder="Onde você está?" 
                        placeholderTextColor="#fff"
                        value={locationText}
                        onChangeText={setLocationText}
                        onEndEditing={handleLocationSearch}
                        />
                    <LocationFinder onPress={handleLocationFinder}>
                        <MyLocationIcon width="24"  height="24" fill="#fff"/>
                    </LocationFinder>
                </LocationArea>

                {loading &&
                <LoadingIcon size="large" color="#fff"/>
                }
                <ListArea>
                    {list.map((item, index)=>(
                        <BarberItem key={index} data={item}/>
                    ))}
                </ListArea>
            </Scroller>
        </Container>
    )
} 

export default Home