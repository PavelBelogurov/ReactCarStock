import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarCard from './components/CarCard';
import SortOptions from './components/SortOptions';
import { Grid, Typography, Container } from '@mui/material';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { Car } from './types';

const App: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [sortedCars, setSortedCars] = useState<Car[]>([]);
  const [sortOption, setSortOption] = useState<string>('');

  useEffect(() => {
    axios
      .get<Car[]>('https://test.tspb.su/test-task/vehicles')
      .then((response) => {
        setCars(response.data);
        setSortedCars(response.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    let sorted = [...cars];
    if (sortOption === 'year') {
      sorted = sorted.sort((a, b) => a.year - b.year);
    } else if (sortOption === 'price') {
      sorted = sorted.sort((a, b) => a.price - b.price);
    }
    setSortedCars(sorted);
  }, [sortOption, cars]);

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  const handleEditCar = (id: number, updatedCar: Car) => {
    setCars(cars.map((car) => (car.id === id ? updatedCar : car)));
  };

  const handleDeleteCar = (id: number) => {
    setCars(cars.filter((car) => car.id !== id));
  };

  return (
    <Container maxWidth="lg" sx={{ paddingTop: '20px' }}>
      <Typography variant="h3" gutterBottom>Тестовое задание Frontend</Typography>
      <SortOptions onSortChange={handleSortChange} />
      <Grid container spacing={2}>
        {sortedCars.map((car) => (
          <Grid item key={car.id} xs={12} sm={6} md={4}>
            <CarCard car={car} onEdit={handleEditCar} onDelete={handleDeleteCar} />
          </Grid>
        ))}
      </Grid>
      <YMaps>
        <Map defaultState={{ center: [55.753215, 37.620393], zoom: 5 }} width="100%" height="400px">
          {cars.map((car) => (
            <Placemark key={car.id} geometry={[car.latitude, car.longitude]} />
          ))}
        </Map>
      </YMaps>
    </Container>
  );
};

export default App;
