import { View, Text, StyleSheet, FlatList } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import React, { useContext, useState } from "react";
import DataContext from "../DataContext";

const RentsScreen = () => {
  const { usuarios, carros, rentas } = useContext(DataContext);
  const [rentasList, setRentsList] = useState(rentas);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Verificar si el usuario y el número de placa existen en los arreglos respectivos
    const userExists = usuarios.some(
      (usuarios) => usuarios.username === data.username
    );
    const carIndex = carros.findIndex(
      (car) => car.platenumber === data.platenumber
    );

    if (
      userExists &&
      carIndex !== -1 &&
      carros[carIndex].state === "disponible"
    ) {
      const rent = {
        rentnumber: rentas.length + 1,
        username: data.username,
        platenumber: data.platenumber,
        rentdate: new Date().toISOString(),
      };
      rentas.push(rent);
      carros[carIndex].state = "no disponible";
      reset();
      console.log("Alquiler registrado con éxito:", rent);
      setRentsList([...rentas]);
    } else {
      console.log(
        "El usuario, número de placa o estado del carro son inválidos."
      );
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text>{`Alquiler #${item.rentnumber} - Usuario: ${item.username} - Placa: ${item.platenumber} - Fecha: ${item.rentdate}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <br></br>
      <br></br>
      <Text>
        <img
          src="https://i.pinimg.com/originals/65/ab/66/65ab660f0fd4b6509fd93f846b1693f8.gif"
          width={"80%"}
          textAlign="center"
        ></img>
      </Text>
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
            label="Placa"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            error={errors.platenumber}
          />
        )}
        name="platenumber"
        rules={{ required: true }}
      />
      {errors.platenumber && <Text>Placa requerida.</Text>}

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
      >
        Registrar Alquiler
      </Button>
      <br></br>
      <br></br>
      <FlatList
        data={rentasList}
        renderItem={renderItem}
        keyExtractor={(item) => item.rentnumber.toString()}
      />
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
  listTitle: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  listItem: {
    backgroundColor: "#white",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  TextInput: {
    backgroundColor: "white",
  },
});

export default RentsScreen;
