import { View, Text, StyleSheet, FlatList } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import React, { useContext, useState } from "react";
import DataContext from "../DataContext";
import DropDownPicker from "react-native-dropdown-picker";

const RentsScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text>Alquiler N°: {item.rentnumber}</Text>
      <Text>Nombre de usuario: {item.username}</Text>
      <Text>Número de placa: {item.platenumber}</Text>
      <Text>Fecha de alquiler: {item.rentdate}</Text>
    </View>
  );

  const { users, cars, rents, addRent } = useContext(DataContext);
  const [message, setMessage] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      platenumber: "",
    },
  });


  const onSubmit = (data) => {
    const userExists = users.some((user) => user.username === data.username);
    const carIndex = cars.findIndex(
      (car) => car.platenumber === data.platenumber
    );

    if (
      userExists &&
      carIndex !== -1 &&
      cars[carIndex].state === "disponible"
    ) {
      const rentnumber = rents.length + 1;
      const rentdate = new Date().toISOString().slice(0, 10);

      const newRent = {
        rentnumber,
        username: data.username,
        platenumber: data.platenumber,
        rentdate,
      };

      addRent(newRent);
      setMessage("Alquiler registrado con éxito");
    } else {
      setMessage("El usuario, número de placa o estado del carro son inválidos");
    }
  };


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
          <DropDownPicker
            items={cars.map((car) => ({
              label: car.platenumber,
              value: car.platenumber,
            }))}
            placeholder="Selecciona un número de placa"
            containerStyle={{ height: 40, marginTop: 10 }}
            style={{ backgroundColor: "#fafafa" }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            onChangeItem={(item) => onChange(item.value)}
            value={value}
            onBlur={onBlur}
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
        data={rents}
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
    borderRadius: 5,
  },
  message: {
    color: "red",
    marginVertical: 10,
  },

});

export default RentsScreen;
