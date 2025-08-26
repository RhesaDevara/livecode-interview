"use client";
import { useState } from 'react';

export default function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [showSnackbar, setShowSnackbar] = useState(false);

  // Fungsi validasi email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Fungsi validasi password
  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  // Fungsi validasi konfirmasi password
  const validateConfirmPassword = (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword;
  };

  // Validasi real-time saat input berubah
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (value && !validateEmail(value)) {
      setErrors(prev => ({ ...prev, email: 'Format email tidak valid' }));
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (value && !validatePassword(value)) {
      setErrors(prev => ({ ...prev, password: 'Password minimal 8 karakter' }));
    } else {
      setErrors(prev => ({ ...prev, password: '' }));
    }

    // Revalidasi confirm password jika sudah diisi
    if (confirmPassword && value !== confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Konfirmasi password tidak sama' }));
    } else if (confirmPassword && value === confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: '' }));
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value && !validateConfirmPassword(password, value)) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Konfirmasi password tidak sama' }));
    } else {
      setErrors(prev => ({ ...prev, confirmPassword: '' }));
    }
  };

  // Cek apakah form valid
  const isFormValid = () => {
    return (
      email &&
      password &&
      confirmPassword &&
      validateEmail(email) &&
      validatePassword(password) &&
      validateConfirmPassword(password, confirmPassword) &&
      !errors.email &&
      !errors.password &&
      !errors.confirmPassword
    );
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      const payload = {
        email,
        password,
        confirmPassword
      };

      // Tampilkan payload di console
      console.log('Registration Payload:', payload);

      // Tampilkan snackbar
      setShowSnackbar(true);

      // Sembunyikan snackbar setelah 3 detik
      setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg text-gray-900">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Form Registrasi</h2>

      <div className="space-y-4">
        {/* Email Field */}
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.email
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
              }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <input
            type="password"
            placeholder="Password (minimal 8 karakter)"
            value={password}
            onChange={handlePasswordChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.password
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
              }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <input
            type="password"
            placeholder="Konfirmasi Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.confirmPassword
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
              }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isFormValid()}
          className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${isFormValid()
            ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          Submit
        </button>
      </div>

      {/* Snackbar/Alert */}
      {showSnackbar && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out z-50">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Registrasi berhasil!
          </div>
        </div>
      )}
    </div>
  );
}