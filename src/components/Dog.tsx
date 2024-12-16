import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../store/store';
import { setError, setLoading, setDogs } from '../store/dogsSlice';
import { fetchDogById } from '../api';
import useLocalStorage from '../effects/useLocalStorage';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Dog = () => {
  const [token] = useLocalStorage('token', '');
  const { dogId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dog = useSelector((state: RootState) =>
    state.dogs.dogs.find((dog: any) => dog._id === dogId)
  );
  const loading = useSelector((state: RootState) => state.dogs.loading);
  const error = useSelector((state: RootState) => state.dogs.error);

  useEffect(() => {
    if (!dog && dogId && token) {
      dispatch(setLoading(true));
      fetchDogById(dogId, token)
        .then((fetchedDog) => {
          dispatch(setDogs(fetchedDog));
        })
        .catch((err) => {
          dispatch(setError(err.message));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  }, [dog, dogId, token, dispatch]);

  const logout = () => {
    setToken('');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!dog) {
    navigate('/');
    return null;
  }

  return token ? (
    <>
      Ви авторизовані<br />
      <button onClick={logout}>Вийти</button>
      <br />
      <Link to="/">На головну</Link>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia sx={{ height: 140 }} image={dog.image} title={dog.name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {dog.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Колір: {dog.color}
            <br />
            Порода: {dog.breed}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Деталі</Button>
        </CardActions>
      </Card>
    </>
  ) : (
    <Link to="/login">Авторизуватися</Link>
  );
};

export default Dog;
function setToken(arg0: string) {
  throw new Error('Function not implemented.');
}

