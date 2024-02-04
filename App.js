import React, { useContext, useState, createContext, useReducer, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, Platform, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Divider, Button } from 'react-native-elements';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import email from 'react-native-email';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignUpPage from './app/screens/SignUpPage';
import FirstStartScreen from './app/screens/FirstStartScreen';
import HomePage from './app/screens/HomePage';
import AccountPage from './app/screens/AccountPage';
import ChefProfileScreen from './app/screens/ChefProfileScreen';
import ItemPage from './app/screens/ItemPage';
import SettingsPage from './app/screens/SettingsPage';
import CartScreen from './app/screens/CartScreen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchPage from './app/screens/SearchPage';
import CheckoutPage from './app/screens/CheckoutPage';
import address from './app/screens/checkoutedit/address';
import phonenumber from './app/screens/checkoutedit/phonenumber';
import payment from './app/screens/checkoutedit/payment';
import ChangeAddress from './app/screens/checkoutedit/changeaddress';
import ChangePhone from './app/screens/checkoutedit/changephone';
import ListAnItem from './app/screens/chefPages/ListAnItem';
import CameraPage from './app/screens/chefPages/CameraPage';
import ChefHome from "./app/screens/chefPages/ChefHome";
import ChefItemPage from "./app/screens/chefPages/chefItemPage";
import EditAnItem from './app/screens/chefPages/EditAnItem';
import ChefProfilePage from './app/screens/chefPages/ChefProfilePage';
import chefFullMenu from './app/screens/chefPages/chefFullMenu';
import userFullMenu from './app/screens/userFullMenu';
import ChefOrders from './app/screens/chefPages/ChefOrders';
import UserOrders from './app/screens/UserOrders';
import ChefManageOrder from './app/screens/chefPages/ChefManageOrder';
import UserManageOrder from './app/screens/UserManageOrder';
import AsyncStorage from '@react-native-async-storage/async-storage';

//declaring navigators
const firstStartStack = createStackNavigator();
const userDrawer = createDrawerNavigator();
const userbottomTab = createBottomTabNavigator();
const chefbottomTab = createBottomTabNavigator();
const chefDrawer = createDrawerNavigator();

const AuthContext = createContext()

// SplashScreen
function SplashScreen() {
    return(
        <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Loading Make-e-Me...</Text>
            <ActivityIndicator size='large' color='#0000ff' />
        </SafeAreaView>
    )
}

// LogIn
const LogInPage = ({ navigation, route }) => {

    //useStates
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { signIn } = useContext(AuthContext)

    return (
        <SafeAreaView style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
        }}>
            <Text style={{fontSize: 32, position: 'absolute', top: 10}}>Log-In</Text>
            <View>
                <TextInput style={{
                    paddingLeft: 20,
                    borderRadius: 10,
                    height: 50,
                    fontSize: 25,
                    backgroundColor: 'white',
                    borderWidth: 1,
                    marginBottom: 20,
                    color: 'green',
                    width: 350,
                }}
                placeholder='Email'
                returnKeyType='next'
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={(text) => setEmail(text)}
                value={email}>
                </TextInput>
                <TextInput style={{
                    paddingLeft: 20,
                    borderRadius: 10,
                    height: 50,
                    fontSize: 25,
                    backgroundColor: 'white',
                    borderWidth: 1,
                    marginBottom: 20,
                    color: 'green',
                    width: 350,
                }}
                placeholder='Password'
                returnKeyType='go'
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}>
                </TextInput>
                <TouchableOpacity style={{
                    height: 50,
                    borderRadius: 50,
                    backgroundColor: 'blue', 
                    paddingVertical: 10,
                    justifyContent: 'center'
                }} onPress={() => signIn({email, password})}>
                    <Text style={{
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 20
                    }}>Log-In</Text>
                </TouchableOpacity>
                <Text style={{color: '#1abc9c', textAlign: 'center', top: 5}} onPress={() => navigation.navigate('Sign Up Page')}>Don't Have An Account? Sign-Up Here!</Text>
            </View>
        </SafeAreaView>
    );
};

