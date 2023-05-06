import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider as PaperProvider } from "react-native-paper";
import UsersScreen from "./screens/UsersScreen";
import CarsScreen from "./screens/CarsScreen";
import RentsScreen from "./screens/RentsScreen";
import DataContext from "./DataContext";
import { MaterialIcons } from "@expo/vector-icons";
import Icon from "@mdi/react";
import { mdiCarBack } from "@mdi/js";
import React, { useState } from "react";

const Tab = createBottomTabNavigator();

const usuarios = [
  {
    username: "Alejandro",
    name: "Alejandro Horta",
    password: "12345",
  },
  {
    username: "Pedro",
    name: "Pedro Sanchez",
    password: "54321",
  },
];

const carros = [
  {
    platenumber: "kHV21E",
    brand: "Kia",
    state: "no disponible",
  },
  {
    platenumber: "MOR666",
    brand: "Toyota",
    state: "disponible",
  },
];

const rentas = [
  {
    rentnumber: 1,
    username: "Luisa Arango",
    platenumber: "BEL565",
    rentdate: "2023-04-05",
  },
];

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <PaperProvider>
      <NavigationContainer>
        <DataContext.Provider value={{ usuarios, carros, rentas }}>
          <Tab.Navigator>
            <Tab.Screen
              name="Rent Car"
              children={() => (
                <UsersScreen loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
              )}
              options={{
                tabBarIcon: () => (
                  <MaterialIcons name="people" size={22} color="black" />
                ),
              }}
            />
            {loggedIn && (
              <>
                <Tab.Screen
                  name="Cars"
                  component={CarsScreen}
                  options={{
                    tabBarIcon: () => <Icon path={mdiCarBack} size={1} />,
                  }}
                />
                <Tab.Screen
                  name="Rents"
                  component={RentsScreen}
                  options={{
                    tabBarIcon: () => (
                      <MaterialIcons name="payment" size={22} color="black" />
                    ),
                  }}
                />
              </>
            )}
          </Tab.Navigator>
        </DataContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
}
