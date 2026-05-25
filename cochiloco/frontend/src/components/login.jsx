import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Mail, Utensils, ChefHat } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8080/api';

export default function CochiLocoLogin() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('cliente');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    ciudad: '',
    direccion: ''
  });

  // LOGIN - Valida contra la base de datos
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Caso ADMIN (hardcodeado)
      if (userType === 'administrador') {
        if (email === 'admin@store.com' && password === 'admin123') {
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userType', 'administrador');
          localStorage.setItem('userName', 'Admin');
          console.log('✅ Admin login exitoso, redirigiendo a /dashboard');
          navigate('/dashboard');
          return;
        } else {
          setError('Credenciales de administrador incorrectas');
          setLoading(false);
          return;
        }
      }

      // Caso CLIENTE - Validar contra la base de datos
      if (userType === 'cliente') {
        // Primero verificamos que el email exista
        const response = await fetch(`${API_BASE_URL}/clientes/email/${email}`);
        
        if (!response.ok) {
          setError('El correo electrónico no está registrado');
          setLoading(false);
          return;
        }

        const cliente = await response.json();
        
        // Verificar la contraseña (comparación simple por ahora)
        // NOTA: En producción, la contraseña debería estar hasheada en la base de datos
        if (cliente.password === password) {
          // Login exitoso
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userType', 'cliente');
          localStorage.setItem('userName', cliente.nombre);
          localStorage.setItem('userId', cliente.id);
          console.log('✅ Cliente login exitoso, redirigiendo a /cliente');
          navigate('/cliente');
        } else {
          setError('Contraseña incorrecta');
        }
      }
    } catch (error) {
      console.error('Error en login:', error);
      setError('Error al intentar iniciar sesión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // REGISTER - Solo para CLIENTES
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email || !password || !formData.nombre) {
        setError('Por favor completa todos los campos');
        setLoading(false);
        return;
      }

      // Verificar si el email ya existe
      const checkResponse = await fetch(`${API_BASE_URL}/clientes/email/${email}`);
      if (checkResponse.ok) {
        setError('Este correo electrónico ya está registrado');
        setLoading(false);
        return;
      }

      // POST a /api/clientes para crear nuevo cliente
      const response = await fetch(`${API_BASE_URL}/clientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: password, // Guardar contraseña (en producción, hashear)
          nombre: formData.nombre,
          telefono: formData.telefono || null,
          ciudad: formData.ciudad || null,
          direccion: formData.direccion || null,
          tipoCliente: 'Regular',
          activo: true,
          valoracion: 5.0,
          totalPedidos: 0
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Error response:', errorData);
        throw new Error('Error al registrarse');
      }

      const nuevoCliente = await response.json();

      // Guardar datos y loguear
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userType', 'cliente');
      localStorage.setItem('userName', formData.nombre);
      localStorage.setItem('userId', nuevoCliente.id);

      console.log('✅ Registro exitoso, redirigiendo a /cliente');
      navigate('/cliente');
    } catch (error) {
      console.error('Error en registro:', error);
      setError('Error al registrarse. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-white text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg">
              <Utensils className="w-10 h-10 text-orange-500" />
            </div>
            <h1 className="text-4xl font-bold mb-2">CochiLoco</h1>
            <p className="text-orange-100 text-sm">
              {isLogin 
                ? 'Ingresa tus credenciales'
                : 'Crea tu cuenta'}
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-6">
              {/* Error */}
              {error && (
                <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg text-sm">
                  ❌ {error}
                </div>
              )}

              {/* User Type Toggle - SOLO en LOGIN */}
              {isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Tipo de Usuario
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setUserType('cliente');
                        setError('');
                      }}
                      disabled={loading}
                      className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 ${
                        userType === 'cliente'
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <User className="w-4 h-4" />
                      Cliente
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setUserType('administrador');
                        setError('');
                      }}
                      disabled={loading}
                      className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 ${
                        userType === 'administrador'
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <ChefHat className="w-4 h-4" />
                      Admin
                    </button>
                  </div>
                </div>
              )}

              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="tu@email.com"
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors bg-white/50 text-black"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Nombre (solo en registro) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Tu nombre"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none text-black"
                    required={!isLogin}
                    disabled={loading}
                  />
                </div>
              )}

              {/* Teléfono (solo en registro) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    placeholder="+52 951 000 0000"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none text-black"
                    disabled={loading}
                  />
                </div>
              )}

              {/* Ciudad (solo en registro) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    value={formData.ciudad}
                    onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                    placeholder="Tu ciudad"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none text-black"
                    disabled={loading}
                  />
                </div>
              )}

              {/* Dirección (solo en registro) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Dirección
                  </label>
                  <input
                    type="text"
                    value={formData.direccion}
                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                    placeholder="Tu dirección"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none text-black"
                    disabled={loading}
                  />
                </div>
              )}

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors bg-white/50 text-black"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm font-medium disabled:opacity-50"
                  >
                    {showPassword ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors"
                    disabled={loading}
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3.5 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
              </button>

              {/* Toggle Login/Register */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                  }}
                  disabled={loading}
                  className="text-sm text-gray-600 disabled:opacity-50"
                >
                  {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
                  <span className="text-orange-500 hover:text-orange-600 font-semibold transition-colors">
                    {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Protegido por CochiLoco © 2026
        </p>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}