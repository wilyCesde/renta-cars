
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import React, {useContext} from 'react';
import DataContext from '../DataContext';
import { loadData, saveData } from "../Storage";
import { getData } from "../Storage";
const CarsScreen = () => {

  const {cars} = useContext(DataContext);

  const {control, handleSubmit, reset, formState: {errors}} = useForm({
    defaultValues: {
      platenumber: '',
      brand: '',
    }
  });
  
  const [carList, setCarList] = React.useState(cars);

  const onSubmit = async (data) => {
    const carExists = cars.find(car => car.platenumber === data.platenumber);
    
    if (!carExists) {
      cars.push({...data, state: 'disponible'});
      setCarList([...cars]);
      reset();
      console.log("Carro registrado con éxito:", data);
      await saveData('carList', cars); // Guardar en LocalStorage
    } else {
      console.log("El número de placa ya existe, elija otro.");
    }
  };
  React.useEffect(() => {
    const fetchCarList = async () => {
      const storedCarList = await loadData('carList');
      if (storedCarList) {
        setCarList(storedCarList);
      }
    };
    fetchCarList();
  }, []);
  
  
  const renderItem = ({item}) => (
    <View style={styles.listItem}>
      <Text>Placa: {item.platenumber}</Text>
      <Text>Marca: {item.brand}</Text>
      <Text>Estado: {item.state}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Carro</Text>
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

      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            label="Marca"
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            error={errors.brand}
          />
        )}
        name="brand"
        rules={{required: true}}
      />
      {errors.brand && <Text>La marca del carro es requerida.</Text>}

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
      >
        Registrar
      </Button>

      <Text style={styles.title}>Lista de Carros</Text>
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
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
  },
  listItem: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default CarsScreen;
