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
import React, { useState, useEffect } from "react";
import { loadData, saveData } from "./Storage";




const Tab = createBottomTabNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]);
  const [rents, setRents] = useState([]);

  useEffect(() => {
    loadData("users").then((loadedUsers) => {
      if (loadedUsers) {
        setUsers(loadedUsers);
      } else {
        setUsers([
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
        ]);
      }
    });
    loadData("cars").then((loadedCars) => {
      if (loadedCars) {
        setCars(loadedCars);
      } else {
        setCars([
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
        ]);
      }
    });
    loadData("rents").then((loadedRents) => {
      if (loadedRents) {
        setRents(loadedRents);
      } else {
        setRents([
          {
            rentnumber: 1,
            username: "user1",
            platenumber: "XYZ789",
            rentdate: "2023-05-01",
          },
        ]);
      }
    });
  }, []);
  // ... Resto del código

  const addUser = (newUser) => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers, newUser];
      saveData("users", updatedUsers);
      return updatedUsers;
    });
  };
  

  const addRent = (newRent) => {
    setRents((prevRents) => {
      const updatedRents = [...prevRents, newRent];
      saveData("rents", updatedRents);
      return updatedRents;
    });
  };
  


  return (
    <PaperProvider>
      <NavigationContainer>
      <DataContext.Provider value={{ users, cars, rents, addUser, addRent }}>

          <Tab.Navigator>
            <Tab.Screen
              name="Users"
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
                      <MaterialIcons name="folder" size={22} color="green" />
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