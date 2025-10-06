// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { signInWithCustomToken } from '../firebaseConfig';

// const BACKEND_URL = 'http://192.168.1.56:8080';

// interface Props {
//   onAuthSuccess: () => void;
// }
// // 
// const AuthScreen: React.FC<Props> = ({ onAuthSuccess }) => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [username, setUsername] = useState('');

//   const handleAuth = async () => {
//     const endpoint = isLogin ? '/login' : '/register';
//     const body = isLogin
//       ? { email, password }
//       : { email, password, username };

//     try {
//       const response = await fetch(`${BACKEND_URL}${endpoint}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}`);
//       }

//       const { token } = await response.json();
//       if (!token) {
//         throw new Error('No token received');
//       }

//       // Sign in with the custom token using the wrapper function
//       await signInWithCustomToken(token); // Remove the 'auth' argument
//       onAuthSuccess();
//     } catch (error: unknown) {
//       const errorMessage = error instanceof Error ? error.message : String(error);
//       Alert.alert('Error', errorMessage);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{isLogin ? 'Login' : 'Register'}</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       {!isLogin && (
//         <TextInput
//           style={styles.input}
//           placeholder="Username"
//           value={username}
//           onChangeText={setUsername}
//         />
//       )}
//       <TouchableOpacity style={styles.button} onPress={handleAuth}>
//         <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Register'}</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
//         <Text style={styles.toggleText}>
//           {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 15,
//     fontSize: 16,
//     backgroundColor: '#fff',
//   },
//   button: {
//     backgroundColor: '#000',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   toggleText: {
//     color: '#007AFF',
//     textAlign: 'center',
//     marginTop: 10,
//   },
// });

// export default AuthScreen;