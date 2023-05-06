import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import DataContext from "../DataContext";

const UsersScreen = ({ loggedIn, setLoggedIn }) => {
  const { usuarios } = useContext(DataContext);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const user = usuarios.find(
      (user) =>
        user.username === data.username && user.password === data.password
    );
    if (user) {
      setLoggedIn(true);
      reset();
    } else {
      console.log("Usuario o contraseña incorrectos");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      <Text>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <img
          src="https://www.bscamerica.com/wp-content/uploads/2022/04/NEWBSCwheels3.gif"
          width={"120%"}
        ></img>
      </Text>
      <Text style={styles.title}></Text>
      {!loggedIn && (
        <>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.TextInput}
                label="Usuario"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                error={errors.username}
              />
            )}
            name="username"
            rules={{ required: true }}
          />
          {errors.username && <Text>Usuario requerido.</Text>}
          <br></br>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.TextInput}
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
          {errors.password && <Text>Contraseña requerida.</Text>}
          <br></br>
          <br></br>
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
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#364b91",
  },
  TextInput: {
    backgroundColor: "white",
  },
});

export default UsersScreen;
