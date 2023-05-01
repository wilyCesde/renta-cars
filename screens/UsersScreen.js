import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import DataContext from "../DataContext";

const UsersScreen = ({ loggedIn, setLoggedIn }) => {
  const { users } = useContext(DataContext);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const user = users.find(
      (user) =>
        user.username === data.username && user.password === data.password
    );
    if (user) {
      setLoggedIn(true);
      reset();
    } else {
      console.log("Nombre de usuario o contraseña incorrectos");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
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
                value={value}
                error={errors.username}
              />
            )}
            name="username"
            rules={{ required: true }}
          />
          {errors.username && <Text>El nombre de usuario es requerido.</Text>}

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Contraseña"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                secureTextEntry
                error={errors.password}
              />
            )}
            name="password"
            rules={{ required: true }}
          />
          {errors.password && <Text>La contraseña es requerida.</Text>}

          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            style={styles.button}
          >
            Iniciar sesión
          </Button>
        </>
      )}
      {loggedIn && (
        <Button mode="contained" onPress={handleLogout} style={styles.button}>
          Cerrar sesión
        </Button>
      )}
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
});

export default UsersScreen;
