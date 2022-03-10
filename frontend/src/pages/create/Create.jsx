import { useRef } from 'react';
import './create.css';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createRecipe, reset } from '../../features/recipes/recipeSlice';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';
import Loading from '../../components/Loading';

function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [uploadPending, setUploadPending] = useState(false)

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.recipes
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate("/")
    }

    dispatch(reset());
  }, [dispatch, navigate, isError, isSuccess, message]);

  // Title, method, cooking Time
  const [formData, setFormData] = useState({
    title: '',
    method: '',
    cookingTime: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Ingredients array
  const [newIngredient, setNewIngredient] = useState('');
  const ingredientInput = useRef(null);
  const [ingredients, setIngredients] = useState([]);

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();
    if (ing && !ingredients.includes(ing)) {
      setIngredients((prev) => [...prev, ing]);
    }
    setNewIngredient('');
    ingredientInput.current.focus();
  };

  // Upload and submit
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url;
    const upload = new FormData();
    upload.append('file', file);
    upload.append('upload_preset', 'images');
    try {
      setUploadPending(true)
      const uploadRes = await axios.post(
        'https://api.cloudinary.com/v1_1/dsbsr1lvb/image/upload',
        upload
      );

      url = uploadRes.data.url;
    } catch (error) {
      setUploadPending(false)
      console.log(error);
    }
    setUploadPending(false)
    dispatch(createRecipe({ ...formData, img: url, ingredients }));
  };

  if (isLoading) {
    return <Loading />;
  }

  if(uploadPending){
    return (<div style={{marginTop: "80px"}}>
      <Loading />
    </div>)
  }

  return (
    <div className='create'>
      <h2 className='page-title'>{<FaPlus />} Ajouter une recette</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nom de la recette :</span>
          <input
            type='text'
            name='title'
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>Image :</span>
          <div
            style={{
              color: '#58249C',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '5%',
            }}
          >
            <FaCloudUploadAlt size={49} />
            <input
              type='file'
              className='imgInput'
              onChange={(e) => setFile(e.target.files[0])}
            />
            <p> Ajouter une image</p>
            <div>{file && file.name}</div>
          </div>
        </label>
        <label>
          <span>Ingrédients :</span>
          <div className='ingredients'>
            <input
              type='text'
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button onClick={handleAdd} className='btn'>
              Ajouter
            </button>
          </div>
        </label>
        <p>
          ingrédients :{' '}
          {ingredients.map((i) => (
            <em key={i}>{i}, </em>
          ))}
        </p>
        <label>
          <span>Méthode pour la recette :</span>
          <textarea
            name='method'
            value={formData.method}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>Temps de préparation (en minutes) : </span>
          <input
            type='number'
            name='cookingTime'
            value={formData.cookingTime}
            onChange={handleChange}
          />
        </label>

        <button className='button'>Créer !</button>
      </form>
    </div>
  );
}

export default Create;
