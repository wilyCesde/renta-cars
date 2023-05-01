
import {View, Text, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import React, {useContext} from 'react';
import DataContext from '../DataContext';

const RentsScreen = () => {
  const {users, cars, rents} = useContext(DataContext);

  const {control, handleSubmit, reset, formState: {errors}} = useForm();

  const onSubmit = (data) => {
    // Verificar si el usuario y el número de placa existen en los arreglos respectivos
    const userExists = users.some((user) => user.username === data.username);
    const carIndex = cars.findIndex(
      (car) => car.platenumber === data.platenumber
    );

    if (userExists && carIndex !== -1 && cars[carIndex].state === 'disponible') {
      const rent = {
        rentnumber: rents.length + 1,
        username: data.username,
        platenumber: data.platenumber,
        rentdate: new Date().toISOString(),
      };
      rents.push(rent);
      cars[carIndex].state = 'no disponible';
      reset();
      console.log('Alquiler registrado con éxito:', rent);
    } else {
      console.log('El usuario, número de placa o estado del carro son inválidos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Alquiler</Text>
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
        rules={{required: true}}
      />
      {errors.username && <Text>El nombre de usuario es requerido.</Text>}

      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            label="Número de placa"
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            error={errors.platenumber}
          />
        )}
        name="platenumber"
        rules={{required: true}}
      />
      {errors.platenumber && <Text>El número de placa es requerido.</Text>}

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
      >
        Registrar Alquiler
      </Button>
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
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
  },
});

export default RentsScreen;
