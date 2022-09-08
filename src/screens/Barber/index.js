import React, {useEffect, useState, useLayoutEffect} from 'react';
import {Text, Button} from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native'
import {
    Container, 
    Scroller, 
    FakeSwipper, 
    PageBody, 
    UserInfoArea, 
    ServiceArea, 
    TestimonialArea,
    SwipeDot,
    SwipeDotActive,
    SwipeItem,
    SwipeImage,
    UserAvatar,
    UserInfo,
    UserInfoName,
    UserFavButton,
    BackButton,
    LoadingIcon,
    ServicesTitle,
    ServiceItem,
    ServiceInfo,
    ServiceName,
    ServicePrice,
    ServiceChooseButton,
    ServiceChooseBtnText,
    TestimonialItem,
    TestimonialInfo,
    TestimonialName,
    TestimonialBody
} from './styles';
import Swiper from 'react-native-swiper';
import Api from '../../Api';
import Stars from '../../components/Stars';
import FavoriteIcon from '../../assets/favorite.svg'
import FavoriteFull from '../../assets/favorite_full.svg'
import BackIcon from '../../assets/back.svg'
import NavPrevIcon from '../../assets/nav_prev.svg'
import NavNextIcon from '../../assets/nav_next.svg'
import Modal from '../../components/Modal'

const Barber = () =>{
    const navigation = useNavigation()
    const route = useRoute();
    const [userInfo, setUserInfo] = useState({
        id: route.params.id,
        avatar: route.params.avatar,
        name:route.params.name,
        stars: route.params.stars
    })
    const [loading, setLoading] = useState(false)
    const [favorited, setFavorited] = useState(false)
    const [selectedService, setSelectedService] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const handleBackButton = () => {
        navigation.goBack()
    }

    const handleFavClick = async () => {
        await Api.setFavorite(userInfo.id)
    }

    const handleServiceChoose = (key) => {
        setSelectedService(key)
        setShowModal(true)
    }

    useEffect(()=>{
        const getBarberinfo = async () => {
            setLoading(true)
            let json = await Api.getBarber(userInfo.id)
            if(json.error == '') {
                setUserInfo(json.data)
                setFavorited(json.favorited)
            } else {
                alert('Erro: '+json.error)
            }
            setLoading(false)
        }

        getBarberinfo()
    },[])

    return (
        <Container>
            <Scroller>

                {userInfo.photos && userInfo.photos.length > 0 ?
                <Swiper
                    style={{height:240}}
                    dot={<SwipeDot/>}
                    activeDot={<SwipeDotActive/>}
                    paginationStyle={{top:15,right:15, bottom:null, left: null}} //posicao das bolinhas
                    autoplay={true} //repetir swipe
                >
                    {userInfo.photos.map((item, key)=>(
                        <SwipeItem key={key}>
                            <SwipeImage source={{uri: item.url}} resizeMode="cover"/>
                        </SwipeItem>
                    ))}

                </Swiper> :

                <FakeSwipper>

                </FakeSwipper>
            }

            <PageBody>
                <UserInfoArea>
                    <UserAvatar source={{uri: userInfo.avatar}}/>
                    <UserInfo>
                        <UserInfoName>{userInfo.name}</UserInfoName>
                        <Stars stars={userInfo.stars} showNumber={true}/>
                    </UserInfo>
                    <UserFavButton onPress={handleFavClick}>
                        {favorited ? 
                        <FavoriteFull width="24" height="24" fill="#ff0000"/>
                        :
                        <FavoriteIcon width="24" height="24" fill="#ff0000"/>

                        }
                    </UserFavButton>
                </UserInfoArea>
                    {loading && 
                        <LoadingIcon size="large" color="000"/>
                    }
                    {userInfo.services &&
                        <ServiceArea>
                            <ServicesTitle>Lista de serviços</ServicesTitle>

                            {userInfo.services.map((item, index) => (
                                <ServiceItem key={index}>
                                    <ServiceInfo>
                                        <ServiceName>{item.name}</ServiceName>
                                        <ServicePrice>R$ {item.price.toFixed(2)}</ServicePrice>
                                    </ServiceInfo>

                                    <ServiceChooseButton onPress={()=>handleServiceChoose(index)}>
                                        <ServiceChooseBtnText>Agendar</ServiceChooseBtnText>
                                    </ServiceChooseButton>
                                </ServiceItem>
                            ))}

                        </ServiceArea>
                    }

                

                    {userInfo.testimonials && userInfo.testimonials.length > 0 &&
                        <TestimonialArea>
                            <Swiper
                                style={{height: 110}}
                                showsPagination={false}
                                showsButtons={true}
                                prevButton={<NavPrevIcon width="35" height="35" fill="#000"/>}
                                nextButton={<NavNextIcon width="35" height="35" fill="#000"/>}
                            >
                                {userInfo.testimonials.map((item, index)  => (
                                    <TestimonialItem key={index}>
                                        <TestimonialInfo>
                                            <TestimonialName>{item.name}</TestimonialName>
                                            <Stars stars={item.rate} showNumber={false}/>
                                        </TestimonialInfo>

                                        <TestimonialBody>{item.body}</TestimonialBody>
                                    </TestimonialItem>
                                ))}
                            </Swiper>
                        </TestimonialArea>
                    }

                
            </PageBody>

            </Scroller>

            <BackButton onPress={handleBackButton}>
                <BackIcon width="44" height="44" fill="#fff"/>
            </BackButton>

            <Modal 
                show={showModal}
                setShow={setShowModal}
                user={userInfo}
                service={selectedService}
            />
        </Container>
    )
} 

export default Barber