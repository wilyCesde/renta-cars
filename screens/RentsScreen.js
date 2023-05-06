import { View, Text, StyleSheet, FlatList } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import React, { useContext, useState } from "react";
import DataContext from "../DataContext";


const RentsScreen = () => {
  const [message, setMessage] = useState("");

  const { users, cars, rents } = useContext(DataContext);
  const [rentsList, setRentsList] = useState(rents);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Verificar si el usuario y el número de placa existen en los arreglos respectivos
    const userExists = users.some((user) => user.username === data.username);
    const carIndex = cars.findIndex(
      (car) => car.platenumber === data.platenumber
    );

    if (userExists && carIndex !== -1 && cars[carIndex].state === "disponible") {
      // ...
      setMessage("Alquiler registrado con éxito");
    } else {
      setMessage("El usuario, número de placa o estado del carro son inválidos");
    }

  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text>{`Alquiler #${item.rentnumber} - Usuario: ${item.username} - Placa: ${item.platenumber} - Fecha: ${item.rentdate}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Alquiler</Text>
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
            label="Número de placa"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            error={errors.platenumber}
          />
        )}
        name="platenumber"
        rules={{ required: true }}
      />
      {errors.platenumber && <Text>El número de placa es requerido.</Text>}

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
      >
        Registrar Alquiler
      </Button>
      <Text style={styles.listTitle}>Lista de Rentas</Text>
      <FlatList
        data={rentsList}
        renderItem={renderItem}
        keyExtractor={(item) => item.rentnumber.toString()}
      />
      <FlatList
        data={rentsList}
        renderItem={renderItem}
        keyExtractor={(item) => item.rentnumber.toString()}
      />
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
  listTitle: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  listItem: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  message: {
    color: "red",
    marginVertical: 10,
  },
  
});

export default RentsScreen;
