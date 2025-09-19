import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// 1. Crear las reglas de validación
const schema = yup.object({
  name: yup.string().required('El nombre es obligatorio'),
  email: yup.string().email('Email inválido').required('El email es obligatorio')
});

const SimpleForm = () => {
  // 2. Configurar el formulario
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  // 3. Función que se ejecuta cuando el formulario es válido
  const onSubmit = (data: any) => {
    alert(`Hola ${data.name}! Tu email es: ${data.email}`);
    console.log('Datos:', data);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Formulario Simple</h2>
      
      <div className="space-y-4">
        {/* Campo Nombre */}
        <div>
             
        </div>

        {/* Campo Email */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Email:
          </label>
          <input
            {...register('email')}
            type="email"
            className="w-full p-2 border border-gray-300 rounded focus:border-blue-500"
            placeholder="tu@email.com"
          />
          {/* Mostrar error si existe */}
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Botón de envío */}
        <button
          onClick={handleSubmit(onSubmit)}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default SimpleForm;