//begining Log-In Stack
export default function FirstStack({navigation}) {

    const [ state, dispatch ] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        accountType: action.accountType,
                        isLoading: false,
                    };
                case "SIGN_IN" :
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                        accountType: action.accountType
                    };
                case "SIGN_OUT": 
                return {
                    ...prevState,
                    isSignout: true,
                    userToken: null
                }
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
            accountType: ''
        }
    );

    useEffect(() => {
        const bootstrapAsync = async () => {
            let userToken;
            let accountType;

            try {
                userToken = await AsyncStorage.getItem('userToken')
                accountType = await AsyncStorage.getItem('accountType')
            } catch (e) {
                alert(e)
            }

            
            dispatch({type: "RESTORE_TOKEN", token: userToken, accountType: accountType})
        }

        bootstrapAsync()
    }, []);

    const authContext = useMemo(
        () => ({
            signIn: async data => {
            fetch('http://192.168.1.74:5000/user/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        })
        .then((resp) => {
            if (resp.status === 401) {
                alert("failed")
            } else if (resp.status === 200) {
                alert("it worked")
                return resp.json()
            }
        })
        .then(async (json) => {
            try {
                console.log(json.token)
                console.log(json.accountType)
                await AsyncStorage.setItem('userToken', json.token)
                await AsyncStorage.setItem("accountType", json.accountType)
                dispatch({type: 'SIGN_IN', token: json.token, accountType: json.accountType })
            } catch (e) {
                console.log(e)
            }
        })
        .catch(err => alert(err))
                
            },
            signOut: async () => {
                await AsyncStorage.removeItem('userToken')
                dispatch({type: "SIGN_OUT"})
            },
            signUp: async data => {

                dispatch({type: "SIGN_IN", token: 'dummytoken'})
            }
        }),
        []
    )

    return(
        <NavigationContainer>
            <AuthContext.Provider value={authContext}>
            <firstStartStack.Navigator>
                {state.isLoading === true ? (
                    <>
                        <firstStartStack.Screen name='Splash Screen' component={SplashScreen} options={{headerShown: false}} />
                    </>
                ) : (<></>)}
                {state.userToken == null ? (
                    <>
                        <firstStartStack.Screen name='First Start Page' component={FirstStartScreen} options={{headerShown: false}} />
                        <firstStartStack.Screen name='Log In Page' component={LogInPage} options={{headerShown: false}} />
                        <firstStartStack.Screen name='Sign Up Page' component={SignUpPage} options={{headerShown: false}} />
                    </>
                 ) : (<></>)}
                 {state.userToken !== null && state.accountType === 'user' ? (
                    <>
                        <firstStartStack.Screen name='Home' component={userHomeDrawer} options={{headerShown: false}} />
                        <firstStartStack.Screen name='Chef Profile Screen' component={ChefProfileScreen} options={{headerShown: false}} />
                        <firstStartStack.Screen name='Item Page' component={ItemPage} options={{headerShown: false}} />
                        <firstStartStack.Screen name='Cart Screen' component={CartScreen} options={{headerShown: false, }} />
                        <firstStartStack.Screen name='Checkout Page' component={CheckoutPage} options={{headerShown: false, }} />
                        <firstStartStack.Screen name='Address' component={address} options={{headerShown: false, }} />
                        <firstStartStack.Screen name='Phone Number' component={phonenumber} options={{headerShown: false, }} />
                        <firstStartStack.Screen name='Payment' component={payment} options={{headerShown: false, }} />
                        <firstStartStack.Screen name='Change Address' component={ChangeAddress} options={{headerShown: false, }} />
                        <firstStartStack.Screen name='Change Phone Number' component={ChangePhone} options={{headerShown: false, }} />
                        <firstStartStack.Screen name='User Full Menu' component={userFullMenu} options={{headerShown: false, }} />
                        <firstStartStack.Screen name='User Manage Order' component={UserManageOrder} options={{headerShown: false, }} />
                    </>
                ) : (<></>)}
                {state.userToken !== null && state.accountType === 'chef' ? (
                    <>
                        <firstStartStack.Screen name='Chef Home' component={chefHomeDrawer} options={{headerShown: false, }} />
                        <firstStartStack.Screen name='List An Item' component={ListAnItem} options={{headerShown: false, }} />
                        <firstStartStack.Screen name='Camera Page' component={CameraPage} options={{headerShown: false, }} />
                        <firstStartStack.Screen name='Chef Item Page' component={ChefItemPage} options={{headerShown: false, }} />
                        <firstStartStack.Screen name='Edit An Item' component={EditAnItem} options={{headerShown: false, }} />
                        <firstStartStack.Screen name='Chef Full Menu' component={chefFullMenu} options={{headerShown: false, }} />
                        <firstStartStack.Screen name='Chef Manage Order' component={ChefManageOrder} options={{headerShown: false, }} />
                    </>
                ) : (<></>)}
            </firstStartStack.Navigator>
            </AuthContext.Provider>
        </NavigationContainer>
    );
};


