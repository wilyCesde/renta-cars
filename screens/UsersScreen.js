import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import DataContext from '../DataContext';


const UsersScreen = ({ loggedIn, setLoggedIn }) => {
  const {users} = useContext(DataContext);
  const {control, handleSubmit, formState: {errors}} = useForm();

  const onSubmit = (data) => {

    const userExists = users.some((user) => user.username === data.username);
     // Verificar si el nombre de usuario ya existe en el arreglo 'users'
     
    if (userIndex !== -1 && users[userIndex].password === data.password) {
      
      setLoggedIn(true); 
    } else {
      
    }
  };

  const logout = () => {
    setLoggedIn(false);
  };


 

  // const onSubmit = (data) => {
   
   
  
  //   // Si el usuario no existe, agregarlo al arreglo 'users'
  //   if (!userExists) {
  //     users.push(data);
  //     console.log("Usuario registrado con éxito:", data);
  //   } else {
  //     console.log("El nombre de usuario ya existe, elija otro.");
  //   }
  // };
  
  const login = (data) => {
    const user = users.find(
      (user) =>
        user.username === data.username && user.password === data.password
    );
    if (user) {
      setLoggedIn(true);
      console.log("Inicio de sesión exitoso");
    } else {
      console.log("Usuario o contraseña incorrectos");
    }
    return loggedIn
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            label="Nombre de usuario"
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            error={errors.username}
          />
        )}
        name="username"
        rules={{required: true, pattern: /^[a-zA-Z0-9]+$/}}
      />
      {errors.username && <Text>El nombre de usuario es inválido.</Text>}

      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            label="Nombre"
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            error={errors.name}
          />
        )}
        name="name"
        rules={{required: true, pattern: /^[a-zA-Z\s]+$/}}
      />
      {errors.name && <Text>El nombre es inválido.</Text>}

      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            label="Contraseña"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            error={errors.password}
          />
        )}
        name="password"
        rules={{required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/}}
      />
      {errors.password && (
        <Text>
          La contraseña debe tener al menos 8 caracteres y contener letras y números.
        </Text>
      )}

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
      >
        Registrarse
      </Button>

      <Text style={styles.title}>Inicio de sesión</Text>
      <Button
        mode="contained"
        onPress={handleSubmit(login)}
        style={styles.button}
      >
        Iniciar sesión
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
  },
});

export default UsersScreen;

