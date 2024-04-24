import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebaseApp from '../constants/firebase';

const Login: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Check if the user is already logged in
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
            // Check if the login status is saved in AsyncStorage
            const loginStatus = await AsyncStorage.getItem('loginStatus');
            if (loginStatus === 'true') {
                // If the user is logged in, navigate to the home screen
                navigation.navigate('Home');
            }
        } catch (error) {
            console.error('Error checking login status:', error);
        }
    };

    const handleLogin = async () => {
        try {
            await firebaseApp.auth().signInWithEmailAndPassword(email, password);
            // Save the login status in AsyncStorage upon successful login
            await AsyncStorage.setItem('loginStatus', 'true');
            // Navigate to the home screen
            navigation.navigate('Home');
        } catch (error: any) {
            console.error('Error logging in:', error.message);
            Alert.alert('Error', error.message);
        }
    };

    const handleLogout = async () => {
        try {
            // Clear the login status from AsyncStorage upon logout
            await AsyncStorage.removeItem('loginStatus');
            // Navigate to the login screen
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Hi Welcome Back ! 👋</Text>
                    <Text style={styles.subtitle}>Hello again you have been missed!</Text>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email address</Text>
                    <View style={styles.textInput}>
                        <TextInput
                            placeholder='Enter your email address'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            style={styles.input}
                            value={email} // Set the value to the state variable
                            onChangeText={setEmail} // Update the state variable on change
                        />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.passwordInput}>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={!isPasswordShown}
                            style={styles.input}
                            value={password} // Set the value to the state variable
                            onChangeText={setPassword} // Update the state variable on change
                        />
                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={styles.eyeIcon}
                        >
                            <Ionicons name={isPasswordShown ? 'eye-off' : 'eye'} size={24} color={COLORS.black} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.checkboxContainer}>
                    <Checkbox
                        style={styles.checkbox}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? COLORS.primary : undefined}
                    />
                    <Text style={styles.checkboxText}>Remember Me</Text>
                </View>

                <Button
                    title="Login"
                    filled
                    style={styles.button}
                    onPress={handleLogin}
                />

                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>Don't have an account ?</Text>
                    <Pressable onPress={() => navigation.navigate("Signup")}>
                        <Text style={styles.registerLink}>Register</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    contentContainer: {
        flex: 1,
        marginHorizontal: 22,
        justifyContent: 'center',
    },
    titleContainer: {
        marginVertical: 22,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 12,
        color: COLORS.black,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.black,
    },
    inputContainer: {
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        fontWeight: '400',
        marginVertical: 8,
    },
    textInput: {
        width: '100%',
        height: 48,
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 22,
    },
    passwordInput: {
        width: '100%',
        height: 48,
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 22,
        position: 'relative',
    },
    eyeIcon: {
        position: 'absolute',
        right: 12,
    },
    input: {
        width: '100%',
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginVertical: 6,
    },
    checkbox: {
        marginRight: 8,
    },
    checkboxText: {
        fontSize: 16,
    },
    button: {
        marginTop: 18,
        marginBottom: 4,
    },
    separator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.grey,
        marginHorizontal: 10,
    },
    separatorText: {
        fontSize: 14,
    },
    socialButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    socialButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 52,
        borderWidth: 1,
        borderColor: COLORS.grey,
        marginRight: 4,
        borderRadius: 10,
    },
    socialIcon: {
        height: 36,
        width: 36,
        marginRight: 8,
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 22,
    },
    registerText: {
        fontSize: 16,
        color: COLORS.black,
    },
    registerLink: {
        fontSize: 16,
        color: COLORS.primary,
        fontWeight: 'bold',
        marginLeft: 6,
    },
});

export default Login;