//home page drawer
function userHomeDrawer() {
    return(
            <userDrawer.Navigator edgeWidth={50} drawerType={'back'}>
                <userDrawer.Screen name='Home' component={userHomeTab} />
                <userDrawer.Screen name='Account' component={AccountPage} />
                <userDrawer.Screen name='Settings' component={SettingsPage} />
                <userDrawer.Screen name='Report A Bug' component={reportABug} />
                <userDrawer.Screen name='Sign-Out' component={signOutPage} />
            </userDrawer.Navigator>
    );
};

//home page tab navigator
function userHomeTab() {
    return(
        <userbottomTab.Navigator>
            <userbottomTab.Screen options={{tabBarIcon: () => {return <Ionicons name='logo-xbox' color="black" size={30}/>}}} name='Delivery' component={HomePage} />
            <userbottomTab.Screen options={{tabBarIcon: () => {return <Ionicons name='logo-tux' color="black" size={30}/>}}} name='Search' component={SearchPage} />
            <userbottomTab.Screen options={{tabBarIcon: () => {return <Ionicons name='logo-tux' color="black" size={30}/>}}} name='Cart' component={CartScreen} />
            <userbottomTab.Screen options={{tabBarIcon: () => {return <Ionicons name='logo-tux' color="black" size={30}/>}}} name='Orders' component={UserOrders} />
        </userbottomTab.Navigator>
    );
}

function chefHomeDrawer() {
    return(
        <chefDrawer.Navigator edgeWidth={50} drawerType={'back'} >
            <chefDrawer.Screen name='Home' component={chefHomeTab} />
            <chefDrawer.Screen name='Account' component={AccountPage} />
            <chefDrawer.Screen name='Settings' component={SettingsPage} />
            <chefDrawer.Screen name='Report A Bug' component={reportABug} />
            <chefDrawer.Screen name="Sign-Out" component={signOutPage} />
        </chefDrawer.Navigator>
    );
}

function chefHomeTab() {
    return(
        <chefbottomTab.Navigator>
            <chefbottomTab.Screen options={{tabBarIcon: () => {return <Ionicons name='logo-xbox' color="black" size={30}/>}}} name='Home' component={ChefHome} />
            <chefbottomTab.Screen options={{tabBarIcon: () => {return <Ionicons name='logo-xbox' color="black" size={30}/>}}} name='Profile' component={ChefProfilePage} />
            <chefbottomTab.Screen options={{tabBarIcon: () => {return <Ionicons name='logo-xbox' color="black" size={30}/>}}} name='Orders' component={ChefOrders} />
        </chefbottomTab.Navigator>
    );
}

function reportABug({navigation, route}) {


    const [ discription, setDiscription ] = useState('')

    return(
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize: 32, position: 'absolute', top: 10}}>Report a Bug</Text>
            <Divider style={{ position: 'absolute', height: 4, width: responsiveWidth(40), backgroundColor: '#DFE2E6', top: 55}} />
            <View style={styles.discriptionView}>
                <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', paddingBottom: 10}}>Discribe The Bug Here</Text>
                <TextInput numberOfLines={3} style={styles.discription} multiline={true} placeholder="Discription" value={discription} onChangeText={text => setDiscription(text)} />
            </View>
            <Button type={'solid'} buttonStyle={{backgroundColor: 'blue', width: responsiveWidth(90), borderRadius: 10}} onPress={() => sendBug()} title={'Submit Bug'} />
        </SafeAreaView>
    );

    function sendBug() {
        const to = 'ajamiehrateb@gmail.com'
        email(to, {body: discription.toString(), subject: 'New Make-e-Me Bug Report!'}).catch(console.error)
    }

}

function signOutPage({navigation, route}) {
    const { signOut } = useContext(AuthContext)

    return(
        <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
            <Button title="Sign-Out" onPress={() => {signOut()}} />
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'white'
    },
    smallInput: {
        paddingLeft: 20,
        borderRadius: 10,
        height: 50,
        fontSize: 25,
        backgroundColor: 'white',
        borderWidth: 1,
        marginBottom: 20,
        color: 'green',
        width: 350,
    },
    discriptionView: {
        paddingTop: 10,
    },
    discription: {
        paddingLeft: 20,
        borderRadius: 10,
        height: 100,
        fontSize: 15,
        backgroundColor: 'white',
        borderWidth: 1,
        marginBottom: 20,
        color: 'green',
        width: 350,
    },
})