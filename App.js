import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider as PaperProvider } from "react-native-paper";
import UsersScreen from "./screens/UsersScreen";
import CarsScreen from "./screens/CarsScreen";
import RentsScreen from "./screens/RentsScreen";
import DataContext from "./DataContext";
import { MaterialIcons } from "@expo/vector-icons"; //Iconos
import Icon from "@mdi/react";
import { mdiCarBack } from "@mdi/js";
import React, { useState } from "react";
const Tab = createBottomTabNavigator();

const users = [
  {
    username: "user1",
    name: "John Doe",
    password: "password1",
  },
  {
    username: "user2",
    name: "Jane Smith",
    password: "password2",
  },
];

const cars = [
  {
    platenumber: "ABC123",
    brand: "Toyota",
    state: "disponible",
  },
  {
    platenumber: "XYZ789",
    brand: "Honda",
    state: "no disponible",
  },
];

const rents = [
  {
    rentnumber: 1,
    username: "user1",
    platenumber: "XYZ789",
    rentdate: "2023-05-01",
  },
];

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <PaperProvider>
      <NavigationContainer>
        <DataContext.Provider value={{ users, cars, rents }}>
          <Tab.Navigator>
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
                      <MaterialIcons name="folder" size={22} color="green" />
                    ),
                  }}
                />
                <Tab.Screen
                  name="LockOut"
                  children={() => (
                    <UsersScreen
                      loggedIn={loggedIn}
                      setLoggedIn={setLoggedIn}
                    />
                  )}
                  options={{
                    tabBarIcon: () => (
                      <MaterialIcons name="people" size={22} color="black" />
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
