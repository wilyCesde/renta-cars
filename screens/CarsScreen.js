import { View, Text, StyleSheet, FlatList } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import React, { useContext } from "react";
import DataContext from "../DataContext";
const CarsScreen = () => {
  const { carros } = useContext(DataContext);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [carList, setCarList] = React.useState(carros);

  const onSubmit = (data) => {
    // Verificar si el número de placa ya existe en el arreglo 'carros'
    const carExists = carros.some(
      (car) => car.platenumber === data.platenumber
    );

    // Si el carro no existe, agregarlo al arreglo 'carros'
    if (!carExists) {
      carros.push({ ...data, state: "disponible" });
      setCarList([...carros]);
      reset();
      console.log("Carro registrado con éxito:", data);
    } else {
      console.log("El número de placa ya existe, elija otro.");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text>Placa: {item.platenumber}</Text>
      <Text>Marca: {item.brand}</Text>
      <Text>Estado: {item.state}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <br></br>
      <br></br>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.TextInput}
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
      <br></br>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.TextInput}
            label="Marca"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            error={errors.brand}
          />
        )}
        name="brand"
        rules={{ required: true }}
      />
      {errors.brand && <Text>La marca del carro es requerida.</Text>}

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
      >
        Registrar
      </Button>
      <br></br>
      <br></br>
      <Text style={styles.title}>Carros</Text>
      <FlatList
        data={carList}
        renderItem={renderItem}
        keyExtractor={(item) => item.platenumber}
      />
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
    backgroundColor: "#364b91",
  },
  listItem: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  TextInput: {
    backgroundColor: "white",
  },
});

export default CarsScreen;
