import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import DataContext from "../DataContext";

const UsersScreen = ({ loggedIn, setLoggedIn }) => {
  const [message, setMessage] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const { users, addUser } = useContext(DataContext);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (isRegistering) {
      // Handle user registration
      addUser(data);
      setIsRegistering(false);
      setMessage("Usuario registrado con éxito");
    } else {
      // Handle user login
      const user = users.find(
        (user) =>
          user.username === data.username && user.password === data.password
      );
      if (user) {
        setLoggedIn(true);
        reset();
      } else {
        setMessage("Nombre de usuario o contraseña incorrectos");
      }
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleRegister = () => {
    setIsRegistering(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>

      {!loggedIn && (
        <>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Nombre de usuario"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value || ""}
                error={errors.username}
              />
            )}
            name="username"
            rules={{ required: true }}
            defaultValue=""
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Contraseña"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value || ""}
                secureTextEntry
                error={errors.password}
              />
            )}
            name="password"
            rules={{ required: true }}
            defaultValue=""
          />

          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            style={styles.button}
          >
            {isRegistering ? "Registrarse" : "Iniciar sesión"}
          </Button>
          {!isRegistering && (
            <Button
              mode="contained"
              onPress={handleRegister}
              style={styles.button}
            >
              Registrarse
            </Button>
          )}
        </>
      )}
      {loggedIn && (
        <Button mode="contained" onPress={handleLogout} style={styles.button}>
          Cerrar sesión
        </Button>
      )}
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    marginTop: 10,
  },
  message: {
    color: "red",
    marginVertical: 10,

  },
});

export default UsersScreen;
