import React, { useState } from 'react';
import { Car } from '../types';
import { Button, Card, CardContent, CardActions, Typography, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface CarCardProps {
  car: Car;
  onEdit: (id: number, updatedCar: Car) => void;
  onDelete: (id: number) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCar, setEditedCar] = useState(car);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedCar({ ...editedCar, [name]: value });
  };

  const handleSave = () => {
    onEdit(car.id, editedCar);
    setIsEditing(false);
  };

  return (
    <Card sx={{ marginBottom: '16px' }}>
      <CardContent>
        {isEditing ? (
          <div>
            <TextField
              fullWidth
              variant="outlined"
              label="Name"
              name="name"
              value={editedCar.name}
              onChange={handleInputChange}
              sx={{ marginBottom: '8px' }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Model"
              name="model"
              value={editedCar.model}
              onChange={handleInputChange}
              sx={{ marginBottom: '8px' }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Price"
              name="price"
              type="number"
              value={editedCar.price.toString()}
              onChange={handleInputChange}
              sx={{ marginBottom: '8px' }}
            />
            <CardActions>
              <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
            </CardActions>
          </div>
        ) : (
          <div>
            <Typography variant="h6" gutterBottom>{car.name} {car.model}</Typography>
            <Typography>Year: {car.year}</Typography>
            <Typography>Price: ${car.price}</Typography>
            <Typography>Color: {car.color}</Typography>
            <CardActions>
              <IconButton onClick={() => setIsEditing(true)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(car.id)}>
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default CarCard;
