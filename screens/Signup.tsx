import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

//firebase
import firebaseApp from '../constants/firebase'; 

const Signup: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [vuin, setVUIN] = useState('');

    useEffect(() => {
        // Retrieve saved email and password from AsyncStorage
        AsyncStorage.getItem('userData').then((data) => {
            if (data) {
                const userData = JSON.parse(data);
                setEmail(userData.email);
                setPassword(userData.password);
            }
        });
    }, []);

    const handleSignup = async () => {
        try {
            const userCredential = await firebaseApp.auth().createUserWithEmailAndPassword(email, password);
            if (userCredential.user) {
                await firebaseApp.database().ref(`velowise/accounts/`).set({
                    email,
                    password,
                    vuin,
                });

                // Save email and password if the "Remember Me" checkbox is checked
                if (isChecked) {
                    AsyncStorage.setItem('userData', JSON.stringify({ email, password }));
                }

                navigation.navigate('Login');
                Alert.alert('Success', 'Your account has been created successfully!');
            }
        } catch (error: any) { 
            console.error('Error signing up:', error.message);
            Alert.alert('Error', error.message);
        }
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Connect with your Velowise Module today!</Text>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email address</Text>
                    <View style={styles.textInput}>
                        <TextInput
                            placeholder='Enter your email address'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            style={styles.input}
                            onChangeText={setEmail}
                            value={email}
                        />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>VUIN</Text>
                    <View style={styles.textInput}>
                        <TextInput
                            placeholder='Enter your Velowise Unique code'
                            placeholderTextColor={COLORS.black}
                            keyboardType='numeric'
                            style={styles.input}
                            onChangeText={setVUIN}
                            value={vuin}
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
                            onChangeText={setPassword}
                            value={password}
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
                    title="Sign Up"
                    filled
                    style={styles.button}
                    onPress={handleSignup}
                />

                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Already have an account</Text>
                    <Pressable onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.loginLink}>Login</Text>
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
    phoneInput: {
        width: '100%',
        height: 48,
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 22,
    },
    phonePrefix: {
        width: '12%',
        borderRightWidth: 1,
        borderLeftColor: COLORS.grey,
        height: '100%',
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
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 22,
    },
    loginText: {
        fontSize: 16,
        color: COLORS.black,
    },
    loginLink: {
        fontSize: 16,
        color: COLORS.primary,
        fontWeight: 'bold',
        marginLeft: 6,
    },
});

export default Signup;
