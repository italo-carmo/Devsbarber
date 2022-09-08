import {createStackNavigator} from '@react-navigation/stack';
import Preload from '../screens/Preload';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import MainTab from './MainTab';
import Barber from '../screens/Barber';

const MainStack = createStackNavigator()

//tiramos o header deste stack principal para o usuário não conseguir trocar de stack sozinho

export default () => (
    <MainStack.Navigator 
        initialRouteName='Preload'
        screenOptions={{headerShown:false}}
    
    >
        <MainStack.Screen name="Preload" component={Preload}/>
        <MainStack.Screen name="SignIn" component={SignIn}/>
        <MainStack.Screen name="SignUp" component={SignUp}/>
        <MainStack.Screen name="MainTab" component={MainTab}/>
        <MainStack.Screen name="Barber" component={Barber}/>
    </MainStack.Navigator>
)
