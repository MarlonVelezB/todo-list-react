import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Schema de validación con Yup
const taskSchema = yup.object({
  title: yup
    .string()
    .required('El título es obligatorio')
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(100, 'El título no puede exceder 100 caracteres'),
  description: yup
    .string()
    .max(500, 'La descripción no puede exceder 500 caracteres'),
  priority: yup
    .string()
    .required('Selecciona una prioridad')
    .oneOf(['low', 'medium', 'high'], 'Prioridad inválida'),
  dueDate: yup
    .date()
    .nullable()
    .min(new Date(), 'La fecha debe ser futura'),
  category: yup
    .string()
    .required('Selecciona una categoría'),
  tags: yup
    .string()
    .matches(/^[a-zA-Z0-9\s,]*$/, 'Solo letras, números, espacios y comas')
});

const NewTask: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Configuración del formulario
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    watch
  } = useForm({
    resolver: yupResolver(taskSchema),
    mode: 'onChange', // Validación en tiempo real
    defaultValues: {
      title: '',
      description: '',
      priority: '',
      dueDate: null,
      category: '',
      tags: ''
    }
  });

  // Watch para mostrar contador de caracteres
  const titleValue = watch('title');
  const descriptionValue = watch('description');

  // Función para enviar el formulario
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      // Procesar tags (convertir string a array)
      const processedData = {
        ...data,
        tags: data.tags ? data.tags.split(',').map((tag: any) => tag.trim()).filter((tag: any) => tag) : [],
        dueDate: data.dueDate || null
      };

      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Datos enviados:', processedData);
      setSubmitMessage('¡Tarea creada exitosamente!');
      reset(); // Limpiar formulario
      
    } catch (error) {
      setSubmitMessage('Error al crear la tarea. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Nueva Tarea</h2>
      
      <div className="space-y-6">
        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título *
          </label>
          <input
            {...register('title')}
            type="text"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Escribe el título de la tarea"
          />
          <div className="flex justify-between mt-1">
            {errors.title && (
              <span className="text-red-500 text-sm">{errors.title.message}</span>
            )}
            <span className="text-gray-400 text-sm ml-auto">
              {titleValue?.length || 0}/100
            </span>
          </div>
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción
          </label>
          <textarea
            {...register('description')}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Describe la tarea (opcional)"
          />
          <div className="flex justify-between mt-1">
            {errors.description && (
              <span className="text-red-500 text-sm">{errors.description.message}</span>
            )}
            <span className="text-gray-400 text-sm ml-auto">
              {descriptionValue?.length || 0}/500
            </span>
          </div>
        </div>

        {/* Prioridad y Categoría - Fila */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Prioridad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prioridad *
            </label>
            <select
              {...register('priority')}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.priority ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Seleccionar prioridad</option>
              <option value="low">🟢 Baja</option>
              <option value="medium">🟡 Media</option>
              <option value="high">🔴 Alta</option>
            </select>
            {errors.priority && (
              <span className="text-red-500 text-sm">{errors.priority.message}</span>
            )}
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoría *
            </label>
            <select
              {...register('category')}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Seleccionar categoría</option>
              <option value="work">💼 Trabajo</option>
              <option value="personal">👤 Personal</option>
              <option value="study">📚 Estudio</option>
              <option value="health">🏥 Salud</option>
              <option value="shopping">🛒 Compras</option>
            </select>
            {errors.category && (
              <span className="text-red-500 text-sm">{errors.category.message}</span>
            )}
          </div>
        </div>

        {/* Fecha límite */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fecha límite
          </label>
          <input
            {...register('dueDate')}
            type="datetime-local"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.dueDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.dueDate && (
            <span className="text-red-500 text-sm">{errors.dueDate.message}</span>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Etiquetas
          </label>
          <input
            {...register('tags')}
            type="text"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.tags ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="urgente, reunión, proyecto (separadas por comas)"
          />
          {errors.tags && (
            <span className="text-red-500 text-sm">{errors.tags.message}</span>
          )}
          <p className="text-gray-500 text-sm mt-1">
            Separa las etiquetas con comas
          </p>
        </div>

        {/* Mensaje de estado */}
        {submitMessage && (
          <div className={`p-3 rounded-md ${
            submitMessage.includes('exitosamente') 
              ? 'bg-green-100 text-green-700 border border-green-300'
              : 'bg-red-100 text-red-700 border border-red-300'
          }`}>
            {submitMessage}
          </div>
        )}

        {/* Botones */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid || !isDirty || isSubmitting}
            className={`flex-1 py-2 px-4 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              !isValid || !isDirty || isSubmitting
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Creando...' : 'Crear Tarea'}
          </button>
          
          <button
            type="button"
            onClick={() => {
              reset();
              setSubmitMessage('');
            }}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Limpiar
          </button>
        </div>
      </div>

      {/* Estado del formulario (para desarrollo) */}
      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Estado del formulario:</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>Válido: {isValid ? '✅' : '❌'}</p>
          <p>Modificado: {isDirty ? '✅' : '❌'}</p>
          <p>Errores: {Object.keys(errors).length > 0 ? `❌ (${Object.keys(errors).length})` : '✅'}</p>
        </div>
      </div>
    </div>
  );
};

export default NewTask;